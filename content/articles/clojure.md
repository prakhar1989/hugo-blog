+++
date = "2015-01-01T01:59:12+03:00"
draft = true
title = "A SpellChecker in Clojure"
description = "An Introduction to Clojure"
tags = ["functional programming", "clojure"]
+++


Unless you've been living under a rock, you have heard about Clojure - the programming language that's been used by companies such as SoundCloud etc to build massively scalable web services. Clojure is a Lisp and to most of you, it will seem very different (or rather weird) from what you've already programmed in. Fear not my friend, for in today's article we're going to cover the basics of Clojure and understand what sets it different from other languages out there. Instead of going the usual (boring) route of introducing variables, functions and control-flow statements, we'll directly jump into a cool project and build a spellchecker - all in Clojure!

For this article, I assume no prior experience in functional programming or Lisp. I'll introduce concepts as they come and hopefully that should serve the purpose. What I do expect for you is to follow along and **type** code with me. It might seem a bit frustrating, but I've found it to be an valuable exercise in grasping a new programming language.

### Clojure

Before we dive in, let me quickly give a brief intro about Clojure. If one could describe Clojure in 4 lines it would be - 

1. Clojure is a Lisp.
2. Clojure is a functional programming language.
3. Clojure runs on the JVM (and other runtimes as well)
4. Lastly, Clojure has first-class support for concurrent programming.

Unlike C/C++/Python or Ruby Clojure does not belong to the [Algol](http://c2.com/cgi/wiki?AlgolFamily) family of languages and instead belongs to the Lisp family. Like all Lisps code is treated as data which allows you to extend the features of the languages with macros. And yes, like other Lisps, there are lot of parens (technically, Clojure goes to great lengths to actually keep the number of parens low compared to other Lisps).

Clojure is a functional language where functions are first-class objects and pure i.e - they have no side effects. 

What makes Clojure modern and practical is its capability to run on modern runtimes of today - the JVM, CLR and the web browser / node (via ClojureScript). This allows your Clojure programs to have seamless java interop and stand on the shoulders of vast number of java libraries.

Clojure’s support for functional programming makes it easy to write thread-safe code. Since immutable data structures cannot ever change, there is no danger of data corruption based on another thread’s activity. To deal with mutable data, Clojure provides [STM (Software Transactional Memory)](http://en.wikipedia.org/wiki/Software_transactional_memory) which protects shared data via transactions. 

### Getting Started

With that intro out of the way lets get started with the project. What we're going to be building today is a Spellchecker.

