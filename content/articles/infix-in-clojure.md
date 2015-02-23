+++
date = "2015-01-19T14:41:27+03:00"
title = "Parsing Infix in Clojure"
tags = ["clojure"]
description = "Of loops and recurs"
+++

I've been spending a good amount of time lately working on [4clojure](https://www.4clojure.com) in my free time. For those who don't know, 4clojure is archive of problems for practicing Clojure. It accepts solutions in Clojure, runs the test cases and gives you feedback right in the browser.

Today I'll share my experience on solving an interesting problem and seeing how we can use Clojure's vast repertoire of functions in the standard library to make the code elegant and idiomatic. I'll start with how I solved the problem and then contrast it with how knowing the standard library (& being clever) helps.

An excerpt of the [problem](https://www.4clojure.com/problem/135) is stated below - 

> Your friend Joe is always whining about Lisps using the prefix notation for math. Show him how you could easily write a function that does math using the infix notation. Assume a simple calculator that does not do precedence and instead just calculates left to right.

Quite simply, you need to write a calculator which takes an infix expression in a language that evaluates only prefix or polish notation by default.

Here are a few test cases for the same - 

{{< highlight clojure >}}
(= 42 (__ 38 + 48 - 2 / 2))
(= 72 (__ 20 / 2 + 2 + 4 + 8 - 6 - 10 * 9))
{{< /highlight >}}

### Loop/Recur

Let's start with a naive solution. We'll use what I like to call the Swiss Army knife of flow control in Clojure - `loop` and `recur`.

{{< highlight clojure >}}
(defn infix [& exprs]
  (loop [[x & xs] exprs 
         acc 0 
         oper +]
     (cond 
        (nil? x) acc
        (number? x) (recur xs (oper acc x) nil)
        :else (recur xs acc x))))
  
; testing the function        
(infix 38 + 48 - 2 / 2)
;=> 42
{{< /highlight >}}

The solution is quite self-explanatory. We start with defining our [variadic function](http://en.wikipedia.org/wiki/Variadic_function) using `&`. Next, we provide a set of bindings to `loop` to begin the recursion. We use the `[x & xs]` syntax to bind the first and the rest of the expression list. Lastly, we set up conditions using `cond`. When we encounter a number, we `recur`se by updating the binding for `acc`. The `else` clause indicates the case where we get a operator wherein we simply update the `oper` binding.

### Apply

Another interesting way to do it is by noticing that an infix expression is actually made up of sub-expressions, which could be converted to prefix and evaluated one by one. For example
`32 + 42 - 4` is `((32 + 42) - 4)`. Our strategy here can be to pick first 3 tokens, evaluate them and recursively evaluate the rest of the expression. The code for that is below - 

{{< highlight clojure >}}
(defn infix 
  ([x op y] (op x y))
  ([x op y & xs]
    (apply infix (cons (infix x op y) xs))))
{{< /highlight >}}

Here we define two sets of expressions that will be returned by the function depending on whether it is passed 3 or more arguments. The case when we have more than 3, we simply extract first three, recursively call the function with those three and build a list out of the result. The clever trick here is `apply` which is required to make `infix` work on a list. To demonstrate, `(apply (infix '(34 + 53))` is same as `(infix 34 + 53)`.

### Partition
This is a really neat way of solving the problem. To lead you to the insight, lets look at infix expressions from another perspective - `38 (+ 48) (- 2) (/ 2)`. If you set aside the first element, you can see that each sub-expression is one third of a prefix expression. So somehow if we can get the `38` to evaluate with `(+ 48)` and use that result to carry out this operation recursively, we are done! 

To split into groups of two, we can use [partition](https://clojuredocs.org/clojure.core/partition). 

{{< highlight clojure >}}
(partition 2 (rest '(38 + 48 - 2 / 2)))
; => ((+ 48) (- 2) (/ 2))
{{< /highlight >}}

Ok, now lets use the immensely powerful reduce to evaluate the list. But what about the `first` element? Remember, `reduce` also takes an accumulator as the starting point for reduction so that's where we can accommodate the first elem. With that, we have our function.

{{< highlight clojure >}}
(defn infix [x & expr] 
  (reduce (fn [acc [oper y]] (oper acc y))
           x (partition 2 expr)))
{{< /highlight >}}

### Conclusion

I hope this demonstrates the power of functions available in `clojure.core`. Using them you can build elegant and idiomatic solutions to most of your problems. Having a good handle on the standard library would mean that you would rarely have to resort to primitives such as `loop` and `recur`. Till next time!
