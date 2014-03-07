---
layout: post
title: Developing Chrome Extensions
description: Lessons Learnt
category: articles
tags: [javascript, chrome]
---

For the past two weeks I've been working with a friend a cool new feature for the Interceptor extension. Interceptor is a chrome extension which extends Postman's (packaged app) ability to send restricted headers like `user-agent` & `content-type` along with adding great support for cookies. Coupled with the Interceptor, the Postman Packaged app achieves feature parity with the Postman chrome extension (legacy app).

Our job with the interceptor was to add a feature thats allows users to capture requests and send them off to Postman. Think [Fiddler](http://www.telerik.com/fiddler) or [Charles](http://www.charlesproxy.com/) for Chrome! What this gives users is the ability to inspect any API with just a single click and debug the request right inside Postman, the tool they already know and love, for making API calls.

Here's a quick 20 sec video showing the Interceptor in action 

<iframe width="420" height="315" src="//www.youtube.com/embed/Dxf-o_DLSLw" frameborder="0" allowfullscreen></iframe>

## Ecosystem

This was my first experience on working on a chrome extension

## Testing

Being new to developing extensions I was quite clueless on how to proceed with writing automated tests for the Interceptor. For that matter, testing tests for pure javascript apps was also something that I had not done previously. Thankfully, I had used Rspec with Rails and Nose with Flask which made the transition easy. 

Early on in the project we decided that we would be focusing on doing functionality testing to test the integration between the Postman app and the extension. 

## Lessons
