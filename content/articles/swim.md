+++
date = "2015-02-13T12:42:49+03:00"
title = "The SWIM Membership Protocol"
tags = ["distributed-systems"]
description = "Failure detection in distributed systems"
+++

Let's say that you asked to build a distributed database, something on the likes of [Cassandra](http://cassandra.apache.org/). Your storage system will store and process large amounts of data running on a huge number of commodity servers. In other words, your system will rely on the power of 100s of nodes to manage data.

At this scale, failures will be the norm rather than the exception. Even if we assume that one node lasts for 1000 days (roughly 3 years), in a cluster of 500 nodes there will be a failure once every 2 days. 

To deal with this scenario, you would require a failure detection service, which apart from detecting faulty nodes also keeps all non-faulty processes in sync about the processes that are alive. In this blog post, we'll cover one such protocol called SWIM and understand its inner workings.

### SWIM
The SWIM or the <strong>S</strong>calable <strong>W</strong>eakly-consistent <strong>I</strong>nfection-style process group <strong>M</strong>embership protocol is protocol used for maintaining membership amongst processes in a distributed system.  

> A membership protocol is a system which provides each process of the group with a locally maintained list, called a **membership list**, of other non-faulty processes in the group.

The protocol, hence, carries out two important tasks - 

- detecting failures i.e. how to identify which process has failed and
- disseminating information i.e. how to notify other processes in the system about these failures.

It goes without saying that a membership protocol should be scalable, reliable and fast in detecting failures. The scalability and efficiency of membership protocols is primarily determined by the following properties

- Completeness: Does every failed process get **eventually** detected?
- Speed of failure detection: What is the average time interval between a failure and its detection by a non-faulty process?
- Accuracy: How often are process classified as failed, actually non-faulty (called the false positive rate)?
- Message Load: How much network load is generated per node and is it equally distributed?

Ideally, one would want a protocol that is strongly complete, which means that every faulty process is detected and 100% accurate so that no non-faulty processes are mistakenly taken out of the system. However, like other trade-offs in distributed system there exists an [impossibility result](http://www.ecommons.cornell.edu/bitstream/1813/7192/1/95-1535.pdf) which states that 100% completeness and accuracy cannot be guaranteed over an asynchronous network. Hence, most membership protocols (including SWIM) trade in accuracy for completeness and try to keep the false positive rate as low as possible.

### SWIM Failure Detector
	
The SWIM failure detector uses two parameters - a protocol period `T` and an integer `k` which is the size of failure detection sub-groups.

<figure> 
  <img src="/images/swim.png" height="100px"> 
	<figcaption>SWIM Failure Detection</figcaption>
</figure>

The figure above shows how the protocol works. After every `T` time units, a process M<sub>i</sub> selects a random process from its membership list say M<sub>j</sub> and sends a *ping* to it. It then waits from an *ack* from M<sub>j</sub>. If it does not receive the *ack* within the pre-specified timeout, M<sub>i</sub> indirectly probes M<sub>j</sub> by randomly selecting `k` targets and uses them to send a *ping* to M<sub>j</sub>. Each of these `k` targets then send a *ping* to M<sub>j</sub> on behalf of M<sub>i</sub> and on receiving an *ack* notify M<sub>i</sub>. If, for some reason, none of these processes receive an *ack*, M<sub>i</sub> declares M<sub>j</sub> as failed and hands off the update to the dissemination component.

The key differentiating factor between SWIM and other heart-beating / gossip protocols is how SWIM uses other targets to reach M<sub>j</sub> so as to avoid any congestion on the network path between M<sub>i</sub> and M<sub>j</sub>.

### SWIM Dissemination Component

The dissemination component simply multicasts this information to the rest of the group. All members receiving this message delete M<sub>j</sub> from its local membership list. Information about new members or voluntarily leaving is multicast members in a similar manner.

### Improvements

**Infection-Style Dissemination** - In a more robust version of SWIM, instead of relying on the unreliable and inefficient multicast, the dissemination component piggybacks membership updates on the *ping* and *ack* messages sent by the failure detector protocol. This approach is called the *infection-style* of dissemination which has the benefits of lower packet loss and better latency.

**Suspicion Mechanism** - Even though the SWIM protocol guards against the scenario where there's congestion between two nodes by pinging `k` nodes, there is still a possibility where a perfectly healthy process M<sub>j</sub> becomes slow (high load) or becomes temporarily unavailable due to a network partition around itself and hence is marked failed by the protocol.

SWIM reduces the effect of this problem by running a subprotocol called the Suspicion subprotocol whenever a failure is detected by the basic SWIM. In this protocol, when M<sub>i</sub> finds M<sub>j</sub> to be non-responsive (directly and indirectly) it marks it as a *suspect* instead of marking it as failed. It then uses the dissemination component to send this message M<sub>j</sub>: `suspect` to other nodes (via infection-style). Any process that later finds M<sub>j</sub> responding to *ping* un-marks the suspicion and infects the system with the M<sub>j</sub>: `alive` message.

**Time-bounded Completeness** - The basic SWIM protocol detects failures in an average constant number of protocol periods. While every faulty process is guaranteed to be detected *eventually* there is a small probability that due to the random selection of target nodes there might be a considerable delay before a ping is sent to faulty node. 

A simple improvement suggested by SWIM to mitigate this is by maintaining an array of known elements and selecting *ping* targets in a round-robin fashion. After the array is completely traversed, the process then randomly shuffles this array and continues the process. This provides a finite upper bound on the time units between successive selections of the same target.

### CONCLUSION

After reading all this you are probably thinking to yourself - All this is great, but is it used anywhere? 

The SWIM protocol has found its use in many distributed systems. One popular open-source system that uses SWIM is [Serf](https://www.serfdom.io/), which is a decentralized solution for cluster membership by [Hashicorp](https://www.hashicorp.com/). The [documentation](https://www.serfdom.io/docs/internals/gossip.html) has a reasonably clear walkthrough of the underlying architecture  which I something I would highly recommended. The good people at Hashicorp have also open-sourced their implementation on [Github](https://github.com/hashicorp/memberlist). For the ones who understand better by reading code, be sure to check that out.

Lastly, this blog post deliberately lacks math to keep the ideas simple, but if you're interested in some math be sure to read the [paper](http://www.cs.cornell.edu/~asdas/research/dsn02-SWIM.pdf) to better understand upper bounds on false positive rate, average time for detecting failures and network load.

I hope this blog post gave you some high-level ideas on how failure detectors and membership protocols work and whetted your curiosity on this topic. If you have questions, do let me know in the comments below.

Till next time!
