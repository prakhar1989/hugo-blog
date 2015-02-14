+++
date = "2015-02-08T17:37:53+03:00"
title = "Being Lazy in Clojure"
description = "Unravelling the lazy in lazy-seq"
tags = ["clojure", "functional programming"]
draft = true
+++

If you're new to functional programming, then apart from (seemingly) alien concepts such as immutability, higher-order functions etc. lazy sequences must have taken some time to wrap your head around. The thing about lazy sequences is that they are intuitive to understand and use, however, once you want your functions to return lazy sequences you get stuck.

In this short article, we'll build up some intuition behind lazy sequences and see how to build them in Clojure. But before we get into that, let us see what the fuss is all about.

### Introduction

```clj
;; using iterate
(defn get-multiples [n x]
  (take n (iterate #(+ % x) x)))

(get-multiples 5 7)
;=> (7 14 21 28 35)
```
