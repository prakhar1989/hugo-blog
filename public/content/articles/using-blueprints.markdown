---
title: Using Blueprints
date: 2014-05-08T12:34:58+03:00
tags: [python, flask]
---

In today's short lesson we'll continue where we left off and completely wrap up the topic of code organization by learning about blueprints. [Blueprints](http://flask.pocoo.org/docs/blueprints/) have been a rather recent addition to flask (introduced in version 0.7) and were added to help users structure large applications into reusable components. 

### Blueprints

What exactly are blueprints? Lets see what the official documentation has to say. *Flask uses a concept of blueprints for making application components and supporting common patterns within an application or across applications. Blueprints can greatly simplify how large applications work and provide a central means for Flask extensions to register operations on applications.* 

In other words, blueprints are essential to building a Flask site larger than a few endpoints. Blueprints also allow you to reuse components across multiple apps, or as releasing a set of endpoints as open source libraries that can be easily plugged into other apps. If its still not clear, I'm sure some code will drive the point home.

Lets get started. Lets start with a simple app which looks like this -

```
|-- blogs
|  |-- __init__.py
|  |-- views.py
|  |-- static/
|  |-- templates/
|  |  |-- admin/
|  |  |  |-- index.html
|  |  |-- posts/
|  |  |  |-- index.html
|-- runserver.py
```

I'm using the same structure as we discussed in the previous post, however,
given the scale of the app, I'm not using flask-script and instead have a simple
`runserver.py` file.

Contents of the `views.py` file 

```
from flask import render_template
from blogs import app

# routes for admin section
@app.route('/admin', defaults={'page': 'index'})
@app.route('/admin/<page>')
def admin_show(page):
  return render_template('admin/index.html', page=page)

# routes for the posts section
@app.route('/posts', defaults={'page': 'index'})
@app.route('/posts/<page>')
def posts_show(page):
  return render_template('posts/index.html', page=page)
```

Seeing the code above, I'm sure that the intent is quite clear. What I'm trying
to do is structure the main components in my application, `admin` and `posts` in
this case, in a single file. In the real world, there will be many more such
components which follow a common pattern and in such case having them all in
one place will be a real mess. 

### Restructuring

Lets see how we solve this problem using blueprints. I've created two new
folders - each for admin and posts and initialized with a blank `__init__.py`
file. 

```
|-- blogs
|  |-- __init__.py
|  |-- admin/
|  |  |-- __init__.py
|  |  |-- views.py
|  |-- posts/
|  |  |-- __init__.py
|  |  |-- views.py
|  |-- static/
|  |-- templates/
|  |  |-- admin/
|  |  |  |-- index.html
|  |  |-- posts/
|  |  |  |-- index.html
|-- runserver.py
```

Additionally, I've added two new `views.py` in each of the folders. Here are the
contents of the two files

`admin/views.py`:
```
from flask import Blueprint, render_template
mod = Blueprint('admin', __name__, url_prefix='/admin')

# route handles for /admin and /admin/page
@mod.route('/', defaults={'page': 'index'})
@mod.route('/<page>')
def show(page):
  return render_template('admin/index.html', page=page)
```

`posts/views.py`:
```
from flask import Blueprint, render_template
mod = Blueprint('posts', __name__, url_prefix='/posts')

# route handles for /posts and /posts/page
@mod.route('/', defaults={'page': 'index'})
@mod.route('/<page>')
def show(page):
  return render_template('posts/index.html', page=page)
```

What we're trying to do here is a setup the component as a blueprint. When a new
function is bound using the @mod.route decorator the blueprint will record the
function `show` when it is later registered. Blueprints are considered to be
contained in a folder and the name of this folder is inferred from the second
argument to the `Blueprint` constructor (`__name__` in this case.) The third
argument, `url_prefix` is what mounts the blueprint at a specific location.
Hence, in our admin blueprint will listen to the two endpoints - `/admin/` and
`/admin/<page>`.

Before we use our blueprints we need to register them on our app object. We can
do this in our main `__init__.py` file. These are its new contents - 

```
from flask import Flask
app = Flask(__name__)

# importing as module.. follow this pattern to include more modules
from blogs.admin.views import mod as adminModule
from blogs.posts.views import mod as postsModule

# registering the modules
app.register_blueprint(adminModule)
app.register_blueprint(postsModule)

# referencing the module views using url_for
@app.route('/')
def index():
    return "<a href='%s'>Admin Section</a> | \
            <a href='%s'>Posts Section</a>" % (url_for('admin.show'),
                                               url_for('posts.show'))
```

Now that we've registered our application, test the application and you'll see
how the blueprints have correctly registered our url endpoints.

I hope this tutorial helped you in understanding what blueprints are and what
they can do. If you want to follow along, all the code for this tutorial is
available on my [github](https://github.com/prakhar1989/flask-tuts/tree/master/lesson-2).

In summary, blueprints allow us to modularize our components which can be plugged in our
app. This makes our components easy to re-use and maintain. If you've done
django and you're thinking to yourself that this is how django does `apps` then
you're absolutely correct. The idea in both the cases is similar - to have
resuable and pluggable modular components within your application. To know more
do read the short write up on the [official flask documentation](http://flask.pocoo.org/docs/blueprints/). 

With this we finally wrap up our topic of project structure and organization. If
you're keen to checkout how a large app is done and see the techniques are done
I encourage you to checkout this [tutorial](https://github.com/mitsuhiko/flask/wiki/Large-app-how-to) on flask wiki.

Next time we'll talk about **Class Based Views** in Flask. See you next time!
