+++
date = "2015-01-23T14:37:44+03:00"
title = "Compile - A Python Builtin"
description = "Peeking at Flask's source code"
tags = ["python", "flask"]
+++

Quick question - You have a `settings.cfg` file (a list of key-value pairs) and you are required to read it in your Python program as a dict? How do you  do it?

I found myself thinking over this question very recently while working with a [Flask](http://flask.pocoo.org) app. My task was simple - query the database, generate a report and email it as an attachment. 

The only catch was the fact that all these configuration parameters i.e. DB connection settings, email addresses etc where already declared in the app's settings file in a format specified by Flask.

{{< highlight bash >}}
DB_HOST = 172.123.125.34
DB_USER = app_user
DB_PASS = lly4paw
{{< /highlight >}}

My initial response to this problem was to using the [ConfigParser](https://docs.python.org/2/library/configparser.html) module to parse the file. Unfortunately I quickly learnt that all **config** files *need* to have a header. My another option was a simple brute-force way of reading in the file line by line and using a regex to build a Python `dict`.

Before settling on the second option, however, I decided, like any self-respecting programmer would, to peek in Flask's source code and see if there are any elegant ways of solving this problem. [Here's](https://github.com/mitsuhiko/flask/blob/master/flask/config.py#L111-L137) the code for the reading in the config from a external file pasted below from the source.

{{< highlight python >}}
def from_pyfile(self, filename, silent=False):
      filename = os.path.join(self.root_path, filename)
      d = imp.new_module('config')
      d.__file__ = filename
      try:
          with open(filename) as config_file:
              exec(compile(config_file.read(), filename, 'exec'), d.__dict__)
      except IOError as e:
          if silent and e.errno in (errno.ENOENT, errno.EISDIR):
              return False
          e.strerror = 'Unable to load configuration file (%s)' % e.strerror
          raise
      self.from_object(d)
      return True
{{< /highlight >}}

Much to my (pleasant) surprise I found that there indeed is a better and simpler way of reading in the file. The line that is responsible for doing this is 

{{< highlight python >}}
exec(compile(config_file.read(), filename, 'exec'), d.__dict__)
{{< /highlight >}}

It uses the `compile` built-in Python function to read in the file and then calls an `exec` on it. Not sure what `compile` does? Here's what the documentation says -

> Compile the source into a code or AST object. Code objects can be executed by an exec statement or evaluated by a call to eval(). source can either be a Unicode string, a Latin-1 encoded string or an AST object. 

Quite simply, the function returns a Python AST (Abstract Syntax Tree) object from a string. This object could then be executed by `exec` or `eval`.

{{< highlight python >}}
>>> codeobj = compile('x = 4\nprint 5 * x', 'fakemodule', 'exec')
>>> exec(codeobj)
20
{{< /highlight >}}

The second argument (`fakemodule`) above is just a recognizable name that you'd want to give to the object. But what if you want to store the output of calling an `exec`? Lets see how we can deal with that - 

{{< highlight python >}}
>>> settings_dict = {}
>>> codeobj = compile(open('settings.cfg').read(), 'settings', 'exec')
>>> exec(codeobj, settings_dict)
>>> settings_dict.keys()
['DB_PASS'
 'DB_HOST',
 'DB_USER',
 'DATABASE']
{{< /highlight >}}

So there you have it. A simple, clean way of using a Python builtin to solve a problem. Lesson learnt - when in doubt do not hesitate to dive in the source code of popular open source projects.

