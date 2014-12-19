---
date: 2014-08-02T12:34:58+03:00
title: Organizing Angular Apps for Testing
tags: [angularjs, javascript]
---
In the [last post](/articles/choosing-angular), I talked about how we moved away from jQuery to Angularjs to power our single page application. To recap, the major problems with our existing code which convinced us to do a rewrite - 

- The existing code was written by a team which was no longer with the project. No one on the existing team had a strong understanding of how the code worked.
- Without any structure, the code was extremely hard to maintain and understand. Having a huge javascript file with more than 1500 lines of code was a complete nightmare.
- There were no tests at all which made refactoring a very hard exercise. Whenever a bug was reported the team used to be scared to break something that was already working.
- It used a technology (jQuery) which was totally not suited to the problem. This meant that adding any new features on the existing application would result in a lot more code which while using a better technology could be accomplished with much lesser.

Early on, my primary focus was to guard against these problems and as a result, I spent considerable time trying to understand the best practices in building a single page application.Below are a few practices that I decided to carry on as I start building this project

- Comprehensive documentation and well-commented code along with regular code reviews and walkthroughs with the rest of the team so that everyone has a good enough understanding of the application. 
- Having an intuitive and scalable project structure, organized by modules in order to aid traversing the code and reduce the maintainence hassle.
- Gain confidence in the code by writing strong set of unit and end-to-end tests. 
- Have a well organized build system (asset pipeline if you may) to manage these tasks and automate best practices.

### Structure
Before we get on the topic of structure, let me state my goal outright.

> My goal is here to have many Angular files in development, but they need to be loaded into the browser in bulk (as a single minified file).

What that basically means is that I want to have many files in my local dev environment (I prefer to structure my app by function) but finally generate just a single file (preferably minfied) that can run in production.

Burke Holland had a [fantastic post](http://developer.telerik.com/featured/requiring-vs-browerifying-angular/) explaining how Angular loads an application and comparing the merits of browserify vs require.js in an Angular app. As pointed out, RequireJS seems much more complicated in order to set it up with Angular apps. Instead of re-iterating his reasons here, I would extol you to go and give it a read yourself. Browserify, on the other hand does bring in some goodness of node.js modules in to browser but that also seemed like an overkill. Finally, reading over the comments on HN, I came across [this comment](https://news.ycombinator.com/item?id=8010997) by Burke Holland himself which basically switched on a light bulb in my head, and I decided to simply leverage Angular's module system and do a concat on files before serving them to the browser.

> I'm starting to think that module systems on Angular's modules is a bad idea. Maybe I'm overthinking this. Should we just grunt-concat (or whatever Gulp does) and move on with life? - Burke Holland

The simplest way is to organize your files is by functionality. Another popular method is to organize by application type eg. `login`, `cart` etc. With that in mind, this is how my current `src` folder looks like - 

```
├── app.js
├── controllers
│   ├── AddressController.js
│   ├── DeliveryController.js
│   ├── EditAddressController.js
│   ├── LoginController.js
│   └── NewAddressController.js
├── filters
│   └── LanguageFilters.js
└── services
    ├── AddressService.js
    ├── DeliveryService.js
    ├── CartService.js
    └── Constants.js
```

However, to make this work there is one small thing that needs to be kept in mind i.e. making sure your code uses Angular modules for declaration. So for example, instead of declaring a `factory` like so

```
var app = angular.module('myApp', ['ngRoute']);

app.factory('CartService', function() {
  return {
    getItems: function() {},
  }
});
```

we should instead do this

```
angular.module('myApp', ['ngRoute']); // setter

angular.module('myApp') // getter 
  .factory('CartService', function() {
    return {
      getItems: function() {},
  }
});
```

There are 2 problems with the first way. 

1. It adds the `app` variable in the global scope. If you create another application that uses `app` variable, this will be an issue.
2. For the factory definition to work, the `app` should already be defined. This creates, sort of a dependency, that needs to be tracked while concatenating.

The second way, however, faces none of the two flaws and allows you to be totally flexible in terms of ordering your declarations. With that done, here's a simple grunt config that you can have to concat the `src` files.

```
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
	preserveComments: 'some',
	sourceMap: true
      },
      build: {
        src: 'build/main.js',
        dest: 'build/main.min.js'
      }
    },
    concat: {
      options: {
        stripBanners: false,
        separator: ";",
      },
      dist: {
        src: ['src/**/*.js'],
        dest: "build/main.js"
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        },
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};
```

The grunt file above contains three simple tasks - `uglify`, `watch`, `concat`. Quite simply, the `concat` task concatenates all the source files into a file located in `build` folder. The `uglify` task then takes the concatenated output and produces a minified js file along with a source map. [Source maps]() are an awesome feature in modern browsers that take the pain out of debugging minified javascript. I'll be covering source maps in a separate article but until then you can go ahead and read [this]() article on HTML5 rocks to get a good gist on how they work. Finally, the `watch` is a grunt task for the lazy that triggers a set of tasks (specified in `tasks` array) to run whenever any file as mentioned in the `files` options changes.

### Testing
With our angular app's structure properly setup, lets get onto the fun stuff - testing. As with all apps, it is a good idea to write both unit and integration tests. One of the most awesome things about Angular is the fact that testing is treated as first-class citizen which is abundantly evident by the fantastic set of tools made available by the Angular team. These tools clearly take the pain out of setting up a test suite and the online docs provide a great starting point for writing robust set of tests. There are two specific testing tools that are typically used for testing Angular apps - 

1. [Karma](http://karma-runner.github.io/0.12/index.html) for unit tests
2. [Protractor](https://github.com/angular/protractor) for end-to-end tests

The preferred way of organizing tests is to keep the `e2e` and `unit` tests separate.

```
├── e2e
│   ├── delivery.spec.js
│   ├── index.spec.js
│   └── loginpage.spec.js
├── karma.conf.js
├── protractor.conf.js
├── server.js
└── unit
    ├── specs
    │   ├── delivery.spec.js
    └── vendorv
```

#### Unit tests with Karma
Karma is a test runner used and built by the Angular team to run unit tests. It has support for various testing frameworks like [Mocha](http://visionmedia.github.io/mocha/), [Jasmine](http://jasmine.github.io/) etc. that help you write tests. Thanks to the power of dependancy injection and the modular nature of angular, writing unit tests to tests all parts of your application - from directives to controllers and services can be very easy.

Karma requires a configuration file in order to run. [Here's](https://gist.github.com/prakhar1989/d38d6af5e1025a978c8c.js) a sample configuration file that you can use to base your configuration off. The most important parts of the configuration are the `files` and the `frameworks` property.

```
// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
frameworks: ['jasmine'],

// list of files / patterns to load in the browser
files: [
  'tests/unit/vendor/angular.min.js',
  'tests/unit/vendor/angular-mocks.js',
  'src/filters/filters.js',
  'src/services/DeliveryService.js',
  'src/services/CartService.js',
  'src/services/MessageService.js',
  'tests/unit/specs/*.js'
],
```

Do make sure to include `angular.min.js` and `angular-mocks.js` or you'll be beating yourself with incomprehensible error messages from Angular while running your tests. With that setup, you can run `karma start tests/karma.conf.js --single-run`. 

Let's see how we can inject the angular app in karma tests. To illustrate, I am going to use the `deliveryService` service and write tests for it.

Delivery Service - 
```
angular.module('appServices.DeliveryService', [])
.factory('DeliveryService', function() {
  return {
    getDeliveryModes: function() { return {} }
  }
});
```

Delivery Spec - 
```
describe('Service', function() {
  beforeEach(module('appServices.DeliveryService'));

  describe('delivery service', function() {
    beforeEach(inject(function(DeliveryService) {
    // inject the service and do other things here
    }));

    it("should get modes correctly", inject(function(DeliveryService) {
      var deliveryInfo = DeliveryService.getDeliveryModes();
      expect(deliveryInfo).toEqual({});
    }));
  });
});
```

And with that, you have a fully functioning spec that you can test to your heart's content.

#### End-to-End tests with Protractor

From Protractor's documentation - *Protractor is an end-to-end test framework for AngularJS applications. Protractor is a Node.js program built on top of WebDriverJS. Protractor runs tests against your application running in a real browser, interacting with it as a user would.* 

In other words, think of Protractor as Selenium with Angular goodness. For example, if you have a `input` element like so 

```
<input type="text" ng-model="name" placeholder="Enter Name"/>
```
then you can use use the `by.model` selector to select the element, right within a protractor test spec
```
element(by.model('name')).sendKeys(1);
```

Pretty cool, right?

Honestly, Protractor behaves just like an end-user and doesn't give two hoots about how modular your application is. With protractor, you use a config file to tell the server address and you are done. Here's a sample config file - 
```
exports.config =  {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    specs: [
    "./e2e/*.spec.js"
    ],
    suites: {
      login: "./e2e/loginpage.spec.js",
      delivery: "./e2e/delivery.spec.js"
    },
    jasmineNodeOpts: {
      isVerbose: true,
      showColors: true,
      defaultTimeoutInterval: 5000
    },
    baseUrl: "http://localhost:8000"
}
```

Installing Protractor is quite simple. I'd suggest you quickly walk through the [getting started page](https://github.com/angular/protractor/blob/master/docs/tutorial.md) to setup everything.

### Conclusion

Hopefully this (rather long) post has helped you in understanding how to organize your angular apps specifically for testing. Even if you dont plan to write tests, I've found this organization structure to be quite helpful and intuitive. 

If you feel I've missed out something or have some other tips to share - please feel free to share them in the comments below.
