+++
date = "2015-09-24T20:33:29+03:00"
title = "Understanding RPCs - Part II"
tags = ["distributed-systems", "papers"]
description = "RPC Semantics"
mastimage = "http://prakhar.me/images/rpcs.jpg"
+++

In the [previous](/google.com) post, we introduced remote procedure calls and their use within a distributed system. In this post, we are going to dive deep into the concept of semantics - first in the context of distributed systems in general and then discuss various RPC semantics.

### Semantics
We're now going to briefly talk about one of the most important aspects in a distributed systems - semantics. What do you mean by semantics? Before we get to that, let's talk about failures.  As we all know, failures are the norm rather than an exception in a distributed system. Failures be of many forms - network, machine or even datacenters. Hence, one of the goals in designing a distributed system is for it to be fault tolerant. We would ideally want our systems to hide the failures as much as possible and be available to our users.

However, as we'll learn later, all kinds of failures cannot be completely hidden from the user. When one of the replica goes down, you can hide that from the user but when the majority go down it can be very hard to keep the system functioning. So what happens when your system cannot handle a failure mode or has some other limitation? The idea is to expose those **semantics** very clearly in your APIs to your users so that they can then in turn plan for that scenario. 

One such example can be found in [RethinkDB docs](http://rethinkdb.com/docs/consistency/#settings) under the write acknowledgements section which is a configuration setting that can be set by the user.

> The default is majority, meaning writes will be acknowledged when a majority of (voting) replicas have confirmed their writes. The other possible option is single, meaning writes will be acknowledged when a single replica acknowledges it.

By giving this option to the user, the creators of the RethinkDB allow the users to make a tradeoff between safety and performance.

> RethinkDB’s default settings prioritize safety over performance, except in one case: read_mode defaults to single rather than majority. The majority read mode requires sending a query to all of the replicas and waiting for a majority to reply, which significantly degrades performance.

Hence, by clearly laying out semantics designers of distributed systems can keep their users informed.

### RPCs Semantics

With that out of the way, let's see how what kind of semantics are exposed by RPCs. One very important point to consider is that since RPCs are the building blocks of distributed systems, the semantics dictated by RPCs bubble up to higher layers and affect the design of a distributed system.

In the previous post we took at look at one of the key design goals of an RPC system.

> Make the process of executing code on a remote machine as simple and straight-forward as calling a local function.

Surely this is a very worthwhile goal to pursue. Having a model that works similar to the local environment helps programmers in reasoning easily about the program and makes it easier to build distributed systems application. But the question remains that how far do RPCs systems generally come in achieveing this goal. How similar are they to LPCs (Local Procedure Calls) and to what extent does it the free the programmer from the mental overhead of thinking about communication in a distributed system?

Let's say you are writing a program and decide to make a local procedure call. In this case two things can happen - 

1. The call returns which means that either procedure was successful or it met with an exception.
2. The call didn't return which means that it got stuck in an infinite loop and it didn't complete. In this case, the call was not successful.

In both these cases, the final state of the system is clearly known and is easy to reason about. In our day-to-day work we deal with each scenarios multiple times and by now have become well equipped to deal with them.

When communicating over a network, things are not this straightforward. Consider the case when the programmer makes a remote procedure call. When the call returns, you know that the call succeeded - it's all fine and dandy. However, when the call fails then are multiple scenarios that could've happened -

1. The call didn't reach the server.
2. The call was executed but mid-way the server crashed.
3. The call was executed, the results were returned but the return message did not reach the client.

All of a sudden, something which seemed quite trivial has become sufficiently complex. To some extent, some of these problems can be dealt with repeated `ACK`s between the server and client. This is the approach as taken by the paper. The challenge with these approaches is that more messages put a stronger bound on the performance of the system.

In the face of these difficulties, there are three **semantics** that have been proposed for RPC systems - 

#### At-least-once
At-least-once are the easiest to implement. As you can guess, the promise here is that the call would be executed one times or more. The way this works that the client keeps making the call to the server as long as it doesn't recieve an `ACK`. In case the call is executed on the remote service but the `ACK` got lost, the client re-sends the call and server executes it. Quite clearly, one can see that the call might be executed multiple times - this is precisely where the at-least-once semantics comes from. The psuedo-code for this can look like the following -

{{< highlight python >}}
method_executed = False
while not method_executed:
    ack = send_RPC_and_wait_for_ack(timeout=T)
    if ack and ack.SUCCESS:
        method_executed = True
{{< /highlight >}}


When would this be useful? These semantics are useful when the operation being requested by the client is **idempodent** i.e repeated executions of the same call do not affect the state. An example of an idempodent operation is the setting a bit to 1 when it is zero and not doing anything otherwise. No matter how many times you call this operation, once the bit has been set, subsequent calls do not change the state.

#### At-most-once
In at-most-once the server either executes the call once or not at all. The client makes a call, the server executes it and sends an `ACK`. Whether or not the `ACK` is received by the client, the server does not run the procedure again.

{{< highlight python >}}
request_sent = False
while not request_sent: # only care about msg delivery
    ack = send_RPC_and_wait_for_ack(timeout=T)
    request_sent = True
    if ack and ack.FAILURE:
        request_sent = True
{{< /highlight >}}


#### Exactly-once
Exactly-once semantics are the gold standard of RPC semantics. It guarantees that each call is executed just once thereby mimicing a local procedure call. However, exactly-once semantics are extremely hard to build given the complexities in a distributed system. 

To understand where the difficulty comes from let's think about storing some state on the server to keep track of what all calls have been completed. This way when a new call comes in, depending on whether it has been executed or not we can take an appropriate action.

{{< highlight python >}}
# On the server side
state = {}                       # to manage the state
if not state[client][method]:    # if not executed previously
    resp = handle(method)        # (1)
    state[client][method] = resp # (2) 
    return resp
else:                            # has been executed previously
    return state[client][method] # return cached response
{{< /highlight >}}

Though the code above simple there are two big assumptions that it rests on. For starters, consider what happens when the server fails after executing `(1)` but before `(2)`. In this case, the server hasn't actually recorded the fact that the execution is complete. When the server is brought back up, and the client sends the request again, the server ends up executing the call again. Hence, the exactly-once semantics are broken.

One way out then is to find a way to make `(1)` and `(2)` atomic - ensuring either both of these commands execute or none of these commands execute. If you've done a course on databases, you know that this itself is a hard problem to solve.

### Other limitations
Aside from the semantics, there are two other aspects of RPCs which are worth talking about -

1. **Address Space**: Suppose you're making a local call and you need to pass in a big datastruture (e.g. linked list with 1000 nodes) to the method. How do you do that? You pass a reference to the object. The reason why this works is that in local call, the caller and the callee share the same address space. This is not true in an RPC. In such a scenario, you have to think about creative ways of wiring over a big datastructure efficiently over the network.

2. **Performance**: Performance in a RPC system is order of magnitude slower than the equivalent local call. Apart from the overhead of marshalling etc. the very fact is that the Round-trip-time puts a lower bound on performance - which in itself is substantial. Hence, typically RPC systems addtionally have an asynchronous version of their API so that the main thread on the caller is not blocked while it waits for the results.

### Conclusion
In conclusion what we've seen is the mere fact of adding an unreliable network makes the goals of building a LPC-like abstraction so elusive. Although most of these problems have been solved to a large extent thanks to latest advances & the research but the point remains that the RPCs are much more complex than they seem to be. Hopefully with these set of blog posts, I've whetted your appetite enough to pursue these topics further.

Till next time!
