---
layout: post
title: Fun with SparkFun
description: Logging remittance rates with Sparkfun and Casperjs
category: articles
tags: [crawl]
---

This is about a quick hack that I did. Couple of days, I came across a cool service called [SparkFun](https://data.sparkfun.com/) which is place to push your data. It allows you create streams and then push data via a simple HTTP call. The primary motivation behind the service is to enable devices connected via Internet of Things to push data online easily.

I had been crawling a few websites to need of latest remittance rates to my home country (the rates offered for remittance differ quite substantially from the current spot rates). Its a [casperjs](http://casperjs.org/) script that crawls the page and sends me an email. Clearly, email was getting hard to get data on trends and see history. But when I saw Sparkfun I instantly knew how I can push data with a single http call. Here's the [stream](https://data.sparkfun.com/streams/0llnrLvRyOFYXyv3yDD6) that you can check for remittance rates. This is updated every 4 hours (as the bank itself updates the rates 5-6 times a day).

And below is the code that makes it possible - 

{% highlight javascript %}
var casper = require('casper').create();
 
var home_url = "https://applications2.almullagroup.com/onlineremit/faces/infrastructure/EXLogin.jspx";
var sparkfun_url = "https://data.sparkfun.com/input/XCVB?private_key=ABCD&INR="
 
casper.start(home_url);

casper.waitForSelector("form#form1");
 
casper.then(function() {
	this.fill('form[name="form1"]',{ 'showrate' : '2'});
	this.click('input[type=submit]')
});
 
casper.then(function(){
	var rate = this.getHTML('tr:nth-child(4) td:nth-child(4) span');
	this.echo("AMX REMIT RATE - Rs." +  rate); // later sent as an email as well
	this.open(sparkfun_url + rate);
});
 
casper.run();
{% endhighlight %}

_Special thanks to [Dushyant](http://dushyantrao.github.io/) for introducing me to CasperJs_
