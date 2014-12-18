---
title: Flask on Nginx and Gunicorn
date: 2014-03-07T12:34:58+03:00
tags: [nginx, flask, python, deployment]
---

Even after deploying a number of [Flask](http://flask.pocoo.org/) apps I always find myself googling up blog posts on how to get the trio of nginx, gunicorn and supervisor working together. Below is simple, straight, no-nonsense guide on how to deploy a flask app on a Linux server using Nginx, Gunicorn and Supervisor.

A disclaimer: this guide will not tell you what these technologies are. Specifically, I will not talk about why you should use `nginx` + `gunicorn` instead of `apache` + `mod_wsgi`. There is plenty of good documentation online which already does that. This is my preferred setup for deploying flask applications and it is extremely simple to get started.

### Setup
First off setup a virtualenv. I'm a big fan of virtualenv as it helps you keep your global system environment clean.
```
$ cd flask_app
$ virtualenv flask_env
$ source flask_env/bin/activate
(flask_env)$ pip install flask && pip install gunicorn
```

### Gunicorn
With that done, lets create a `bash` file called `gunicorn_start`. The contents of this file are below. What this basically does is sets up the virtualenv and starts the gunicorn server on `http://127.0.0.1:8000`. Do remember to customize the variables below as per your setup.

```
#!/bin/bash

NAME="my cool flask app"
FLASKDIR=/Code/flask_app
VENVDIR=/Code/flask_app/flask_env
SOCKFILE=/Code/flask_app/sock
USER=captain
GROUP=captain
NUM_WORKERS=3

echo "Starting $NAME"

# activate the virtualenv
cd $VENVDIR
source bin/activate

export PYTHONPATH=$FLASKDIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your unicorn
exec gunicorn main:app -b 127.0.0.1:8000 \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --log-level=debug \
  --bind=unix:$SOCKFILE
```

To make sure everything is running, attempt a `sudo ./gunicorn_start` command[^1]. If gunicorn starts up perfectly and doesn't cough any errors you are good to go.

### Nginx

Now that `gunicorn` is setup properly we can now move our focus to Nginx. The configuration is quite simple to get it started. The couple of lines below simply tell Nginx to act as a reverse proxy. 

**Contents of flaskconfig**[^2]
```
server {
    location / {
        proxy_pass http://127.0.0.1:8000;
    }
}
```

To run this configuration you need to save this in `/etc/nginx/sites-available`. Assuming your file is `flaskconfig`, you need to create a symbolic link in the `sites-enabled` directory.

```
$ cd /etc/nginx
$ ln -s /etc/nginx/sites-available/flaskconfig /etc/nginx/sites-enabled/flaskconfig
```

To test everything is working fine, restart nginx - hopefully the server should restart without any server errors[^3]. Now `cd` into the project directory and start the `gunicorn_start` command. Now head over to the domain name and you should see your application running.

### Supervisor

Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. In simple words, rather than manually starting and stopping `gunicorn` you can use supervisor to create a daemon that is easy to manage. Create a new configuration file in `/etc/supervisor/conf.d`. To manage supervisor you can use the familiar `sudo service supervisor restart` command.

```
[program:flask_app]
command = /Code/flask_app/gunicorn_start
user = root
stdout_logfile = /Code/flask_app/logs/gunicorn_supervisor.log
redirect_stderr = true
```

### Fabric

Fabric is a really cool python library that can be used for application deployment and systems administration. Using nothing but `python` you can create deployment / automation scripts. You can have a look at a `fabfile` I created for deploying a django application.

```
from fabric.api import *
from contextlib import contextmanager as _contextmanager

env.user = "captain"
env.activate = "source /Code/flask_app/flask_env/bin/activate"
env.directory = "/Code/flask_app/"
env.hosts = ["33.33.33.33"]

def prepare_deploy():
    local("echo ------------------------")
    local("echo DEPLOYING APP TO PRODUCTION")
    local("git add . && git commit")
    local("git push -u origin master")
    local("echo APP PUSHED TO PRODUCTION")
    local("echo ------------------------")

def commit(msg):
    local("git add . && git commit -am %s" % msg)

def deploy():
    prepare_deploy()
    with cd(env.directory):
        run("git pull")
    restart_service()

def restart_service():
    run("sudo supervisorctl restart flask_app")
```

Hopefully, this post has been helpful in giving you a good idea of how you can deploy flask apps on Nginx & Gunicorn. If you have any queries feel free to contact me.

[^1]: Do remember to give the `gunicorn_start` script the executable status with the `chmod +x gunicorn_start` command.
[^2]: For a more elaborate configuration for a production server, refer to the [gunicorn documentation](http://gunicorn-docs.readthedocs.org/en/latest/deploy.html)
[^3]: You can use `sudo nginx -t` to identify any configuration related errors.
