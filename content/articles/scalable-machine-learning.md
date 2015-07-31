+++
date = "2015-07-31T20:33:29+03:00"
title = "Scalable Machine Learning"
tags = ["courses"]
description = "A quick review on the CS190 Course"
mastimage = "http://prakhar.me/images/spark.png"
+++

A couple of days ago I finally finished off the last assignment of the [Scalable Machine Learning](https://www.edx.org/course/scalable-machine-learning-uc-berkeleyx-cs190-1x) course. The last few days in Kuwait were a bit tough as I had tons of stuff to do before leaving the country. It turns out leaving Kuwait is even harder than getting there in the first place. Additionally I had set a personal deadline of finishing the course a week before the actual deadline so that I when I reach home I could focus on other work.

Enough of rambling - let's get on with the review. Scalable Machine Learning or CS 190.1x is the second installment in the [Big Data series](https://www.edx.org/xseries) at EdX. The course picks up where the previous one - [CS 100.1x](https://www.edx.org/course/introduction-big-data-apache-spark-uc-berkeleyx-cs100-1x) left off and dives deeper into using Apache Spark's [MLlib](http://spark.apache.org/mllib/) to solve machine learning problems.

Since MLlib runs on top of Apache Spark it comes with the same
benefits as Spark i.e performance and easy-to-use APIs in Python,
Scala and Java. The library implements a host of popular machine learning algorithms out of the box such SVM, random forests and k-means clustering. In this course, however, the assignments ended up requiring only logisitic regression and linear regression with L<sub>1</sub> and L<sub>2</sub>-regularization.

### Pedagogy

The coursework spans five weeks (six if you include the week for setup) thereby making it almost as long as CS 100.1x. The course starts off with an introduction to types of machine learning algorithms - supervised learning & unsupervised learning. The following week is same as the second week of CS 100.1x and hence can be skipped entirely.

The three subsequent weeks cover three ML algorithms with one in each the lecture series and the accompanying labs -

- Linear Regression
- Logistic Regression
- Principal Component Analysis

Each week there is roughly an hour of video content to be watched. At the end, lectures are followed an easy quiz. Like the previous course, there are no final exams that need to be taken.

In contrast to a typical ML class, the lectures are pretty light on the math which make it more approachable to newcomers - starkly in contrast to the course by Andrew Ng. Although the lectures do convey the intuition behind the algorithm to a reasonable extent, do not expect to master even the fundamental algorithms such as gradient descent.

### Programming Assignments
The programming assignments like the previous installment are the highlight of the course. The usage of IPython makes the entire process of exploratory data analysis much easier to visualize. The notebooks follow the same incremental approach like the last course and are interspersed with beautiful graphs. 
The last assignment on PCA, for example, ends with identifying patterns of brain activity in a larval [zebrafish](https://en.wikipedia.org/wiki/Zebrafish). The end result generates a heat-map like figure which seems very gratifying after the laborious programming assignment.

<blockquote class="twitter-tweet tw-align-center" lang="en"><p lang="en" dir="ltr">Oh look - I generated similar temporal regions in a larval zebrafish via principal component analysis. <a href="https://twitter.com/hashtag/SparkMLcourse?src=hash">#SparkMLcourse</a> <a href="http://t.co/tARm66Igrl">pic.twitter.com/tARm66Igrl</a></p>&mdash; Prakhar Srivastav (@prakharsriv9) <a href="https://twitter.com/prakharsriv9/status/625441171985297408">July 26, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Scalable?
Another thing that sets this course apart from other ML courses is the treatment of *scalable* techniques. In particular, the professor set a couple of videos aside each week to talk only about cases where both `N` - the number of data points and `D` - the number of features are large.

Unfortunately, none of these techniques are used in the programming assignemnts so it is possible that these lessons might stick with you for long.
