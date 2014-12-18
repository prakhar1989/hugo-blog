---
title: Class Based Views
tags: [python, flask, django]
date: 2013-05-09T12:34:58+03:00
---

If you've used Django before, one of the things that you surely miss (apart from the django-admin, of course) is class based (or generic) views. Class based views allow you to structure your views and reuse code by harnessing inheritance and mixins. This allows you to create generic views for routine tasks and simply inherit from them for similar views.

In flask 0.7 class based views were introduced which act similar to generic
views in Django. In this tutorial we'll cover how to use class based views to
make extendable views. We'll also see how we can use `MethodView` (a type of
class based view) to create a RESTful API.

Lets get started. I have a basic starter template that looks like this -

```
|-- static/
    |- jquery.js
|-- templates/
    |-- index.html
    |-- about.html
    |-- base.html
    |-- users.html
|-- main.py
|-- user.db
```

Since the app is only for demo purposes, I've added all my models and views in a
single file - `main.py`. I have a single model called `User` and I've used SQLAlchemy as the ORM. The `user.db` file is the SQLITE db that I'm using for this app. To begin with, these are the kinds of views that our app needs to have -

1. There are a few views that simply need to return a template - like index and about.
2. There are a couple of models in our application and we need to have views that display
  the model data as a list by passing that data to a template.
3. Lastly, we need to have consolidated view for making a API instead of flooding
  our view with ifs
  
```
@app.route('/users/')
def users():
  if request.method == "GET":
    pass
  else:
    pass  
```

```
@app.route('/users/<int:post_id>')
def user():
  if request.method == "GET":
    pass
  elif request.method == "PUT":
    pass
  elif request.method == "DELETE":
    pass
```

Lets begin with the first requirement. Instead of just repeating code to
render a template we'll a create class based view akin to a [TemplateView](https://docs.djangoproject.com/en/dev/ref/class-based-views/base/#django.views.generic.base.TemplateView) in
django

```
from flask.views import View

class RenderTemplateView(View):
    def __init__(self, template_name):
        self.template_name = template_name

    def dispatch_request(self):
        return render_template(self.template_name)
```

What we've done here is that we've just subclassed the `flask.views.View` class
and implemented a `dispatch_request` method. All subclasses that inherit from the
`flask.view` class need to override this method to implement the actual view
code.

This allows us to create template views like this -

```
# urls for rendering simple templates
app.add_url_rule('/about', view_func = RenderTemplateView.as_view('about_page', template_name="about.html"))
app.add_url_rule('/', view_func = RenderTemplateView.as_view('index_page', template_name="index.html"))
```

The first argument to the `as_view` function is the URL endpoint and second
being the name of the template that needs to be passed. 

With that out of way, lets jump to the second requirement - building a listview.
Now in my app, I just have one model but in apps where there are lots of models
and you find yourself repeatedly implementing a view that returns a list of the
objects of that model which is then passed to a template, you can implement your
listview class. Lets see how that is done -

```
class ListView(View):
    def get_template_name(self):
        raise NotImplementedError()

    def render_template(self, context):
        # a custom render_template method that passes in the 
        # template name and the modified template context
        return render_template(self.get_template_name(), **context)

    def dispatch_request(self):
        # self.get_context returns a modified context which is
        # then passed to our render_template method
        context = self.get_context()
        return self.render_template(context)

# subclass from the listview class
class UserListView(ListView):
    def get_template_name(self):
        return "users.html"

    def get_context(self):
        context = {'objects': User.query.all(), 'time': datetime.now()}
        return context

# urls for list views
app.add_url_rule('/userlist/', view_func = UserListView.as_view('user_list'))
```

The idea here is similar. We implmenent a custom `render_template` function so
that we can pass in a custom context to the template. This pattern can then be
easily extended for multiple models.

Lastly, lets see how we can use `MethodView` to make a RESTful API. `MethodView`
allows us to manage method-based dispatching like so -

```
from flask.views import MethodView
class UserAPI(MethodView):
    def get(self, user_id):
        if user_id is None:
            users = User.query.all()
            json_results = [{'name': u.name, 'age': u.age} for u in users]
        else:
            user = User.query.get_or_404(user_id)
            json_results = [{'name': user.name, 'age': user.age}]
        return jsonify(item=json_results)

    def post(self):
      pass

    def delete(self, user_id):
      pass

    def put(self, user_id):
      pass
```

As you can see, each HTTP method maps to a function with the same name. This way
you dont have to provide separate `method` attribute as its automagically
deciphered from the title of the method. 

To hook this up to a routing system we just provides multiple routes to the same
view like this - 

```
# urls for User API
user_api_view = UserAPI.as_view('user_api')
app.add_url_rule('/users/', defaults={'user_id': None},
                 view_func = user_api_view, methods=["GET",])
app.add_url_rule('/users/', view_func = user_api_view, methods=["POST",])
app.add_url_rule('/users/<int:user_id>', view_func = user_api_view,
                 methods=["GET", "PUT", "DELETE"])
```

If you've been following along you can check the code on my [github](https://github.com/prakhar1989/flask-tuts/tree/master/lesson-3) which contains a working API and accompanying jquery ajax calls for testing the API for your reference.

I hope this tutorial has helped you in understanding when you use class based
views. Basically, whenever you see yourself repeating view functionality you
know that its time for a class based view. Don't forget to refer to the
[official docs](http://flask.pocoo.org/docs/views/) to get a clearer picture.

See you next time!
