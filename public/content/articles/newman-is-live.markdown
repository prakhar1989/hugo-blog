---
title: Newman Is Live
date: 2014-05-05T12:34:58+03:00
tags: [postman, newman]
---

And finally, after working non-stop on the project for 45 days [Newman](http://github.com/a85/Newman) is finally in beta. Newman is a command-line collection runner for [Postman](http://getpostman.com) built fully on Node.js. Newman is my first-ever node.js project and I'm extremely glad to have got a chance to build something useful and learn a new technology. 

<figure>
	<a href="#"><img src="/images/newman.png"></a>
	<figcaption><a href="http://www.flickr.com/photos/80901381@N04/7758832526/" title="Newman Demo">Newman Demo</a>.</figcaption>
</figure>

Node has been on my radar for quite some time given its meteoric rise and hype. Plus, evented programming is something that I have been waiting to try outside of confines of a browser. Overall, I've been pretty happy with the entire ecosystem - lots of libraries, good support and helpful community. If you are good enough with JavaScript you can be productive in Node pretty easily.

Getting back to Newman, the ability to run postman collections from the command line was one of the most demanded features by Postman users. With this in place, developers can set up API tests which run automatically on every commit, subsequently passing or failing a new build. This allows developers to make sure their APIs don't break and have a Continous Integration system which keeps everything in check.

If you are a postman user I urge you to go check out Newman. It can dramatically make your life easier and improve your workflow. We've tried hard to make the [readme](https://github.com/a85/Newman/blob/master/README.md) as readable and useful as possible. If you face any issues while setting up or running Nemwan please feel free to file an issue.

On the learning front, Newman was an immensely rewarding experience. With the project repo being over 9 weeks old, this is surely the longest I have worked on a side-project. From running good unit tests to organizing your project I learned a lot of things that I had no prior experience in. Pair programming with [Arjun](http://github.com/viig99) was super fun and damn helpful. Our code reviews taught me a lot and definitely made me a better programmer.

In the coming days, I'll be talking about more of my technical learnings with regards to design and testing on this blog - so stay tuned for that. Hopefully, with Newman out, I'll write more frequently. Expect to see more posts on Golang as my next project is an exciting new game!

For any feedback on Newman, feel free to reach out!
