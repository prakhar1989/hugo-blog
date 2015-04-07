+++
date = "2015-04-07T06:58:24+03:00"
title = "Week 1 - Surveyman"
description = "Setting up React, Reflux and ES6"
tags = ["react", "surveyman"]
+++

Last week, I announced that I have applied for GSOC project called Surveyman as a part of which I'll be building a React application that allows users to build a survey. 

How will this be different from the countless other similar tools that exist? For the long answer, I'd advise you to read the [paper](http://people.cs.umass.edu/~emery/pubs/SurveyMan-preprint-OOPSLA2014.pdf) but the short answer is that SurveyMan exposes a lightweight Domain Specific Language for designing and deploying surveys. It then does static and dynamic analysis on the survey and find survey bugs and control the quality of responses.

My project basically deals with designing a front-end single-page application which makes it easy for non-programmers to use the DSL and build out the survey. The most fun part about the project is that the application needs to be in React and this would be great opportunity to build something useful and learn React at the same time.

<figure><img src="/images/surveyman.png"></img>
	<figcaption> Wireframe for the front-end </figcaption>
</figure>

Before the GSOC deadline period ended, I had setup an [application](https://github.com/prakhar1989/react-surveyman) that supported drag drop from the Toolbox (shown above) to the Dropzone. To keep the demo simple, all widgets when dropped were added to the *end* of the survey e.g. When a Question widget is dropped onto the page, it gets added to the end of the Survey. This was natural extension to the [Starter task](https://github.com/SurveyMan/SurveyMan/wiki/Google-Summer-of-Code-2015-Starter-Task#blocks-language-starter-task) outlined by the mentor.

During this period, I spent most of time [learning](https://github.com/prakhar1989/react-playground) React and experimenting with drag and drop APIs as a part of which I built a simple drag-and-drop [shopping cart example](https://github.com/prakhar1989/react-shopping-cart).

After the proposal was submitted and the wireframe finalized, my main goal was to set up an overlying architecture of how the application will be organized. Another important part was to figure what key libraries the project will depend on. In the initial version, all events were setup at the root controller which was responsible for updating the state and passing down the changes to the sub components. This week I migrated the application to support the [Flux](http://facebook.github.io/flux) architecture by using the [Reflux](https://github.com/spoike/refluxjs) library to dispatch actions to stores.

Other than that I also included the extremely useful drag and drop library - [ReactDND](https://github.com/gaearon/react-dnd/) which makes it very easy to setup drag sources and drop targets. Rather than having one drop zone where all widgets are dropped I extended the functionality of all survey items to act as drop targets and accordingly action the event.

The final piece of the puzzle includes setting up a CommonJS module system for which I used [browserify](http://browserify.org/). Since most of the online react example were based on ES6 I decided to jump the gun and start using ES6 myself. This was easy to setup via the [babelify](https://github.com/babel/babelify) npm module. For more info, you can dive into the `package.json` and see the [configuration](https://github.com/prakhar1989/react-surveyman/blob/master/package.json#L8-L9) for yourself.

The application as it currently stands can be seen [here](http://prakhar.me/react-surveyman) and the code can be browsed on [Github](https://github.com/prakhar1989/react-surveyman).

My plan for the next week is to improve the UI for taking the input, which for the time being, is a simple JS `prompt`. The next step would be to enable other [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) features namely, update and delete for survey components.

Till next time!