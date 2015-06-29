+++
date = "2015-06-08T15:50:49+03:00"
title = "Week 7 - Surveyman"
description = "Migration to React-DnD 1.0"
tags = ["react", "surveyman"]
+++

Guess what, I'm writing this blog post from my home in Delhi! I'll be in India for full 2 weeks where apart from visiting my family, cousins and friends I'll also be giving my visa interview - which is the main reason why I've taken a vacation.

As I had been traveling the progress this week has been rather minimal. Keeping the travel schedule in mind, I had kept the goal to be reasonable which was upgrading the react-surveyman project to use React-DnD's latest 1.x version.

If you've been following the progress of the project closely then you're probably aware the that [React-DnD](https://github.com/gaearon/react-dnd) is the drag-and-drop library for React that I use in my projects. Authored by the super productive and super smart, [Dan Abramov](https://twitter.com/dan_abramov), React DND abstracts out the various HTML5 drag-and-drop events and gives you a nice way to customize the drag and drop behavior of your React components.

Earlier last month, Dan published the 1.0 release of the library where he made considerable changes in the API. Keeping in the mind the best practices in the React world, the most significant change was replacing mixins with decorators. To understand the motivation behind this change, you can read the [blog post](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) written by the man himself.

> To be clear, mixins is an escape hatch to work around reusability limitations in the system. It’s not idiomatic React. Making composition easier is a higher priority than making arbitrary mixins work. I’ll focus on making composition easier so we can get rid of mixins. - Sebastian Markbage (React core team)


All in all, the change was quite straightforward, the credit for which goes to the excellent [documentation](http://gaearon.github.io/react-dnd/) on the website. Dan has worked really hard to make sure that his library is approachable and it clearly shows. The [tutorial](http://gaearon.github.io/react-dnd/docs-tutorial.html) itself, is so well explained that I'd go to the extent to say that it's one of the best React tutorials out there.

<blockquote class="twitter-tweet tw-align-center" lang="en"><p lang="en" dir="ltr">Attention library authors: <a href="https://twitter.com/dan_abramov">@dan_abramov</a>&#39;s tutorial on React-DND is the new gold standard for API documentation. <a href="http://t.co/AeLugT5Iov">http://t.co/AeLugT5Iov</a></p>&mdash; Prakhar Srivastav (@prakharsriv9) <a href="https://twitter.com/prakharsriv9/status/606153755340382208">June 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So after working through the tutorial and the browsing thorough the examples, I was able to successfully port both react-surveyman and the [react-tags](http://github.com/prakhar1989/react-tags) project to use the latest React-DnD library.
