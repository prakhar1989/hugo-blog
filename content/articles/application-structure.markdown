---
title: Application Structure
tags: [python, flask]
date: 2013-05-07T12:34:58+03:00
---

In this post, we're going to talk about a seemingly easy but an important topic - organizing and structuring your flask applications. 

As mentioned earlier, getting started with flask is super easy. Unlike django, flask doesn't follow a directory structure when you start a new app. Flask will not complain even if all of your code resides in a single `main.py` file. But we all know that that is not the way to go. Having all your code in one file makes it messy and unmaintainable.

Lets assume that you've gone through the throughly explained [flaskr tutorial](http://flask.pocoo.org/docs/tutorial/) (which you definitely should in case you haven't) and unable to contain the excitement you start a new flask app. As you keep writing more code and see it working you start getting that nice feeling about the awesomeness of flask. However, as your code keeps growing and since its all in a single file you start getting frustrated. Configurations, models, views etc. should definitely go in separate files, you think, so that your application is kept modular. But where do you start? 

This post will provide you an answer and show you a good way of structuring your apps. For starters, the flask [patterns site](http://flask.pocoo.org/docs/patterns/packages/) provides an easy-to-follow tutorial for structuring an app. This post will cover that and will go beyond by covering configuration module and an extension called [flask-script](http://flask-script.readthedocs.org/en/latest/). Lets get started!


### Packages
For larger applications going the packages way is generally a good idea.  A small app might look like this - 

```
- myapp
  |- static
  |- templates
  |- main.py
```

To change this into a python module all you need to do is move the files in a separate folder and create a new file ( or rename the existing `main.py` ) `__init__.py` so that python can interpret the folder as a module. After re-structuring your app will look like this -

```
- myapp
  |- hello
    |-- __init__.py
    |-- static
    |-- templates
    |-- main.py
```

The next step is to separate app initialization, models and views declaration from your `__init__.py`. To do that write the following code in your `__init__.py`. Note: I'm assuming that you're assuming sqlalchemy as your ORM. Additionally, I've used hello as the name of the app folder.

```
# flask imports go here
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import os

# declaring the app
app = Flask(__name__)

# get the base dir
base_dir = os.path.dirname(os.path.abspath(__file__))
app.config.from_pyfile(os.path.join(base_dir, '../app.cfg'))

# create db
db = SQLAlchemy(app)

# importing views
import hello.views

# import models
from hello.models.person import Person
```

In this code, you'll notice that `hello.views`, `hello.models.person` and `app.cfg` are missing files. Don't worry, we'll create them soon. The rest of the code is self-explainatory. We get the base directory so that we can easily reference the config file to instantiate our app.

### Application Configuration

The next step is to create the missing files. In your app (in my case -
hello) folder, create a new folder called `models` and add your models
(either separately or all in single file).  Dont forget to create a
blank `__init__.py` file in this folder as well. Next, create a file
called `app.cfg` to store your configuration. This file should reside
alongside your app (or hello) folder. Finally, inside your app (or
hello) folder add all your views in a file `views.py`. Below is a sample
excerpt of how your files should look like.

```
# sample app.cfg
DEBUG = True
SECRET= "mysupersecretkey"

# dummy model inside models folder
# filename hello/models/dummy.py
from hello import db
class Dummy(db.Model):
  pass

# views inside hello/views.py
from hello import app
from hello.models.dummy import Dummy
from flask import render_template
@app.route('/')
def hello():
  return render_template('index.html')
```

At this stage this is how your structure looks like -

```
- myapp
  |- app.cfg
  |- hello
    |-- __init__.py
    |-- static/
    |-- templates/
    |-- views.py
    |-- models/
      |--- __init__.py
      |--- dummy.py
```

If you've noticed we still haven't told our app to run. To do that, create
a new file called `manage.py` alongside `app.cfg` and enter the
following code - 

```
from hello import app
from hello import db

if __name__ == "__main__":
  app.run()
```

Now that you have everything setup, your app should work. Give it a go by running `python manage.py`
and make sure there aren't any import errors.
### Flask Script

One last thing I need to introduce before we wrap up is a flask extension called
[flask-script](http://flask-script.readthedocs.org/en/latest/). The
flask-script extensions provides support for writing scripts and makes
it super easy to add commands that can runserver, open shell, manage
cronjobs and other things right from the terminal. The documentation for
the extension is very easy to follow and I encourage you to give it a
read. I've edited the `manage.py` file and added support for
flask-script.

```
from flask.ext.script import Manager, Server, Shell
from hello import app
from hello import db

# (optional) - include models if you want to!
import hello.models as models

def _make_context():
  """ context for passing into to the shell command """
  return dict(app=app, db=db, models=models)

# set manager
manager = Manager(app)

# add commands
manager.add_command("runserver", Server())
manager.add_command("shell", Shell(make_context = _make_context))

if __name__ == "__main__":
  manager.run()
```

After making these changes, simply run `python manage.py runserver` to
run the app and `python manage.py shell` to jump into a python shell
with your application context, db and models loaded!

I hope this has been a fun tutorial for you to follow. If there are any
issues feel free to email me.

The code for this lesson is available on my [github](https://github.com/prakhar1989/flask-tuts/tree/master/lesson-1/hello).

In the next post we're going to delve further into the topic of project structure by taking a look at **blueprints in Flask**.

See you next time!
