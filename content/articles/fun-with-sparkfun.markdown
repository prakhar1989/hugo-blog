---
title: Fun with SparkFun
date: 2014-07-14T12:34:58+03:00
tags: [side-projects nodejs]
---

This is about a quick hack that I did. Couple of days back, I came across a cool project called [SparkFun](https://data.sparkfun.com/) on [HN](https://news.ycombinator.com/item?id=8015354) which is free online service to push your data. It allows you to create streams and then push data via a simple HTTP call. The primary motivation behind the service is to enable devices connected via Internet of Things to push data online easily.

I had been crawling a few websites to need of latest remittance rates to my home country (the rates offered for remittance differ quite substantially from the current spot rates). Its a [casperjs](http://casperjs.org/) script that crawls the page and sends me an email. Clearly, email was getting hard to analyse trends and see history - but I was quite lazy to work on setting up persistence for this quick hack. When I saw Sparkfun I instantly knew how I could achieve logging. 

In case you're wondering on the architecture, here's a [comment](https://news.ycombinator.com/item?id=8016011) by one of the founders - 

_By default it writes metadata about the stream (title, description, etc) using a file based db called nedb, and it appends the actual logged data to CSV files that are split into 500k chunks. When the user requests their logged data, all of the files are stitched back together, converted into the requested format (JSON, CSV, etc), and streamed to the user’s web client.
For the production server, we are currently using MongoDb for metadata storage and the same CSV module for logged data storage._

Here's the [stream](https://data.sparkfun.com/streams/0llnrLvRyOFYXyv3yDD6) that you can check for remittance rates. This is updated every 4 hours (as the bank itself updates the rates 5-6 times a day).  And below is the code that makes it possible - 

```
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
```

_Special thanks to [Dushyant](http://dushyantrao.github.io/) for introducing me to CasperJs_
