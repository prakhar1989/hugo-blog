---
title: The String Rotation Problem
date: 2014-07-22T12:34:58+03:00
tags: [algorithms]
---

On a recent (rather long) flight, while I was devouring Jon Bentley's [Programming Pearls](http://www.cs.bell-labs.com/cm/cs/pearls/), I came across this rather interesting problem. 

The problem is simple - How will you a rotate a string of length `n` by `i` steps in place i.e. without using any extra space?

<figure> <img src="/images/string_rotate.png"> </figure>

The example shown below makes it quite clear. Now the easiest way to do this is to simply save the `i` chars in a separate vector, shift the remaining chars by `i` and finally, paste the initial `i` items at the back. But this clearly uses extra space `O(i)`. Another way is to simply move the entire array left by one and do this `i` times. But this is too slow `O(i * n)`.

A really smart insight (which the author calls the **Aha! moment**) is this - The shifted array is basically two arrays reversed twice.

Here's how it works - Lets assume you have the array `ab`. The array `a` here is the array formed by the first `i` chars and `b` is the rest of it. In the example above, 
array `a` is `abc` and array `b` is `defghi`. With that in place, if we carry out the following transformation, we get back exactly what we need.

```
AB => abc defghi
A'B => cba defghi
A'B' => cba ihgfed
(A'B')' => BA => defghi abc
```

This is really a very neat trick to solve the problem, especially the part where you consider one array as a sum of two arrays. The author ends this section with a very interesting tidbit 

> Brian Kernighan and P.J. Plauger used precisely this code in their 1981 Software tools in Pascal to move lines in a text editor. Kernighan reports that it ran correctly the first time it was executed, while their previous code for a similar task based on linked lists had several bugs.

To make sure you are sold, below is some python code which does the same thing. Clearly, this algorithm is extremely clever and damn simple to implement!

```
def reverse(arr, start, end):
    """ reverses an array from the start to the end, where start and end
    are zero indexed """
    for i in range((end - start + 1)/2):
        arr[start+i], arr[end-i] = arr[end-i], arr[start+i]
    return arr


def rotate(arr, i):
    """ rotates an array i chars to the left """
    arr = reverse(arr, 0, i-1) # arb
    arr = reverse(arr, i, len(arr)-1) #arbr
    return reverse(arr, 0, len(arr)-1) #ba

if __name__ == "__main__":
    s = "abcdefghi"
    print "".join(rotate(list(s), 3)) # => defghiabc
```

Until next time!
