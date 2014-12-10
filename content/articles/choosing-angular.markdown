---
title: Choosing Angular
date: 2014-07-06T12:34:58+03:00
tags: [angularjs]
---

For the last couple of weeks I've spent a good deal of time on building a
brand new checkout for [Xcite.com](http://www.xcite.com). Like other ecommerce
websites, our website has a conventional 3 step checkout - login/signup,
delivery and finally, payment. As a part of new project our goal is to allow
customers to checkout as guests i.e. without the need of creating an account
with Xcite. This allows us to reduce a step for customers who just want
quickly purchase something off the website and be on their way.

Being an ecommerce website, user experience is something that is of paramount importance to us. Above all, the checkout process has to be smooth, easy and just work for the user. At any stage if the user is not satisfied, the website risks loosing the sale and all the dollars spent in bringing the user to the store, coaxing him to fill his basket go for naught.

With that in mind, our focus has always been to make the checkout process as fluid as possible. The current process, for example, behaves as a [SPA (Single-page web app)](http://en.wikipedia.org/wiki/Single-page_application) and allows the user to seamlessly transition between the three steps and finally onto the payment gateway. However, from a software perspective it is a maintenance nightmare. The code powering the application is 2.5k lines of jQuery with tons of `on`, `bind` and `trigger` strewn in. Clearly, weilding jquery, which is great for DOM manipulation, is an absolute disaster for making a SPA where the UI is closely bound to the data.

<figure>
	<a href="http://singlepageappbook.com"><img src="http://singlepageappbook.com/assets/overview.png"></a>
	<figcaption><a href="http://singlepageappbook.com/" title="Single Page App Book">Structure of modern SPAs. Courtesy - Single Page App Book</a>.</figcaption>
</figure>

So finally when the chance to restructure the checkout process came in we decided to let of the jQuery baggage and rewrite the application in something more suited to our needs. Now the [rewrite vs refactor](http://programmers.stackexchange.com/questions/6268/when-is-a-big-rewrite-the-answer) debate is a long standing one in software engineering which I'm sure most of you are not alien to. Lots of words have been written, battles been fought and blood has been shed on the topic to decide whether the team should throw the technical baggage and begin afresh or should they try harder to carve a diamond out of existing coal.

> They did it by making the single worst strategic mistake that any software company can make: They decided to rewrite the code from scratch. - Joel Spolsky

Joel makes a lot of well reasoned arguments in his [article](http://www.joelonsoftware.com/articles/fog0000000069.html) (which I suggest you should definitely read). In our case, however, our team had solid reasons in favour of a rewrite.

- The existing code was written by a team which was no longer with the project. No one on the existing team had a strong understanding of how the code worked.
- Without any structure, the code was extremely hard to maintain and understand. Having a huge javascript file with more than 1500 lines of code was a complete nightmare.
- There were no tests at all which made refactoring a very hard exercise. Whenever a bug was reported the team used to be scared to break something that was already working.
- It used a technology (jQuery) which was totally not suited to the problem. This meant that adding any new features on the existing application would result in a lot more code which while using a better technology could be accomplished with much lesser.

In my opinion, these are very strong reasons that encourage a rewrite. With that out of the way, the next question on the team's mind was which technology to pick. Javascript MVC frameworks have been cropping by the dozen and we wanted to be sure to pick something that was stable, battle-tested, had a strong community and ready help available. 

Being the only front-end engineer on the team, I had a strong say in choosing the framework to build the application on. Despite having substantial experience working with Backbone.js, given the complexity and needs of the checkout application, I was in favour of going for a framework that had, among other things, first class support for 2 way data binding.

With these features in mind, it was not hard to make a choice and settle on [Angularjs](https://angularjs.org/). With features like dependancy injection, 2 way data binding and awesome support for unit and end-to-end testing, Angular seemed like a great choice.

In the next set of posts, I will talk more about what challenges I faced while building the new checkout application. I'm certainly hoping that I will have fun with Angular and learn something along the way!

*Disclaimer: Views and opinions presented in this article are purely mine and do not represent those of my employer*
