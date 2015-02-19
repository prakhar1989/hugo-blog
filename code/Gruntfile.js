module.exports = function(grunt) {

    grunt.initConfig({
       watch: {
           html: {
               files: "**.html",
               options: { livereload:true }
           },
           js: {
               files: "js/**/*.js",
               options: { livereload: true }
           },
           css: {
               files: "css/**/*.css",
               options: { livereload: true }
           }
       }
    });

    grunt.registerInitTask("default", function() {
        grunt.log.writeln("run grunt start to begin");
    });

    grunt.registerTask("begin", function() {
        grunt.log.writeln("Starting dev mode...");
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("start", ["begin", "watch"]);
}