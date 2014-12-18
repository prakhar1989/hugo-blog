---
title: GOOOAL
date: 2014-07-30T12:34:58+03:00
tags: [functional programming]
---

Today morning while browsing [The Changelog](http://thechangelog.com/can-your-favorite-programming-language-score-a-goal/), I came across this interesting project called - [Goal](https://github.com/eatnumber1/goal).

> g()('al') is a challenge whereby you need to write in as many languages as possible code which enables the code g()('al') to return the string "goal", the code g()()('al') to return the string "gooal", the code g()()()('al') return the string "goooal", etc.

This sounded a good way to kill a couple of hours on a lazy holiday so I decided to give this a shot in a couple of programming languages I know.

### Higher Order Functions 
The project is interesting because it is a fun way to demonstrate support for higher order functions in your favorite language. Getting to see how this is accomplished in all kinds of languages (and languages where it's not possible) is quite useful. The key idea to solve this problem is indeed simple -

1. Create a function `g` that takes two arguments. One to check for the suffix and other to count the number of 'o's to insert
2. If the function `g` is called without a suffix e.g. `g()` return a function that returns the function `g` with the count incremented
3. If the function `g` is called with a suffix e.g. `g()('al')` return the final string by concatenating 'g', the numbers of 'o's and the suffix.

Programming languages where functions can be returned make this problem very easy to solve. Languages where this is not possible, there are techniques like [regex matching](https://github.com/eatnumber1/goal/blob/dff31f6544c619d897477dc4b1d23c707cadbc0c/solutions/complete/zsh/o11c/goal.zsh#L10-L11), [metaprogramming](https://github.com/eatnumber1/goal/blob/dff31f6544c619d897477dc4b1d23c707cadbc0c/solutions/complete/ruby/mastfish/goal.rb#L2-L5), or [preprocessing](https://github.com/eatnumber1/goal/blob/dff31f6544c619d897477dc4b1d23c707cadbc0c/solutions/complete/c/tolmasky/goal.c#L14-L17) to solve the problem.

### Python
The code below in Python is a literal translation of the above pseudo-code and pretty readable.

```
def g(al=None, count=0):
    if al:
        return 'g' + (count * 'o') + al
    else:
        return lambda al=None: g(al, count+1)

print(g('al'))       # gal
print(g()('al'))     # goal
print(g()()('al'))   # gooal
print(g()()()('al')) # goooal
```


Here's the [golfed](https://en.wikipedia.org/wiki/Code_golf) version (in case you're into golfing)
```
def g(al=None,c=0):
    return 'g'+c*'o'+al if al else lambda al=None: g(al, c+1)
```

Must-Read Python submissions 

- [This](https://github.com/eatnumber1/goal/blob/master/solutions/complete/python/panzi/goal.py) one uses partial functions to return a new function using the `functools` module.
- [This](https://github.com/eatnumber1/goal/blob/master/solutions/complete/python/orf/goal.py) one uses the `inspect` module to regex match through the stack trace.


### Javascript
The same thing is implemented below in Javascript but with a slight change. Since, javascript does not provide support for default arguments a neat way is to keep updating the second argument with repeated 'o's.
```
function g(al,o) {
  if (al === undefined) {
    return function(al) {
      return g(al, ((o||'')+'o'))
    }
  } else {
    return 'g' + (o||'') + al
  }
}
console.log(g('al'))       // gal
console.log(g()('al'))     // goal
console.log(g()()('al'))   // gooal
console.log(g()()()('al')) // goooal
```

This can be made much shorter by using coffeescript.
```
g = (al,o) -> return if al then 'g'+(o||'')+al else (al) -> return g(al,((o||'')+'o'))
```

### OCaml
OCaml is a language that I've been [learning lately](https://github.com/prakhar1989/ocaml-experiments). Being functional, this seemed a rather easy task to accomplish. Unfortunately, due to lexical reasons you can't use the `g()()` syntax for function calls (without hacking the parser). However, below is the code that does something similar.
```
let g f = f "g"
let al x = x ^ "al"
let o x f = f (x ^ "o")

let () =
  print_endline (g al);       (* gal *)
  print_endline (g o al);     (* goal *)
  print_endline (g o o o al); (* goooal *)
```

Note: The OCaml solution has been picked up from this [reddit thread](http://www.reddit.com/r/programming/comments/2btrvt/gal/cj8yj2k).

### Other Languages
- Not surprisingly, both Java and PHP do not have a solution (atleast a solution that follows all the [rules](https://github.com/eatnumber1/goal#rules))
- The [nimrod](https://github.com/eatnumber1/goal/blob/master/solutions/complete/nimrod/dom96/goal.nim) submission defines a new operator and comes up with a brilliantly clever solution
- The [scala](https://github.com/eatnumber1/goal/blob/master/solutions/complete/scala/lopopolo/goal.scala) code defines a case class to concisely run the constructor every time `()` is seen.

For more exciting solutions do check out the [github repo](https://github.com/eatnumber1/goal#previous-solutions) and the [pull requests](https://github.com/eatnumber1/goal/pulls).
