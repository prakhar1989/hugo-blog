+++
date = "2016-01-01T12:15:24+05:30"
title = "2015 - A year in review"
description = "Looking back on 2015"
mastimage = "http://prakhar.me/images/2015-githubstreak.png"
tags = ["rant"]
+++

It's that time of year when [people](http://blog.fogus.me/2015/12/29/the-best-things-and-stuff-of-2015/) [are](http://nathanbarry.com/2015-review/) [writing](https://medium.com/@cheeaun/2015-in-review-a55c23d2af59#.kedfupgln) about what they accomplished in the year, sites are publishing countless *the-best-of*  [lists](http://www.themacro.com/articles/2015/12/yc-2015-reading-list/) and the only thing I'm left wondering seeing [YouTube Rewind](https://www.youtube.com/watch?v=KK9bwTlAvgo) is - "How come I've never heard any of this?"

Since [last year](http://prakhar.me/articles/2014-year-in-review/), I too have started this ritual of writing down key highlights of my year so that I can look back a few years from now and have a chuckle at my naiveté.

### Open Source
2015 was a **great** year for me on Github. I did quite a bunch of work across various projects, different technologies and overall had a blast compulsively typing the innocuous looking incantation - `git push`

<figure> <img src="/images/2015-githubstreak.png"> 
	<figcaption>Yay! Lots of green!</figcaption>
</figure>

The highlight of the year, however, was my selection in Google Summer of Code 2015 and the project (called [Surveyman](http://surveyman.github.io/)) that I worked on during the summer. Having a great mentor, an exciting problem and a chance to work on React gave me enough motivation to spend late-nights after my day-job to hack on the project for approximately 4 months non-stop! 

The first chunk of grey blocks visible around the month of March are due to a mini-burnout that I suffered. Coupled with college admissions announcements and a major release at my [workplace](http://xcite.com) I had no energy to hack after coming back from work. In order to recuperate, I decided to not write code on 2 days of the week - which is what you see in bottom gray boxes in April. In hindsight, it worked out well as the weekends were spent playing squash and finishing a couple of [video](https://www.destinythegame.com/) [games](http://www.rockstargames.com/V/) that were pending on my list for quite a while. Note to self: Do try this again!

### New Tech - React, Go and Clojure

If 2014 was the year of Nodejs, 2015 was the year of React. Although I jumped on the React bandwagon pretty late, I got an opportunity to work on a quite a few [fun projects](https://github.com/search?utf8=%E2%9C%93&q=react+user%3Aprakhar1989&type=Repositories&ref=advsearch&l=&l=). From boilerplates to chrome extensions - React till now has scaled to all my needs. It feels great to have an awesome tool in my arsenal that I can wield whenever I need something done on the front-end. 

Towards the end of last year I promised myself to learn a [Lisp](https://en.wikipedia.org/wiki/Lisp_%28programming_language%29) and that's how I stumbled onto Clojure. The sales pitch of offering the trifecta of expressiveness (macros), practicality (JVM) and concurrency sounded like a compelling alternative to the languages I was using for most of my day-to-day work. So roughly 365 days ago, I tried a [small experiment](https://github.com/prakhar1989/clj-spellchecker) wherein I ported some Python code over to Clojure and came away pretty impressed. In the ensuing months, after spending a good chunk of my time working on [4clojure](http://www.4clojure.com/) and a [mini-course](http://mooc.fi/courses/2014/clojure/index.html), I eventually started writing (but unfortunately didn't finish) a [guide](http://www.clojurebyexample.org/) for others. To be honest, the only reason I decided to learn React was to get started with [Om](https://github.com/omcljs/om).

Long story short, little did I know that the language that I had become so fond of during the year, will eventually help me land an internship! 

> I'm super excited to share that I'll be interning this summer in the beautiful city of LA with [Factual](http://factual.com) where I'll be building distributed systems in Clojure!

My affair with Go is still in its very early stages. Go is an ideal candidate for building easy-to-deploy concurrent programs and that's what I used it for. Started initially with building a [worker](https://github.com/prakhar1989/cloud-projects/blob/master/sqstwitt/worker/worker.go) that consumes messages from a queue, I eventually ended up writing a crawler for [bekanjoos](https://github.com/prakhar1989/bekanjoos/tree/master/crawler) in Go as well. Overall, I think Go is a language very easy to get productive with. It is simple, has easy-to-grok concurrency primitives and produces statically compiled artifacts which are an absolute pleasure to deploy on servers. At the risk of sounding controversial - I'd recommend that every Python / Node.js developer should give Go a try for their next backend project.

### Courses and Papers

On the academic front, this year I fared better than last year. Outside of grad school, I completed two courses - [Intro to Big Data in Spark](/articles/big-data-with-spark/) and [Scalable Machine Learning](/articles/scalable-machine-learning/). All wasn't as rosy though, I started with a couple more but had to drop out as I was unable to cope up. I plan to give these courses a second attempt in this year - let's hope I am more successful this time. 

One department that I drastically need to improve in is reading technical papers. I'm still excruciatingly slow when it comes to reading papers and even more so when I need to blog about it. My grandiose plans of [blogging](/tags/distributed-systems/) about every distributed systems paper I read collapsed as the semester picked up pace and I started falling behind in classes. Clearly spending 20 hours on reading one paper, making notes and then writing about is not scalable. Writing [paper summaries](https://github.com/prakhar1989/Paper-Summaries) on the other hand has been a bit easier as you expect the reader to have an idea of the paper already. The only positive aspect was that I met my goal of reading more than 15 papers spanning across cloud computing, distributed systems and information retrieval.

### Personal
As far as relationships go, 2015 was just fantastic. The most exciting part of joining graduate school was meeting more like-minded nerds! I made a bunch of new friends, met school friends after eons and even played host to a complete [stranger](http://softwareengineeringdaily.com/about/) for an afternoon!

Last year's post ends with me promising to get more *active*. Thankfully, having a [room](https://www.instagram.com/p/9eLp5kr4Hg/?taken-by=prakhar.srivastav) overlooking the picturesque [Riverside Park](http://www.nycgovparks.org/park-features/riverside-park/virtual-tour) meant that I didn't have to work hard to fight my [lizard brain](http://sethgodin.typepad.com/seths_blog/2010/01/quieting-the-lizard-brain.html) to stay indoors. As a result, I started [logging my runs](http://www.strava.com/athletes/10955633) and eventually ended up running my [first 10k](https://www.strava.com/activities/396309765) around Central Park!

### Plans for 2016
- Build a non-trivial mobile app using React Native
- Write more Clojure(script). Publish something useful on [Clojars](http://clojars.org)
- Blog about at least 5 more technical papers.
- Run at least 150 miles over the course of the entire year

Here's to an equally productive and fun 2016! 🍻
