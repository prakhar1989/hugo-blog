---
title: Enums in Python 
date: 2014-05-12T12:34:58+03:00
tags: [python]
---

On 12th May 2013, Guido accepted the Python Enhancement Proposal 435 which suggests adding an Enum type to the Python standard library. The news caused a lot of commotion in the Python community and generated (mostly) healthy discussions on [Hacker News](https://news.ycombinator.com/item?id=5685903). In this post I'll give an introduction to what enums are and talk about how you can use them in your programs. 

### Enumerated Types
According to [Wikipedia](http://en.wikipedia.org/wiki/Enumerated_type), an enumerated type is a data type consisting of a set of named values called elements, members or enumerators of the type. The enumerator names are usually identifiers that behave as constants in the language.

In other words, an enumeration is a set of symbolic names useful for
defining an **immutable**, **related** set of **constant values**. It is like a class of constants that are immutable and related which can be used throughout your programs.

For example, an enumerated type called `Days_of_Week` may be defined to consist of `sunday`, `monday`, `tuesday`, `wednesday` etc. Or an enumerated class for `Roles` might contain `admin`, `user` and `guest`.

### Why Enums?
Why do we need Enums? Aren't the constructs already available in the
language capable of doing this? To answer the second question first, its true that similar functionality is possible. Developers all this while have been using a constants defined as INTS for this very purpose.  For example, check out [this](https://github.com/mitsuhiko/flask/wiki/Large-app-how-to#first-model-and-its-constants-file) definition of a model in SqlAlchemy. 
Armin, the creator of flask, declares a few constants in the `constants.py` file which look like this

```
# User role
ADMIN = 0
STAFF = 1
USER = 2
ROLE = {
  ADMIN: 'admin',
  STAFF: 'staff',
  USER: 'user',
}

# user status
INACTIVE = 0
NEW = 1
ACTIVE = 2
STATUS = {
  INACTIVE: 'inactive',
  NEW: 'new',
  ACTIVE: 'active',
} 
```

The problem with this, however, is that these are ultimately integers. You can do a number of operations on them, which logically do not make sense. To point out another problem, imagine there are 100s of such roles. While debugging 

```
>>> print user.role
0
```

makes much less sense that 

```
>>> print user.role
Roles.admin #type enum
```

Finally, if there's another set of constants which need the same values
(employee roles, for example) in which case these definitions might clash. 

Using enums allows us to write cleaner programs the above issues are
accounted for. 
- Enums can have values distinct from each other.
- Operations (like multiplication) are not defined for these values


### Usage
I'll encourage you to the check out the [PEP](http://www.python.org/dev/peps/pep-0435/) for detailed (proposed) syntax but here a few examples. 

```
from emum import Emum
 
Class Roles(Enum):
  admin = 0
  staff = 1
  user = 2

print(Roles.admin)               # >>> Roles.admin
print(repr(Roles.admin))         # >>> <Roles.admin: 0>
```

Make no mistake, the numbers indicated here are just values that are
assigned to the enum members and dont stand for anything. As mentioned in the PEP - 
*Using integers is short and handy (and provided by default by the Functional API), but not strictly enforced. In the vast majority of use-cases, one doesn't care what the actual value of an enumeration is. But if the value is important, enumerations can have arbitrary values.*

Below is a list of important features as defined in the PEP

- Enums support iteration in definition order 
- Enum members are hashable.
- Duplication of enum members is not allowed. However, if two enum members have the same value then they are referred to as aliases.
- Finally, ordered comparisons are not supported as enums are not like
  integers

The exact mechanics of how Enums will work are still not clear and are being
actively discussed on the mailing list. Hopefully, this post has helped you in
understanding in what the hullaboo is all about!

See you next time!
