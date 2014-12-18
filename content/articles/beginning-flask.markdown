---
title: Beginning Flask
date: 2013-05-06T12:34:58+03:00
tags: [python, flask, intros]
---

I've been meaning to start a write a series on [Flask](http://flask.pooco.org) which is a micro-framework for developing web applications in python. In Ruby parlance, flask is to [Sinatra](http://www.sinatrarb.com/) what Django is to Rails.

The nicest thing (and most confusing for beginners) about Flask is that its quite barebones on the onset. A simple `hello world` application in Flask is just about 7 lines as shown below. However, going from hello world to full fledged application is a daunting task in itself for a beginner.

```
from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello():
  return "hello world"
if __name__ == "__main__":
  app.run()
```

Almost all of the material found in this guide will be available from other sources namely flask's excellent documentation and the countless flask projects on Github. However, I'll try my best to write a comprehensive post on each topic for that day the matter for which will be collected through the flask docs, projects on github and the mailing list.

As a disclaimer: I'm new to flask myself and I'm constantly learning. While building a couple of apps in flask I've found myself stumbling on a few aspects like project organization, ORM and deployment very frequently. Having a lot of choices at your disposal might not always be best for productivity. Through this guide, I aim to help you in making the right choices by sharing the best practices involved in building flask apps.

The idea is to write on a topic each day, detailed with code examples
and references for further reading. To get the most out of each post, it
is expected that you'll type out the code for yourself. The best way to
learn is by doing.

I'll start the series with **Project Structure and Organization**. See you next time!
