+++
date = "2015-06-27T20:33:29+03:00"
title = "Intro to Big Data with Apache Spark"
tags = ["courses"]
description = "Thoughts on the Big-data MOOC"
mastimage = "http://prakhar.me/images/spark.png"
+++

Last night I finished the final assignment for the new course that I had been working on in the past week called [Intro to Big Data with Apache Spark or CS100.1 x](https://www.edx.org/course/introduction-big-data-apache-spark-uc-berkeleyx-cs100-1x). With the course over, I decided to write down a quick review in the hope that it will help others get an idea of what they can expect by enrolling in this popular [MOOC](https://en.wikipedia.org/wiki/Massive_open_online_course) by UC Berkeley.

I heard about the course after stumbling upon a laudatory [review](https://news.ycombinator.com/item?id=9702803) by an existing student on Hacker News. After learning that the course involves programming assignments that teach you the Spark API, I couldn't help signing up.

TL;DR - If you're a programmer who wants to explore what the hype on Spark is all about and considers solving [code katas](http://codekata.com/) a great way to spend your evenings, then take this course - you will not be disappointed.

### Apache Spark

<figure>
    <img data-action="zoom" src="/images/spark.png"></img>
</figure>

So what is [Apache Spark](https://spark.apache.org)? Spark is a fast and general-purpose cluster computing system that is used for large-scale data processing. The project was developed by the [AMPlab](https://amplab.cs.berkeley.edu/) at UC Berkeley and has now evolved into a standalone company - [Databricks](https://databricks.com/) that, among other things, provides enterprise consulting and training for Apache Spark.  

Why should you care? Well, if you're working as a data scientist or a data engineer you're no stranger to the monumental growth of Spark in the bigdata field. Spark has been taking the big-data world by storm after showing consistent benchmarks that boast of it being upto 100x faster than Hadoop. Late last year, Spark also made waves by setting the [world record](https://databricks.com/blog/2014/11/05/spark-officially-sets-a-new-record-in-large-scale-sorting.html) for large-scale on-disk sorting.

In order to evangelize Spark and help developers / data scientists learn about it, Databricks and UC Berkeley teamed up to start a Big Data [Xseries](https://www.edx.org/xseries) on EdX that consists of two MOOCs - CS 100.1x followed by Scalable Machine Learning.

> The Big Data XSeries, created in partnership with Databricks, will articulate the expected output of Data Scientists and then teach students how to use PySpark (part of Apache Spark) to deliver against these expectations.  Students will gain hands-on experience applying big data principles using Apache Spark, a cluster computing system well-suited for large-scale machine learning tasks.

### Pedagogy
With the *elevator pitch* out of the way, let's get back to the review. The entire course spans 5 weeks (including week 0 which dealt only with the setup) with the material consisting of lecture videos, short quizzes and programming assignments. Unlike the typical technical MOOCs that I've done in the past, there are no exams and surprisingly the last week has no lecture videos to watch.

The lecture videos, in my opinion, were pretty light in content. Even on a lethargic evening, it took me roughly somewhere around 30 mins to breeze through the videos and answer the quizzes. The first week started off with talking about Apache Spark and how it is different from Hadoop. The two subsequent weeks focused on issues with data management and talked about how a typical big data processing pipeline looks like. The penultimate video in week four spent roughly 5 mins talking about [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering) and [Spark MLib](https://spark.apache.org/docs/1.2.1/mllib-guide.html) which somehow seemed enough to the teaching staff to justify a programming assignment on the topic.

As far as forums and class interactions go, the instructors are quite active on the forums and the staff is quick to sort out any hiccups with the autograder. I got stuck a couple of times but was quickly able to find a way by searching for previous threads in the forums.

### Programming Assignments
Coming to my initial motivation for taking this course, if are you wondering whether this course delivered on its promise on teaching Spark then the answer is a resounding yes! The programming assignments were exceptionally well thought-out and interesting. Each week's lab [exercise](https://github.com/spark-mooc/mooc-setup/blob/master/lab0_student.ipynb) was presented as an [IPython notebook](http://ipython.org/notebook.html) which provided the ideal environment for interacting with and exploring the Spark's Python API.
(As an aside, if you haven't checked out IPython notebooks yet, please do yourselves a favor and give it a go.)

What the course lacked in the lectures was more than compensated for in the extremely detailed and well presented notebooks. The instructors leveraged the entire set of IPython capabilities wonderfully as the notebooks were interspersed with diagrams, LaTeX equations and even plots courtesy of [Matplotlib](http://matplotlib.org/).

The typical structure followed in the programming assignments was

- Introduce a topic with theory and examples
- Give a small coding exercise on solving the problem
- Run your code against the test cases provided

Rather than having a big problem statement for the students to solve in one go, the bite-sized problems and test cases provided instant feedback and the necessary encouragement to keep forging ahead. Lastly, much to the project's credit the [Spark documentation](https://spark.apache.org/docs/latest/api/python/pyspark.html) was well written which made the process of finding a function that does X to using it quite gratifying.

Even though Spark supports variety of languages R, Spark SQL, Java, Python and Scala, the instructors choice to go ahead with Python and IPython clearly shows how powerful of a teaching tool it can be.

### Setup

Before jumping on to the first assignment, I was reasonably certain that setting up a **cluster computing system** was going to be a big pain - even on a single machine. The courseware's long setup document and set of 5 videos also corroborated my fears. What turned out to be delight though that it took me less than 10mins to get the entire setup running.

Showing great wisdom on their part, the course designers made the process extremely straightforward by providing a custom [Vagrant](https://www.vagrantup.com/) image which had everything installed. Since I use Vagrant on a daily basis, going from *never running Spark* to a *functioning Spark environment* was just a matter of few commands.

```
$ wget <course_materails_url>
$ cd bigdata_course
$ vagrant up
# 5 mins later ... IPython is running on 8001
```

The VM also came bundled with all the required IPython notebooks and data associated with the labs which meant that you needed to setup everything just once.

### Conclusion

CS 100.1x is probably the course where I've spent the least amount of time and had the most amount of fun (Steve Huffman's web dev [course](https://www.udacity.com/course/web-development--cs253) comes a close second). I started a week later and within 3 weekends I was able to finish the material. While that could be attributed to my prior experience with machine learning and functional programming, from what I could see in the forums students were able to finish the assignments within reasonable time.

What this goes to show is that the material is light, focused and can be done with quickly if you find it interesting - much like any other crash course. For someone who's curious to understand how Spark works and wants to dip their toes in the water, I doubt there can be a anything more fruitful than spending a couple of weekends working through the programming assignments.

Overall, I had a great time learning about the Spark computation model, its API and how it can be efficiently used to process large amounts of data. Although the path from completing this course to setting up a data processing pipeline on a cluster for your company is a tough one, I feel that the material provided me enough tools to go and explore further.
