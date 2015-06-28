---
title: Automated Testing With Newman
date: 2014-05-24T12:34:58+03:00
tags: [postman, nodejs]
---

Steve Klabnik, the developer at Balanced recently put up a post on the company blog talking about doing [TDD for APIs](http://blog.balancedpayments.com/tdd-your-api/) where he advocates a strong case for following Test Driven Development for APIs. For a lot of companies like Balanced, Stripe, Parse etc the API is their primary product. Hence, it makes sense to have strong development and testing practices for these APIs. 

TDD has taken off quite well with DHH and the ruby community strongly making claims of it solving a lot of problems and guaranteeing robust code. With tools like rspec and cucumber the ruby community has certainly been one of the most vocal proponents of this development methodology.

After trying a couple of solutions, Steve finally settles down with Cucumber to write specs that test his APIs. Now if you're a Postman user and have Jetpacks installed surely his approach seems too tedious. Compared to setting up Cucumber and writing verbose specs, 
writing simple JS code to run after the API gets a response seems extremely easy and productive - and all of this, right inside postman. Near the end of the article, Steve hits the point home with these lines

> Now that we have a testable validation that our API is working as intended, we can do all kinds of things. We’d like to integrate this suite into our more general continuous integration suite. We’d like to run this test every hour, or every three hours, which can be a form of alerting against regressions.

Until now, since all the tests run inside Postman this was not possible for Jetpack users. However, with [Newman](https://github.com/a85/Newman) released this can be as easy as exporting a collection and setting up a trusted Unix scheduler - cron.

Here's how we can do it with Newman.

Lets setup a simple script called `run_newman` to run our tests

```
#!/bin/bash

timestamp=$(date +"%s") 
collection=/var/www/myapp/tests/collection.json
env=/var/www/myapp/tests/envfile.json

# create separate outfile for each run
outfile=/var/www/myapp/tests/outfile-$timestamp.json

# redirect all output to /dev/null
newman -c $collection -c $env -o $outfile > /dev/null2>&1
```

Make it an executable
```
$ chmod +x run_newman
```

To run Newman every hour, run `crontab -e` and enter the following - 
```
0 * * * * /path/to/run_newman
```

Check your `cron` if it has been setup
```
$ crontab -l
0 * * * * /path/to/run_newman
```

With this, we have Newman ready to run automatically every hour and test our APIs. Do note that instructions of setting up cron vary upon the specific *nix distribution. Make sure to google on how to setup cron for your distribution.

Lets have it to do one more thing - send us email alerts in case our tests fail. Newman allows users to use a `-s` flag to signal a STDERR and halts the run in case any of the tests fail. This makes it very easy to have simple alert logic in the cron script itself.

```
#!/bin/bash

timestamp=$(date +"%s") 
collection=/var/www/myapp/tests/collection.json
env=/var/www/myapp/tests/envfile.json

# mail settings
RCVR="rcvr@example.com"
SUBJ="Test Failed"

# create separate outfile for each run
outfile=/var/www/myapp/tests/outfile-$timestamp.json

# capture newman STDERR status
command="$(newman -c $collection -e $env -o $outfile 2>&1 > /dev/null)"

# send mail if STDERR is not 0
if [ "$?" -ne "0" ]; then
	mail $RCVR -s "$SUBJ"
fi
```

I hope you agree that Newman is an extremely useful tool that you can use with Postman to automate testing of your APIs!
