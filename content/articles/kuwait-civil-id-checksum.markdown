---
title: Checksum
date: 2014-02-14T12:34:58+03:00
tags: [cs]
---

It's been around 8 months since I've started working in Kuwait & I can still vividly remember the hoopla we had to go through in order to get our Civil IDs. The Kuwaiti Government assigns a unique identification number to each and every resident of Kuwait which is called the Civil ID. This is quite similar to how it works in all the countries, however, the process in Kuwait is protracted and quite laborious for expats. 

Recently, we were building an application that required the user to enter his or her civil id. The app was supposed to be a mobile app and the Civil ID being a long **12 digit** number, we were certain that typos would be quite common. To our luck, we discovered that the Kuwaiti system uses a Checksum to validate for correctness.


### What?

Checksums are simply an arbitary size of digital data that is meant for the purpose of detecting errors in storage or transmission of the original data.

By comparing the checksum of the original and the transmitted data checksums can be used to verify whether the transmitted data is indeed correct. Checksums are quite common whenever numbers are being transmitted or stored. 

Credit card number follow a famous checksum algorigthm called [Luhn Check](http://en.wikipedia.org/wiki/Luhn_algorithm) which was created by an IBM scientist - Peter Luhn. The ISBN or the [International Standard Book Number](http://en.wikipedia.org/wiki/International_Standard_Book_Number), which is an identification scheme used for books uses a very simple 10 digit checksum for the very same purpose.

### Civil ID Checksum

The formula for checksum for the Kuwaiti Civil ID goes like this - 

```
11 – Mod(( c1 * 2 ) + ( c2 * 1 ) + ( c3 * 6 ) + ( c4 * 3 ) + ( c5 * 7 ) +
( c6 * 9 ) + ( c7 * 10 ) + ( c8 * 5 ) + ( c9 * 8 ) + ( c10 * 4 ) + ( c11 * 2 )),11) = 
The 12th Digit
```

For the more, mathematically oriented here's the formula (where c1, c2 etc are the 12 digits of the civil ID number)

```
(2,1,6,3,7,9,10,5,8,4,2)⋅c1 … 11+ c12 = 0 (mod11)
```

The checksum is quite simple, it just uses the modulus 11 (since 11 is a prime number) and a set of a coefficients to compute the 12th digit. Basically, the last digit in the Civil ID holds the checkum value.

The javascript code to test the checksum is quite straightforward -

```
var calculate = function(number) {
  var coeff  = [2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      sum = 0;
  for (var i = 0; i < number.length - 1; i++) {
    // assuming number is a 12 character string
    sum += parseInt(number[i]) * coeff[i];
  }
  return (number.length == 12) && 
         (11 - (sum % 11) == number[number.length-1]);
}
```

If you're like me you probably are wondering about those coefficients in the above formula. Thanks to the wonderful stackexchange network, I got the answer almost instantly by a few math nerds over [here](http://math.stackexchange.com/questions/672303/logic-behind-the-id-checksum/672374#672374).

It turns out the coefficients are (2^N modulus 11) 

```
2 = 2^1 % 11

1 = 2^0 % 11 

6 = 2^9 % 11

3 = 2^8 % 11

7 = 2^7 % 11
...
```

You are encouraged to follow up the thread on math.stackexchange and learn more about how this order comes from computing the [first differences](http://en.wikipedia.org/wiki/First_difference).

See you next time!
