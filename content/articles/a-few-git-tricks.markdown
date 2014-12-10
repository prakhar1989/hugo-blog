---
date: 2014-02-27T12:34:58+03:00
title: A Few Git Tricks
tags: [git]
---

I just finished reading the [Think Like (a) Git](http://think-like-a-git.net/) book which is a *advanced beginners* introduction to Git. Below is a quick rundown of a few cool git commands I learned about. Read on below to level up your Git skillz!

### git add file --patch

Touted as the [most powerful feature that you will ever use](https://news.ycombinator.com/item?id=4744405) the patch mode allows you to selectively move changes from your working copy into the staging area. What does this mean? What this means is that instead of moving the entire set of changes on working copy into the staging area (for commit and push) it allows you to select what git calls `hunks` and commit them. This lets you keep changes that you are unsure about locally instead of keeping them stashed somewhere and keeps your commits clean and focused to one specific functionality.

Only recently I learned ([thanks to Ryan Tomayko](http://tomayko.com/writings/the-thing-about-git)) that this is one of those features that makes git super powerful as a VCS when compared to other VCS's. How do you use this awesome feature you ask? Here's how [^1] -

I have a file `new.txt` that has few parts that are intended to be committed for this release and other parts that can wait for later. You get a call from your colleague and you are told the first fix is required immediately so you are required to stop all your work and commit **ASAP**

```
$ git status
# On branch master
# Changes not staged for commit:
#	modified:   new.txt
```

To selectively commit the urgent changes, I use the `git add new.txt --patch` command at which stage git prompts me with the first hunk that it has identified with a set of options regarding what I can do with it. To cycle to the next hunk you need to tell git what to do with the current one. If the single-letter commands feel confusing you can try the `?` command that will show you a helpful list of what all actions you can carry out on this (and other) hunks.

```
$ git add -p new.txt
diff --git a/new.txt b/new.txt
index e69de29..274a6fb 100644
--- a/new.txt
+++ b/new.txt
@@ -0,0 +1,6 @@
+# this is for the first release
+puts "hello world"
+
+
+# this is for the second release
+puts "bye world"
Stage this hunk [y,n,q,a,d,/,e,?]?
```

Git decides on hunks based on white-space and since nothing was added in the file before, it considers all of the code as just one hunk. Ideally, you would have already committed code separating spaced edits in which case you can easily just use `s` to tell git to split the hunk for you. I, however, will you use the `e` command to edit the hunk git has identified.

To edit a hunk (git gives you a friendly message here as well about how to edit) you can use # to remove a line from a hunk and add a + to add line to the hunk. In my case, I simply prefix the second release code with a # and mark it out of the hunk. Now I can easily do a `git commit -m "first release ready"` and push my changes to the remote branch.

Lastly, if you like this then you can surely try out `git add --interactive` which gives you a whole lot of other options and allows you to have more fine grained control on how you want your staging area to change. You can read [this](http://git-scm.com/book/en/Git-Tools-Interactive-Staging) page for a nice intro.

### git commit --amend

Was there a time when you hurriedly typed `git commit -m "bug 1337 - pwned"` but only as you run your test-suite you realize that the bug still remains (or worse - you have broken something else in the process). You slap your head disappointed with the premature commit, roll up your sleeves and fix the bug. This time; for good. In this case, your next commit probably looks like `git commit -m "bug 1337 - pwned for good"`

If you're like me you probably do this 10 times (yes, I love `git commit` THAT much), this command will really help you clean up your over-excited commits. This is how it works

```bash
$ git commit -am "bug pwned"
$ # write some kick-ass code to fix the bug (really)
$ git commit -am "bug pwned" --amend

$ git log
commit c841103a1babe33b76add3034ba4921221becce1
Author: Prakhar Srivastav <prakhar1989@gmail.com>
Date:   Wed Feb 19 21:04:45 2014 +0300

    bug pwned
```

The last command will overwrite your old commit message and help you keep a straight face in front of your boss when he checks those commits.

### git cherry-pick

Last week I working was on a [project](https://github.com/a85/PostmanInterceptor) where our work spanned across multiple git branches. At one time, I simply needed to replay the work (one specific commit) I had done in one branch onto another. It was not the right time for a merge hence the only option was to manually make those changes. That's when a friend introduced me to `git cherry-pick`. As evident, this command allows you to selectively pick commits and replay the changes. If you have small code patches to be moved across branches, `cherry-pick` is your friend. To use cherry pick, simply refer the commit SHA hash and you're done.

```bash
$ git cherry-pick 5d3e1b6
Finished one cherry-pick.
[master e458a9b] Bug fixes for :contains() another-class.
3 files changed, 36 insertions(+), 3 deletions(-)
```

### git extras

[Git Extras](https://github.com/visionmedia/git-extras) is a set of very useful git utilities that was developed by the extremely prolific node hacker - TJ Holowaychuk. My personal favorite includes `git summary` which gives a great summary of how long the project has been active along with author contributions and `git effort` which gives a very cool heat-map around what files have been worked on the most. Be sure to checkout the project, it'll surely make your git journey even more fun!

```shell
$ git summary

 project  : httpbin
 repo age : 2 years, 9 months
 active   : 103 days
 commits  : 359
 files    : 21
 authors  :
   298	Kenneth Reitz           83.0%
     7	Rodrigo Chacon          1.9%
     7	Kyle Conroy             1.9%
     5	Zbigniew Siciarz        1.4%
     4	Chris Dary              1.1%
     3	Steven Honson           0.8%
     .  ......                  ...
```

[^1]: If you're the GUI kind of guy, you can simply use a [good](http://www.sourcetreeapp.com/) [enough](http://gitx.frim.nl/) git UI to do all this for you.  
