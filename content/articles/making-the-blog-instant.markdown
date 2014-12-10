---
title: Making the Blog Instant
tags: [javascript]
date: 2014-02-08T12:34:58+03:00
---

[InstantClick.js](http://instantclick.io/) was [released](https://news.ycombinator.com/item?id=7201353) on Hacker News today and I thought I will give it a whirl on my blog. 

InstantClick is a simple library takes makes your pages faster by prefetching the target URL on hover (& touchstart in case of mobile). Based on the concept of [Turbolinks](https://github.com/rails/turbolinks) and [PJAX](http://pjax.heroku.com/) it works by utilizing the 200ms-300ms difference between a hover and a click to fetch the target content via an Ajax call. The obvious downside to this is that the server will have to serve requests that the user never really clicks on. The library also provides a `mousedown` event that can be used in place of `hover` for prefetching which can serve to reduce load on the webserver and still make the site feel fast.

With its downsides, a blog like this makes a perfect candidate for a the library given that it runs on Github's servers and loads static pages. Also, if you're the type who likes to drop into the code to decipher the magic, I urge you to check it out on [Github](https://github.com/dieulot/instantclick/blob/master/instantclick.js) (its very readable).

Now that the library is integrated the posts on blog seem to load instantly! Thanks open-source!
