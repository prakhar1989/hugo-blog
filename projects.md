---
layout: page
permalink: /projects/
title: Projects 
tags: [projects]
modified: 05-05-2014
image:
  feature: mac3.jpg
---

> “For the things we have to learn before we can do them, we learn by doing them.” - Aristotle

I believe that the best way to learn is by working on projects. Below is a growing list of projects that I have shipped across various technologies listed in reverse chronological order.

<ul class="projects-list unstyled-list">
<li>
	<div class="project-item">
		<h3><a href="https://www.npmjs.org/package/newman">Newman</a></h3>
		<p class="stack">Javascript, Node.js, Sinon.js, Grunt, Mocha</p>
<p><a href="https://www.npmjs.org/package/newman">Newman</a> is a command-line collection runner for Postman. With Newman, postman users can integrate Postman collections with their build system or run automated tests for their API through a cron job. One can also use Newman as a grunt plugin to run their API tests any time you save your code in your editor. Newman is available as a npm package and can be installed very easily.</p>
<p>Newman was one of my biggest side-projects till date with development spanning over a two month period. We spent a lot of time in designing the architecture so that it is extensible for its users. At the end Newman is more like a library which can be integrated with any application. Lastly, Newman happens to be my first library to be available on NPM!</p>
<p>For more information about the project do read my accompanying <a href="articles/newman-is-live/">blog post.</a></p>
	</div>
</li>

<li>
	<div class="project-item">
		<h3><a href="https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo">Postman Interceptor</a></h3>
		<p class="stack">Javascript, Sinon.js, Chrome Extension</p>
<p><a href="https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo">Postman Interceptor</a> is a chrome extension that gives <a href="http://getpostman.com">Postman</a> wings! It enables Postman to send restricted headers i.e. headers that cannot be sent via XmlHttpRequest like User-Agent, Referrer etc. and send cookie information with any request.</p>
<p>The killer feature in this extension is the ability to capture any requests sent by the browser and forward them to Postman for inspection. If you are looking at inspecting the API calls that your website is making then all you need to do is just turn on this extension and all your requests will be forwarded to Postman for you to inspect the headers, the form data and body. From a technical standpoint this was my foray into developing a chrome application - an ecosystem for which I have become quite fond of post the project. Writing tests for an extension was challenging but with the availability of stubs and mocks in <a href="#">Sinon</a> they became a breeze.</p>
<p>Here is a short 20sec demo on how it works!</p>
<iframe width="420" height="315" src="//www.youtube.com/embed/Dxf-o_DLSLw" frameborder="0" allowfullscreen></iframe>
	</div>
</li>

<li>
	<div class="project-item">
		<h3><a href="http://dump.getpostman.com">PostmanBin</a></h3>
		<p class="stack">Python, Flask, RESTful API</p>
		<p><a href="http://github.com/prakhar1989/postmanbin">PostmanBin</a> is fork of the utterly useful <a href="http://httpbin.org">HttpBin</a> project by Kenneth Reitz. It takes the existing repo and uses Flask-Restful to build a RESTful api for a blog - useful for debugging requests via Postman or otherwise.</p>
	</div>
</li>

<li>
	<div class="project-item">
		<h3><a href="https://github.com/prakhar1989/gettup">Gettup</a></h3>
			<p class="stack">Python, Command-Line</p>
			<p><a href="http://github.com/prakhar1989/Gettup">Gettup</a> is one of those scratch-your-itch projects I worked on thorough which you can instantly share a file right from your terminal. Maybe you are SSHed into a server and feel scp is too troublesome or you do not want to open a website and drag-drop (or worse, upload) a file? </p>
<p>Gettup is a simple command line utility which lets you share and upload files to the <a href="http://ge.tt/">ge.tt</a> sharing service quickly and easily. It uses the Ge.tt API to share a file and generate a URL that you can share. It features a LOT of cool options like bulk upload, ability to create shares (a collection of files) and rename files. Feel free to go through the <a href="https://github.com/prakhar1989/gettup/blob/master/README.md">README</a> for the complete list. Gettup also helped me in ticking off an item from my bucket list i.e. publishing a python package on the <a href="https://pypi.python.org/pypi/gettup/0.3.0">Python Package Index!</a></p>
	</div>
</li>

<li>
	<div class="project-item">
		<h3><a href="https://github.com/prakhar1989/Stripe-CTF">Stripe CTF 3.0</a></h3>
		<p class="stack">Scala, Node.js, Ruby</p>
		<p><a href="https://stripe-ctf.com/">Capture the Flag</a> or CTF is an annual programming competition held by <a href="#">Stripe</a> where developers have to solve challenging problems by writing code! This was my first attempt at participating in the CTF and it turned out to be super fun! The challenges were really well thought, the community around it was inspiring and the overall experience was very good. Not to mention I also got a free Stripe Tshirt for finishing in the top 1000!</p>
	</div>
</li>

<li>
	<div class="project-item">
		<h3><a href="https://github.com/prakhar1989/TimeLogger">TimeLogger</a></h3>
		<p class="stack">Python, Django, Google Charts</p>
		<p><a href="https://github.com/prakhar1989/TimeLogger">Timelogger</a> is a Django backed time tracking application. The idea of building a time-tracking app germinated on seeing developers at my current company being asked to track their time spent on building features, squashing bugs and attending meetings. Timelogger features a customizable and a pretty rad Admin dashboard interface that allows anyone to add projects in varying categories, carry out user management and track leaves. </p>
<p>Witnessing the analysis done on time-tracking data, timelogger was built with strong reporting capabilities in mind with options to get in-depth and summarized graphs of activities of an individual or a team (offshore and onshore), all of which could be neatly exported to Excel for more in-depth analysis. Finally, Timelogger boasts of a fully responsive UI that works well on a mobile and features tight integration with <a href="http://www.redmine.org/">Redmine</a> - an open-source bug tracking system.</p>
	</div>
</li>

<li>
	<div class="project-item">
		<h3><a href="https://github.com/prakhar1989/Algorithms">Python Algorithms</a></h3>
		<p class="stack">Python</p>
		<p>What started off as a small set of algorithms while solving problems in Tim Roughgarden's excellent course - <a href="https://www.coursera.org/course/algo">Analysis and Design of Algorithms</a> slowly grew into a collection of 30 famous data-structures and algorithms reimplemented in Python covering Dynamic Programming, Graph Algorithms and String algorithms. All implementations are complete with test data and thorough tests. With more than 200 stars on Github, this also happens to be my most popular repository!</p>
	</div>
</li>

<li>
	<div class="project-item">
		<h3>Oh My Green!</h3>
		<p class="stack">Ruby on Rails, Facebook Graph API</p>
		<p><a href="http://www.ohmygreen.com/store">Oh My Green</a> is Palo Alto based E-commerce company specializing in selling organic, non-GMO food and snacks. It was started by a group of Stanford alumni and I was hired as a summer intern for porting their entire PHP Symphony app to <a href="http://omgonrails.herokuapp.com/">Ruby on Rails</a>. This was my first experience working remotely with a diverse team and it was good fun building a cool referral signup program on Rails!</p>
	</div>
</li>

<li>
<div class="project-item">
	<h3><a href="https://github.com/prakhar1989/Reco_Engine">Recommendation Engine using Collaborative Filtering</a></h3>
	<p class="stack">Python</p>
	<p>After Andrew Ng's awesome class on <a href="https://www.coursera.org/course/ml">Machine Learning</a> I was extremely excited to try our some of my newly learnt ML skills on a more practical project in a more practical language (Octave was quite boring!). What could be better than building your own recommendation engine based on collaborative filtering - <a href="http://en.wikipedia.org/wiki/Netflix_Prize">the algorithm that was originally used by Amazon and Netflix for their recommendation engines!</a> The project was inspired by a very cool <a href="http://files.grouplens.org/papers/algs.pdf">paper</a> on the same topic by the leading authors in this field and the creators of the GroupLens database. The result was a nifty implementation of the paper and some interesting recommendations that no longer seemed like magic!</p>
</div>
</li>

<li>
<div class="project-item">
	<h3><a href="https://github.com/prakhar1989/VotingApplication">Voting Application</a></h3>
	<p class="stack">Python, Flask, Backbone.js</p>
	<p>This creatively named application was developed in college for <em>(yes, you guessed it right)</em> elections! Built using a RESTful backend and a Javascript heavy front-end powered by Backbone, it was my attempt to build a medium sized application and to sub-consciously jump on the fat client - thin server bandwagon. Being an overall good fun to develop in, I ended up <a href="https://gist.github.com/prakhar1989/2c40618266a4887e3435">writing few parts</a> of the application that helped in doing other projects in the university as well.</p>
</div>
</li>

<li>
<div class="project-item">
	<h3><a href="http://github.com/prakhar1989/Loops">Loops</a></h3>
	<p class="stack">Javascript, Last.fm API, Flask</p>
	<figure>
		<a href="#"><img src="/images/loops.png"></a>
	</figure>
	<p>Everyone loves a music player with a nice interface, dynamic album art and last.fm integration. Sweeping generalizations aside loops is my first attempt at making a Single Page Web App (SPA). It is built without a JS MVC framework, something that I found too intimidating at that time, with flask as a minimal backend. Loops has a slick interface <em>(yes, those discs in LOOPS actually rotate!)</em>, last.fm integration for album art and artist info along with keyboard shortcuts.</p>
</div>
</li>

<li>
<div class="project-item">
	<h3><a href="http://jokastore.appspot.com">Jokastore</a></h3>
	<p class="stack"><strong>Tshirt Design</strong>, Python, Webapp2, Google App Engine, Google API</p>
	<p><a href="https://github.com/prakhar1989/Jokastore">Jokastore</a> is a mini-ecommerce store built from scratch for the entrepreneurship class at IIM Calcutta. Our team used the store to sell witty and minimally designed Tshirts to Jokars (students of IIMC). Jokastore is a simple e-commerce platform with tight social integration, Google login and traditional cart features. Being interested in design, I also designed the Tshirts in Photoshop and released a video charting the journey of an IIMC student as a sequence of Tshirts. The project went on to become extremely popular and also got us a mention on the National Daily!</p>
</div>
</li>

<li>
<div class="project-item">
	<h3><a href="https://github.com/prakhar1989/Color-palette">Color Palette</a></h3>
	<p class="stack">Python, lxml</p>
	<p>Uses the fabulous LXML library to traverse a website's stylesheets and get the dominant colors used in it. It generates an HTML file containing the colors sorted by their frequency. This probably needs to be expanded to generate website screenshots and apply clustering to get a better "feel" for the color like Apple's iTunes!</p>
</div>
</li>

<li>
<div class="project-item">
	<h3><a href="https://github.com/prakhar1989/pastie">Pastie</a></h3>
	<p class="stack">Sinatra, Ruby, Datamapper</p>
	<p>Pastie was born in the wee hours of the night when I was trying to learn how to use Sinatra and DataMapper. You can use it to save snippets of code to share it with others. As an added bonus: it adds beautiful syntax coloring to it as well. Just paste your fugly code and press Ctrl-s to save. Inspired by <a href="http://hastebin.com">Hastebin.</a></p>
</div>
</li>

</ul>

## Courses

I'm quite passionate about improving as a programmer and regularly seek the help of courses to keep in touch with theory and learn new concepts in Computer Science. I consider myself extremely lucky to be alive and have the resources to be part of the educational revolution (read <a href="http://en.wikipedia.org/wiki/Massive_open_online_course">MOOCs</a>) that is sweeping over the world. Below is a small but ever-growing list of courses that I've successfully completed!

* [Developing Web Applications](https://www.udacity.com/course/cs253)
* [Functional Programming in Scala](https://www.coursera.org/course/progfun)
* [Algorithms with Tim Roughgarden](https://www.coursera.org/course/algo) 
* [Computing for Data Analytics in R](https://www.coursera.org/course/compdata)
* [Machine Learning](https://www.coursera.org/course/ml)
