+++
date = "2015-09-18T20:33:29+03:00"
title = "The Domain Name System"
tags = ["distributed-systems", "papers"]
description = "Summary of the DNS paper"
mastimage = "https://upload.wikimedia.org/wikibooks/en/7/72/Strucutre-of-dns.jpg"
+++

One of the classes that I've taken this semester is [Advanced Distributed Systems](http://roxanageambasu.github.io/ds2-class/2-papers/). The course is primarily a research seminar wherein the students are required to read a couple of research topics for each class and participate in a two hour discussion which is guided by the professor. My goal in these series of blog posts is to summarize the papers in an approchable manner primarily to test my own understanding of the topic.

### The Domain Name System
The first paper discussion for this class was a [paper](http://www.dtic.mil/dtic/tr/fulltext/u2/a203901.pdf) on the **Developement of the DNS**. This paper examines the ideas behind the initial design of the DNS in 1983 and discusses the evolution of these ideas into a working implementation. Why is this paper important in a distributed systems class? Before we answer that, lets try to define a distributed system.

> A distributed system is a set of *independent* machines that *coordinate* over a *network* to achieve a common goal.

If you look at the definition (particuarly the emphasized words) above carefully, you'll realize that the DNS indeed behaves as a distributed system. Infact the DNS is one of earliest examples of a distributed system deployed at scale.

### The paper
<figure>
    <img data-action="zoom" src="https://upload.wikimedia.org/wikibooks/en/7/72/Strucutre-of-dns.jpg"></img>
    <figcaption>The hierarchical structure of DNS. Image courtesy: Wikibooks</figcaption>
</figure>

- Before the DNS, the `HOSTS.TXT` file was used for publishing the mapping between host names and addresses. Eventually as the number of users and workstations grew it became harder and harder to transmit the file due to its increasing size.
- An early design goal of the DNS system was, aside from feature-parity with `HOSTS.TXT`, was the ability for the system to be independent of network topology and to be capable of encapsulating other names spaces.
- The initial DNS design assumed the necessity of striking a balance between a very lean service and a completely general distributed database. The leaner and more general the service, the easier it would be to extend and replace the existing implementation. Similarly, although the service offers lookup and persistence like a database it would not provide other features such as atomic guarantees around updates.
- The active components of the DNS are of two major types: name servers and resolvers. 
    - Name servers are repositories of information, and answer queries using whatever information they possess. 
    - Resolvers interface to client programs, and embody the algorithms necessary to find a name server that has the information sought by the client.
- Early on it was decided that the DNS would exhibit a distributed system of control and its design (as a tree with organizations being in control of their subtree) grew as a natural consequence of this choice. 
- The domain name of a node is the concatenation of all labels on the path from the node to the root of the tree. Hence, the domain `www.google.com` is a node in the tree and has `www`, `google`, `com` and `.` as its ancestors. This has been demonstrated more clearly in the DNS resolution section below.
- The DNS provides two major mechanisms for transferring data from its ultimate source to ultimate destination: zones and caching. 
    - Zones are sections of the system-wide database which are controlled by a specific organization. The organization controlling a zone is responsible for distributing current copies of the zones to multiple servers which make the zones available to clients throughout the Internet.  
    - Caching is a mechanism whereby data acquired in response to a client’s request can be locally stored against future requests by the same or other client. The mechanism for controlling caching is a time-to-live (TTL) field. However, all components of the DNS prefer authoritative information to cached information when both are available locally.

The rest of the paper talks about the issues with implementing and gradually migrating the servers to use the new servers. Their experience with performance, for example, is quite indicative of how hard it is to benchmark systems that have multiple components all of which keep changing quickly.

> *A related surprise was the difficulty in making reasonable measurements of DNS performance. We had planned to measure the performance of DNS components in order to estimate costs for future enhancement and growth, and to guide tuning of existing retransmission intervals, but the measurements were often swamped by unrelated effects due to gateway changes, new DNS software releases, and the like.*

### Negative Caching
A **negative cache** is a cache that also stores "negative" responses, i.e. failures. This means that a program remembers the result indicating a failure even after the cause has been corrected. In DNS, negative caching is a feature and the authors make a strong case for it in the paper.

> *Our conclusion is that any naming system that relies on caching for performance may need caching for negative results as well. Such a mechanism has been added to the DNS as an optional feature, with impressive performance gains in cases where it is supported in both the involved name servers and resolvers.*

The primary reason for maintaining a negative cache is performance. As seen by the authors, typically one out of every four DNS queries were for negative results i.e asking resolvers for hosts or data that did not exist. To ensure that the volume of queries do not impact the system, the servers and resolvers would cache these negative responses with its own TTL.

### Root Servers

The most interesting part in the paper for me was the idea of root servers - the servers which form the apex of the domain name system. In absence of a caching mechanism every DNS query would have to flow via one of these root servers. How many servers are there? Let's run `dig` to find out.

{{< highlight raw >}}
$ dig NS +noadditional +noquestion +nocomments +nocmd +nostats . @8.8.8.8

570	IN	NS	a.root-servers.net.

570	IN	NS	b.root-servers.net.

570	IN	NS	c.root-servers.net.

570	IN	NS	d.root-servers.net.

570	IN	NS	e.root-servers.net.

570	IN	NS	f.root-servers.net.

570	IN	NS	g.root-servers.net.

570	IN	NS	h.root-servers.net.

570	IN	NS	i.root-servers.net.

570	IN	NS	j.root-servers.net.

570	IN	NS	k.root-servers.net.

570	IN	NS	l.root-servers.net.

570	IN	NS	m.root-servers.net.

{{< /highlight >}}

So there are *just* 13 servers responsible for the whole internet? Well no, this does not mean there are 13 physical servers; each operator uses multiple servers distributed geographically to service the requests. 

Who operates these servers? These servers are collectively operated by universities, companies and government bodies. To know more about who operates which server see the entry on [Wikipedia](https://en.wikipedia.org/wiki/Root_name_server#Root_server_addresses).

### DNS Resolution

Now that we know the overall architecture of the DNS lets see if we can figure out how a typical DNS resolution happens. Although the full cycle spans multiple steps, in practice heavy levels of caching at each step ensures that no typical name-server is inundated with requests. However, let's assume that in this example all our caches are purged and hence our query goes via the root.
 
Suppose the DNS query is for: [www.google.com](http://www.google.com/)

{{< highlight raw >}}
[subdomain] [domain]  [TLD] [root (implicit)]
    www    . google .  com   .
{{< /highlight >}}

1. The DNS lookup starts from right to left.
2. When the . is encountered, the client queries the root name server asking for what all name servers are available to service its request. The root server [responds](http://www.digwebinterface.com/?hostnames=.&type=NS&showcommand=on&ns=resolver&useresolver=8.8.8.8&nameservers=) with the list of 13 name servers.
3. The client then picks a name server (lets assume d.root-servers.net) and asks the name server about the .com TLD (top-level domain). The root server [responds](http://www.digwebinterface.com/?hostnames=com&type=NS&showcommand=on&useresolver=8.8.8.8&ns=self&nameservers=d.root-servers.net.) with all the name-servers that serve this TLD (which interestingly is also 13)
4. Following along, the client picks up a name server and asks it if it knows about the google domain. The server [responds](http://www.digwebinterface.com/?hostnames=google.com&type=NS&showcommand=on&useresolver=8.8.8.8&ns=self&nameservers=h.gtld-servers.net.) with the name servers that manage that namespace. In Google's case, the company itself manages its name servers but for usual websites this typically resolves to the DNS provider (e.g. Godaddy / Namecheap etc.) with which the domain name is registered.
5. In the last step [the query](http://www.digwebinterface.com/?hostnames=www.google.com&type=A&showcommand=on&useresolver=8.8.8.8&ns=self&nameservers=ns1.google.com.) for the subdomain (www / mail / maps etc.) is made and the name server accordingly maps to the IP of the server as specified in the A (Address) record. This typically for large websites is the IP of a load balancer that is responsible for forwarding requests to the correct webserver.
6. After the DNS resolution is complete, the browser caches this mapping and uses it to directly for subsequent requests (e.g images / css / javascript etc.)

### Conclusion 
Overall the paper give an interesting historical perspective on why the DNS came to be and the issues that came to light during its implementation and deployement. The paper, surprisingly, is also littered with good advice about software engineering and the human-side that forms the essential aspect of building software. I will end this writeup with my favorite sentence from the paper - 

> *Documentation should always be written with the assumption that only the examples are read.*

Till next time!
