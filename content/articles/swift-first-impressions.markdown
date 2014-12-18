---
title: Swift - First Impressions
tags: [swift, programming languages]
date: 2014-06-09T12:34:58+03:00
---

Last week at WWDC Apple made the most exciting announcement (for developers at least) of launching a new programming language - Swift. Although I have never written a single line of code for iOS (in Objective C) I got so excited that within no time I was installing Xcode 6 to give playground & Swift a shot. 

After spending a week with Swift I've come to the conclusion that it is a very well designed programming language. For a Python/JS developer like me I was able to get productive very easily. It has strong remanents of Scala which is something I definitely I can't dig enough. 

Below is a small list of features that I love the most about Swift. Consider this is an initial evaluation only, as I gain more experience I will blog about using Protocols, Enumerations and Generics with more practical examples.

### Type Inference
One of the biggest inhibitions that developers with experience in dynamic languages like Python / Ruby have towards static compiled languages is the verbosity in the syntax. Repeatedly declaring `String name = "abc"` and `int age = 23` gets frustrating and it might make you think - why isn't my computer smart enough to figure out that `23` is indeed an integer. In Swift, this is as simple as

```
let age = 23      // int
let name = "nasd" // string
let money = 23.3  // double
```

Modern languages like Go embrace type inference and in my opinion it is one of reasons why Go saw an upsurge of adoption within the Python / Ruby community. 

### Optionals
An optional value either contains a value or a `nil` to indicate that a value is missing. I first learnt about the `Option` type in Scala and the benefits of using a dedicated type for this became evident early on. Being a strongly typed language, Swift encourages using optionals to ensure safety.

```
# in the python world one would 
# do the following
msg = raw_prompt()
if msg {
  // raises a compile error
  print(msg + ", world")
}
```

While this is an accepted practice in lots of languages, the right way in Swift to do this is like this 

```
let msg: String? = "hello"
```

This tells the compiler that the variable `msg` can have a value or be a `nil`. Why is this awesome? I think this is definitely better than remembering the arcane rules other programming languages have. For example, in some cases a blank String is `truthy` while in others it is `falsy` e.g. Javascript. In PHP as an empty string is `falsy` one would expect the string `"0"` to be `truthy` but its not _[this is because the `"0"` is typecasted into a int]_.

How do you use it? Let us assume you have a `User` object that stores information about a user and you define a collection that stores a collection of the `User` object. You need to define a `findById` function that returns the User object associated with that `id`. Here's how you can do it 

```
func findById(id: Int, users: User[]) -> User? {
  for u in Users {
    if u.id == id {
      return u
    }	
  }
  return nil
}

// user is bound to value in case nil is not returned
if let user = findById(1, users) {
  println("user found: \(user.name)")
} else {
  println("user not found")
}
```

One last thing that might trip up beginners is the user `!` to force unwrapping of the optional. Using a `!` simply means that you're sure the optional contains a value and you want to access it.

```
if findById(1, users) {
  println("user found: \(findById(1, users)!.name)")
} else {
  println("user not found")
}
```


Having optionals helps you keep your mind free from all these rules and helps eliminate potential bugs.

### Ranges
Very simple and straightforward - ranges are my most preferred way of iterating through a collection of integers. Ranges are present in both Python and Ruby, and I'd be lying if I say that I don't miss them in Javascript.

```
// Swift
for i in 0..10 {
  println(i)
}

// Python
for i in range(0, 10) {
  print(i)
}

// Ruby
for i in 0..10 {
  print i
}
```

Unfortunately usage of ranges in Go are different from the example above. Since there's no way to create an array (or a slice) by just specifying the start and end of the collection, `Range(1,20)` doesn't work. From the [documentation](http://golang.org/ref/spec#RangeClause)

> The expression on the right in the "range" clause is called the range expression, which may be an array, pointer to an array, slice, string, map, or channel permitting receive operations.

One thing that both Go and Swift share (w.r.t. ranges) is ignoring values using the `_`

```
var (n, answer, base) = (4, 10, 2)
for _ in 0..n {
  answer += base
}
```

This is a nice-to-have feature if you don't want to populate the local namespace.

### Closures
If you have any Javascript experience under your belt, chances are you have used closures. Closures are common in languages in which functions are treated as first-class citizens. I'll not go into details of explaining what closures are but to put it in one line - they are self-contained blocks of code that can be passed around your code. Closures basically capture or *close* the values of the data from the context in which they were defined.

Swift allows a lot of syntactic sugar when it comes to closures, making them a joy to use. The 4 primary features are 

- Inferring parameter and return value types from context. 
- Implicit returns from single-expression closures 
- Shorthand argument names 
- Trailing closure syntax

Let me illustrate the points below with a practical example. We will use the `sort` function which takes a collection and a function (closure) on which the function is sorted.

```
let fruits = ["apples", "oranges", "banana", "pear"]

func longest(s1: String, s2: String) -> Bool {
  return countElements(s1) > countElements(s2)
}

// returns ["oranges", "banana", "apples", "pear"]
sort(fruits, longest)
```

The equivalent closure for to accomplish the above would be - 
```
sort(fruits, { (s1: String, s2: String) -> Bool in
  return countElements(s1) > countElements(s2)
})
```
The code after `in` begins the closure. We will see how the features provided by Swift makes it much much easier to do the same thing.

**Inferring parameter and return value types from context**. 
```
// removing the type information
sort(fruits, { (s1, s2) in 
  return countElements(s1) > countElements(s2)
})
```

**Implicit returns from single-expression closures**
```
// remove the explicit return
sort(fruits, { (s1, s2) in  
  countElements(s1) > countElements(s2)
})
```
**Shorthand argument names**

```
// $0 refers to the first arg, $1 refers to the second
sort(fruits, { countElements($0) > countElements($1) })
```

**Trailing closure syntax**
```
// syntactic sugar to allow passing a closure outside of a function call
sort(fruits) { countElements($0) > countElements($1) }
```

### Map, Filter and Reduce
Directly incorporated from the functional programming world, the functions `map` and `filter` are available on all collections to help you iterate through a collection, perform an operation and return a new collection. The syntax is similar to closure so it is quite intuitive once you get a hang of it.

```
let numbers = [12, 49, 23, 44, 143]

let squares = numbers.map { $0 * $0 } // squares of numbers
// squares [144, 2401, 529, 1936, 20449]

let even = numbers.filter { $0 % 2 == 0}  // filter all even
// even [12, 44]

let sum = numbers.reduce(0, combine: {$0 + $1}) // finding the sum of the elements
// sum 271
```

If you haven't tried Swift yet, I encourage you to give it a shot. Its a fun language and Apple's building a great ecosystem around it. Expect people to share their playground files with cool demos once Xcode 6 becomes stable. I am super excited to see what the future holds!
