+++
date = "2015-05-17T15:50:49+03:00"
title = "Week 4 - Surveyman"
description = "React-tags: A new component"
tags = ["react", "surveyman"]
+++

I closed last week's [update](/articles/surveyman-week3) giving an indication that I started work on a standalone [React component](http://prakhar.me/react-tags/example/). After working on the component this week, I was finally able to finish it and publish it on [NPM](http://npmjs.org/package/react-tag-input).

So before I go into what React-tag-input does, I'll try and explain the motivation for building it. If you've been following closely, the primary way of building the survey in Surveyman is via Drag and Drop. On the plus side, this makes it easy for non-technical users to interact but on the negative side drag and drop can become cumbersome especially if you're relying it on to repeatedly add items. 

Last week, after adding an alternative way to add a question and block I was in the lookout for making a convenient way for adding Options. Luckily, after multiple conversations with a [friend](http://vickychijwani.me/) and some [inspiration](http://mail.google.com) I decided to use a tag like component where users could add options in one go. Since, the order of options is important, I also wanted the options to be order able. Lastly, since most of options in a typical survey would be re-used, especially the ones that are a part of [Likert scale](http://en.wikipedia.org/wiki/Likert_scale), the ability to autosuggest would keep the errors to a minimum and save on typing.

After failing to find a React component that could satisfy the above requirement, I decided that it would be a good idea to build one myself and then open-source in the community so that others could also benefit. Apart from deriving satisfaction from dog-fooding a component in my project, the idea of publishing a complete, useable react component in the wild sounded too interesting to let go.

Overall the entire exercise was a lot of fun and I definitely learnt a lot. The fact that I was able to build a working prototype is less than 150 lines of code (initially) speaks volumes about how powerful React is. The paradigm of thinking in terms of re-rendering the entire DOM makes it extremely easy for a developer to reason about the UI and the enclosed state. It is definitely one of the most exciting JS libraries I've ever worked with. 

Not all is rosy though. When you are using React, you are inundated with lots of jargon and tools that form a vital part of the React ecosystem such as ES6, Webpack, Immutability etc. Initially it does feel that its a lot to take in. Hence, the toughest part for me was following the best practices on how to build a React component that could be used easily via CommonJS and also the browser (via a simple script tag). Thankfully, libraries like [ReactDND](https://github.com/gaearon/react-dnd) helped me a lot and I was finally able to a come up with a satisfactory `dev` and `build` system in Webpack.

A quick demo of the component can be viewed [here](http://prakhar.me/react-tags/example/) and the code is available on [Github](https://github.com/prakhar1989/react-tags) for you to fork and point out issues!

My plan for this week is to integrate this component with Surveyman and finish out the CRUD functionalities. Unfortunately, a key project at my workplace is sucking in all my time resulting in drowsy days and sleep deprived nights so I'll have to balance my time really well to stay productive on open-source this week. Let's hope I am able to meet this milestone!