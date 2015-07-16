---
date: 2014-10-19T12:34:58+03:00
title: Bloom Filters for Dummies
tags: [algorithms]
description: An Intro to Bloom Filters
---

Bloom Filters is one of those data structures that you don't generally learn about in a typical data structures 101 class, but wish you had learnt once you know about them. Despite reading several articles on bloom filters I was still finding it hard to grasp the concepts until the last week when I decided to sit down and not get up until I get the hang of it. Below is an article where I attempt to explain what I understood in a clear way (hopefully) so that others can learn.

### A Use Case

Before we talk about what a Bloom Filter is and how it actually works let me make an attempt to sell you on why you would need a bloom filter. Let's assume you have an idea to build your own search engine. You are fed up of Google's monopoly and decide to write your own version of a search engine (much like [DuckDuckGo](http://duckduckgo.com)). Now the first step in building a search engine is to build a crawler. How does a crawler work? Quite simply the work of crawler can be reduced down to the following steps (without the implementation details, of course)

1. Start with a URL (webpage) and scrape its content.
2. Extract a list of all URLs on that page.
3. For each URL on that page check if this URL has not been crawled already.
4. Take the new URL that you encounter and go to Step 1.

As you can see, a crawler's work in theory is quite simple - just keep scraping content for any previously unseen URLs (webpages). The step we are going to focus on is step 3 in the above algorithm. If you've taken your data structures class you know that to maintain a list of all URLs to check for membership is a bad idea (`O(n)` lookup time). So what you instead do is a use a set (or a hash-table) in memory that allows you do quick lookups and test for membership of a URL. Now this works fine as long as your hash-table can reside in the memory. Consider the case for Google for example - clearly there is no way a hash table for a billion plus URLs can reside in main memory. You can surely use the disk for storing and querying but since that is significantly slower compared to accessing the main memory we are not going to consider that case for now.

### Bloom Filters

How do you tackle the above situation? Is there a data structure that can be stored in main memory and still hold vast amount of data? This is where bloom filters come in. Bloom filters use much lesser space and constant time to answer the queries for set membership. More precisely

> A Bloom filter is a data structure that is used to check for membership of an element `x` in a set of `m` elements.

Bloom filters have a strong space advantage over other data structures like sets, hash tables or binary search trees. Bloom filters also have the property that the time taken to add an item or to check for membership is a constant `O(k)` and is independent of the number of items in the filter. 

What's the catch you might ask? Well, the catch is that bloom filters trade exactness for this efficiency meaning that there are false-positives - i.e. elements that are not a part of set but are claimed to be part of the set. However, as we shall soon see, the rate of false positives depends upon the application and can be lowered at the expense of  amount of memory required. Like everything else in computer science, there is a trade-off and in this case, between exactness and amount of memory. 

### Algorithm

At the heart of every bloom filter lies two key elements

1. An array of `n` bits, initially all set to `0`.
2. A collection of `k` independent hash functions `h(x)`. Each hash function takes a value `v` and generates a number `i` where `i < n` which effectively maps to a position in the bit array.

The underlying idea of a bloom filter is quite simple and can be explained in the following steps - 

1. Initialize a bit array of `n` bits with zeros. Generally `n` is chosen to be much greater than the number of elements in the set.
2. Whenever the filter sees a new element apply each of the hash functions `h(x)` on the element. With the value generated, which is an index in the bit array, set the bit to 1 in the array. For example, if there are `k` hash functions there will be `k` indices generated. For each of these `k` positions in the bit array set `array[i] = 1`
3. To check if an element exists in the set, simply carry out the exact same procedure with a slight twist. Generate `k` values by applying the `k` hash-functions on the input. If **at least** one of these `k` indices in the bit array is set to zero then the element is a new element else this is an existing element in the set.

### Example

Lets just jump to an example[^1]. We start by defining the hash functions. To keep the example simple, we'll use two hash functions `h(x)` and `g(x)`. This is how these work for an integer `x`

`h(x)`:

1. Convert `x` to its binary equivalent. Lets call it `b`.
2. Take the odd numbered bits in `b` and generate a new number `y` with these bits.
3. Return the value of `y modulo 11`.

`g(x)` is same as `h(x)`, the only difference being that instead of taking the odd numbered bits we take the even numbered bits.

*Quick example*: Let `x = 25`. Then `b = 11001`. Taking every odd bit gives us a binary number `101` which is binary for `5`. Similarly taking every even bit gives us `10` which is binary for `2`. Hence `h(x) = 5 % 11 = 5` and `g(x) = 2 % 11 = 2`.

Here's a simple implementation in Python for the hash functions defined above. 

```
def h(x):
    return int("".join([v for i, v in enumerate(bin(x)[2:]) if i % 2 == 0]), 2) % 11

def g(x):
    return int("".join([v for i, v in enumerate(bin(x)[2:]) if i % 2 == 1]), 2) % 11
```

With that out of the way lets proceed with our filter. Assume our bit array has `11` bits, all of which are initially set to zero - `00000000000`. 

Let the first number that our bloom filter sees be `25`. As shown above, the value of `h(25) = 5` and `g(25) = 2`. Hence the next step is to set the `5th` and the `2nd` position in our bit array to `1`. Doing that our bit array now transforms to `00100100000` ([big endian](https://en.wikipedia.org/wiki/Endianness) mode).

Extending the same logic for different values of `x` we get the table shown below.

| `x`   | `b`          | `h(x)` | `g(x)` |   `Bit array`  |
|-----|------------|------|------|:-----------:|
| `25`  | `0000011001`      | `5`    | `2`    | `00100100000` |
| `159` | `0010011111`   | `0`    | `7`    | `10100101000` |
| `585` | `1001001001` | `7`    | `9`    | `10100101010` |

This can be verified by using the functions defined above - 

```
map(lambda x: (h(x), g(x)), (25, 159, 585))
# [(5, 2), (0, 7), (7, 9)]
```

As its quite clear, the bit array now becomes `10100101010`. How about lookups? Lets say that the new value that comes to our filter is`118`. We compute `h(118)` and `g(118)` and find these values to be `5` and `3` respectively. The next thing we do is the check in value of the bit array at these indices and find that 

```
array[5] = 1
array[3] = 0
```

Since one of the bit is set to 0 our bloom filter reports that this the number `118` is not an existing member in our set.

### False Positives
Getting back to the caveat that was pointed out earlier - let me use an example to demonstrate how the bloom filter is susceptible to false positives.

Assume the next value that comes to our filter is `162`. Calculating the hash functions we find that `h(162)` is `2` and `g(162)` is `0`. Looking for the values in our bit array we find that both of these indices are set to `1`. Hence, in this case the bloom filter will wrongly report that the value `162` exists in our set.

### Performance
If after reading the above you are thinking to yourself that we just need to reduce the number of collisions to reduce the rate of false positives then you are right. A simple improvement in the above example is to use more hash functions and have a large bit array. If instead of 11 bits we had 100 bits and instead of just 2 hash functions `h(x)` and `g(x)` we had a few more, the probability that a non-existing value to hash to all the set bits would have reduced, thereby, reducing the rate of false positives. 

#### A numerical example
Let's do some math to corroborate our intuition above. If you feel the above statement is intuitive enough feel free to skip this section. 

From the example in the previous section it will be clear that a false positive arrives whenever all the positions output by the `k` hash functions. Hence we can say that, the probability of a false positive depends on the density of `1`s in the array and the number of hash functions. More the number of `1s` the higher the probability of a false positive. Likewise, fewer the hash functions, higher the probability of a collision.

Also, roughly we can say the following about the number of ones -

```
number of 1s = (no. of elements x no. of hash functions) - collisions.
```

From the above example, we have `3` input elements and `2` hash functions. Hence there should be `6` bits set to 1. Since we have one collision `g(117) == h(585)` therefore the total number of bits set in our bit array is `5`.

Lastly, considering an analogy to darts and targets, we can say that for `d` darts and `t` targets, we can prove that the probability that no darts hit the target is `e^(-d/t)` where `e` is the base of natural logarithm[^2]. In our case, the targets are the bits in the array and the darts are the outputs of the hash-functions.

Okay, now we are ready for the example. Assume we have a bit array of 1 billion bits, 5 hash functions and 100 million elements. That is

```
t = 10^9 (bits in the array are the targets)
d = 5 x 10^8 (outputs from the hash functions are the darts)
P(no dart hits the target) = e^(-d/t) = e^(-0.5) = 0.607
```

Hence the density of `0s` in the bit array = `0.607` or density of `1s` in the bit array = `0.393`.

The probability of a false positive = Probablity of all 5 hash functions to a index that has 1 in the bit array = `0.393^5 = 0.00937`. 

As seen above, the P(false positive) is indeed less. By tweaking the number of hash functions and the number of bits in the array this can be improved even further.

### Space Advantage

The space advantage in a Bloom Filter comes from the compactness from the data structure. A Bloom filter with 1% error and an optimal value of k, requires only about 9.6 bits (1.2 bytes) per element — regardless of the size of the elements[^3]. Comparing this value to storing a typical integer in hash table which would take 32 bits or (4 bytes).

### Implementations

Hopefully, if you've come this long you are probably sold on giving the data structure a shot. Armon Dadgar's [bloomd](https://github.com/armon/bloomd) is excellent implementation inspired by Memcached. There are also a good number of client libraries available in popular languages. If you're using [Redis](http://redis.io/) you can use the `SETBIT` and `GETBIT` functions to have a redis backed bloom filter. The [documentation](http://redis.io/topics/data-types) has some helpful examples to help you.

### Conclusion

I hope this article was useful in whetting your appetite about Bloom Filters. Probabilisitic data structures are really cool and in my opinion, bloom filters are a perfect introduction to the topic. 

Feel free to leave any comments or suggestions in the comments below.


[^1]: The example is motivated by the one discussed by Prof. Jeff Ullman in a lecture of the [Mining Massive Datasets course](https://www.coursera.org/course/mmds).
[^2]: To read about the proof, please read section `4.4.3` of the [Mining Massive Datasets book](http://mmds.org/#ver21).
[^3]: [Bonomi et al](http://theory.stanford.edu/~rinap/papers/esa2006b.pdf)
