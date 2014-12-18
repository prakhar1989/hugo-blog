---
title: Deal With It
tags: [vim]
date: 2014-02-22T12:34:58+03:00
---

Hilarious fable on HN featuring the superhero Unix and its trusted sidekick - Vim!

**ring ring ring**

*yeah, what's up?*

*<ins>[Nagios](http://www.nagios.org/)</ins> is paging, something with that code you pushed live a couple hours ago is throwing a fit... looks like half the web cluster is on the verge of <ins>[going to swap](https://help.ubuntu.com/community/SwapFaq/#What_is_swappiness_and_how_do_I_change_it.3F)</ins>, can you look into it? asap!*

*Well, I'm on at the bus stop and won't be near a computer for at least an hour...yeah, I'll sort it out, will text you when we can push fix live.*

- pulls out [Note 3](http://www.samsung.com/global/microsite/galaxynote3-gear/), shitty 3G coverage
- connects to VPN
- ssh into dev env with [connectbot](https://play.google.com/store/apps/details?id=org.connectbot&hl=en)
- switches to [hackerkeyboard](https://play.google.com/store/apps/details?id=org.pocketworkstation.pckeyboard) for input mode
- [screen -dr dev](https://kb.iu.edu/data/acuy.html) 
- *Ctrl+c* `tail join IRC channel that dumps syslogs from production cluster`[^1]
- *sees error*
- *Ctrl+c* `vim the/file/causing/the/unexpected/problem` 

**fix the problem**
`:wq`[^2]

```
git stash
git pull 
git stash apply
git commit
git push
```

*Ctrl+d*, exit

> sends text message "good to go!"

deal with it.

[Source](https://news.ycombinator.com/item?id=7280853)

[^1]: the `tail` command is used to print the last lines of a text file. `tail -f server_log` is a knee-jerk reaction to any server issue.
[^2]: `wq` saves a files in vim and closes the text editor
