---
title: Demystifying Decorators
date: 2014-11-03T12:34:58+03:00
tags: [python, decorators]
draft: true
description: "Not your run-of-the-mill post on decorators"
---

If you've been programming in Python for some time chances are you have come across decorators. Even though you might not know what decorators are and how they work, you've surely used them as most of popular Python libraries use decorators (the familiar `@` syntax) to make beautiful APIs.

[Flask](http://flask.pocoo.org/), for example, exposes decorators for setting routes. [Django](https://www.djangoproject.com/) has a familiar `login_required` decorator that allows the user to force authentication for a view.

```
# Flask Example
@app.route('/') # a decorator
def main():
    return render_template('index.html')
```

```
# Django Example
from django.contrib.auth.decorators import login_required

@login_required # a decorator
def my_view(request):
    ...
```

What are **decorators**? Quite simply, 

> Decorators are [syntatic sugar](http://en.wikipedia.org/wiki/Syntactic_sugar) for executing code before and after the function you decorate

Quite a few articles have been written about decorators for beginner and experienced programmers alike. However, what I've found generally missing is they are littered with fake examples that are hard to relate to. As a result, although you do understand decorators conceptually, its hard to use that knowledge into your next program. 

In this blog post, I intend to demonstrate the usefulness of decorators by 
using a realistic example that I encountered while recently working on a project at my workplace. Hopefully, this will help you understand on how decorators can be used to design more intuitive abstractions in fewer lines of code.

### The Problem
Well lets just say that you are required to make a CRUD app. You are required to just query the database and show the results on a webpage. But this time, you are not allowed to use an ORM as your boss hates everything that has a 3-letter acronym. Your only option now is to write plain-old SQL[^1] to build this app.

If you've been not spoiled by using ORM you'd remember that too query a DB you need to do the following

- Get a connection to the DB
- Request for a reference to a cursor from the DB object
- Execute the SQL on the cursor reference
- For a `READ`- Fetch the results from the cursor
- For a `WRITE`- Commit the transaction

With that in mind, this is how my db functions looked like - 

```
from MySQL.db.cursor import DictCursor

def get_deals(id):
    db = get_db()
    c = db.cursor(DictCursor)
    c.execute("select id, deal, duedate from deals where id = '%s'" % (id, ))
    results = c.fetchall()
    return results

def get_account(account):
    db = get_db()
    c = db.cursor(DictCursor)
    c.execute("select name, account from accounts where id = '%s'" % (a	ccount,))
    result = c.fetchone()
    return result
...
```

As evident from above, I had to write quite a few functions for every query that I wanted to fire on the database. For demonstration, the queries shown above are quite simple, in reality, I had to write a query spanning multiple joins so that there's just one query fired for every page load.

I'm sure the problem is clearly evident. Duplicating code across a number of functions is quite problematic. Right off your head, you are thinking that this can be solved by declaring a simple wrapper function but if you look closely, doing anything fancy with the results or customizing the query will not be flexible.

### Decorators
Lets see how we can use decorators to remove the code duplication while ensuring flexibility.

[^1]: You see what I did there?
