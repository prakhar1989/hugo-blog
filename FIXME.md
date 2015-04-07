Steps to fix fuckups with submodules

```shell
$ rm .gitmodules
$ rm .git/modules
$ vim .git/config #Edit `.git/config` and remove entry for submodul
$ rm -rf public
$ git add . && git commit -m "cleaning index"
$ git submodule add git@github.com:prakhar1989/prakhar1989.github.com.git public
$ ./release.sh
```
