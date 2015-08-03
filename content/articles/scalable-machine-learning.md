+++
date = "2015-07-31T20:33:29+03:00"
title = "Scalable Machine Learning"
tags = ["courses"]
description = "A quick review of the CS190 Course"
mastimage = "http://prakhar.me/images/zebrafish.png"
+++


A couple of days ago I finally finished the last assignment of the [Scalable Machine Learning](https://www.edx.org/course/scalable-machine-learning-uc-berkeleyx-cs190-1x) course. The last few days in Kuwait were a bit tough as I had tons of stuff to do before leaving the country. It turns out leaving Kuwait is even harder than getting there in the first place. Additionally I had set a personal deadline of finishing the course a week before the actual deadline so that I when I reach home I could focus on other work.


Enough of rambling - let's get on with the review. Scalable Machine Learning or CS 190.1x is the second installment in the [Big Data series](https://www.edx.org/xseries) at EdX. The course picks up where the previous one - [CS 100.1x](https://www.edx.org/course/introduction-big-data-apache-spark-uc-berkeleyx-cs100-1x) left off and dives deeper into using Apache Spark's [MLlib](http://spark.apache.org/mllib/) to solve machine learning problems.

> If you're interested to know more about CS100.1x, go ahead and read the course review for it [here](/articles/big-data-with-spark/).

Since MLlib runs on top of Apache Spark it comes with the same benefits as Spark i.e performance, scalability and easy-to-use APIs in Python,
Scala and Java. The library implements a host of popular machine learning algorithms out of the box such SVM, random forests and k-means clustering. In this course, however, the assignments ended up requiring only logisitic regression and linear regression with L<sub>1</sub> and L<sub>2</sub>-regularization.

### Pedagogy

The coursework spans five weeks (six if you include the week for setup) thereby making it almost as long as CS 100.1x. The course starts off with an introduction to types of machine learning algorithms - supervised learning & unsupervised learning. The following week is same as the second week of CS 100.1x and hence can be skipped entirely.

The three subsequent weeks cover three ML algorithms with one in each the lecture series and the accompanying labs -

- Linear Regression
- Logistic Regression
- Principal Component Analysis

Each week there is roughly an hour long video content to be watched. At the end, lectures are followed by a quiz. Like the previous course, there are no final exams that need to be taken.

In contrast to a typical ML class, the lectures are pretty light on the math which make it more approachable to newcomers. The course actually focuses more on the practical side of ML and less on theory. I wouldn’t call it a rigorous discussion of machine learning algorithms, however, they do teach the amount of theory a person will need for developing an intuition for the algorithm and solving the programming assignments. If you've done the ML course by Andrew Ng, then the pedagogy of this course will seem quite different.


### Programming Assignments
The programming assignments like the ones in CS 100.1x are the highlight of the course. The usage of IPython for exploratory data analysis is stellar. The notebooks follow the same incremental approach like the last course and are interspersed with beautiful graphs all of which help you in making sense of the data.

The assignments deal with practical problems and thus are quite interesting. There's one problem directly from a Kaggle competition and an assignment on PCA that deals with identifying patterns of brain activity in a larval [zebrafish](https://en.wikipedia.org/wiki/Zebrafish). The end result generates a heat-map like figure which seems very gratifying after the laborious programming assignment.

<blockquote class="twitter-tweet tw-align-center" lang="en"><p lang="en" dir="ltr">Oh look - I generated similar temporal regions in a larval zebrafish via principal component analysis. <a href="https://twitter.com/hashtag/SparkMLcourse?src=hash">#SparkMLcourse</a> <a href="http://t.co/tARm66Igrl">pic.twitter.com/tARm66Igrl</a></p>&mdash; Prakhar Srivastav (@prakharsriv9) <a href="https://twitter.com/prakharsriv9/status/625441171985297408">July 26, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On the negative side, the datasets used in the assignments are rather small and in few assignments the model is only run against the test and validation data set to test for accuracy i.e. the model is not used to make predictions on new data (a minor but important point).

### Scalable?
How does this course teach the *scalable* aspect of machine learning? For one, the fact that you're using Spark [RDDs](http://www.thecloudavenue.com/2014/01/resilient-distributed-datasets-rdd.html) to run on your workers itself gives you ability to run your code on a cluster for free of cost. The other aspect is that the professor sets aside a couple of videos each week to discuss cases where both `N`(the number of data points) and `D`(the number of features) are large - a key characteristic of big data.

Unfortunately, none of these techniques are used in the programming assignments so it is quite possible that these lessons might not stick with you for long. Having said that, the treatment of these topics in the lectures is relatively interesting and sufficiently detailed.


### Conclusion
In summary, CS 190.1x is a reasonably good introduction to Machine Learning. If you've never done any ML before, then this course will surely whet your appetite and encourage you to dive deeper into other popular algorithms. If you're reasonably proficient with ML, then this course will serve to be a primer to Spark's MLlib library - although the low coverage might leave you a bit disappointed. 

The instructors indicated that they might come out with a second version of course that will cover more algorithms in detail. I, for one, will surely be waiting for more info on that one. Overall, in my opinion, time spent doing this course is time well spent.
