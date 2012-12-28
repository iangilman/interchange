/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'src/*.js']
    },
    concat: {
      bookmarklet: {
        src: ['lib/jquery-1.8.2.min.js', 'src/common.js', 'src/bookmarklet-base.js'],
        dest: 'js/bookmarklet.js'
      },
      widget: {
        src: ['lib/jquery-1.8.2.min.js', 'src/common.js', 'src/widget-base.js'],
        dest: 'js/widget.js'
      }
    },
    watch: {
      files: ['grunt.js', 'src/*.js', 'lib/*.js'],
      tasks: 'lint concat server'
    },
    jshint: {
      options: {
        onecase: false,
        immed: false,
        debug: false,
        evil: false,
        strict: false,
        multistr: false,
        wsh: false,
        couch: false,
        laxbreak: true,
        rhino: false,
        globalstrict: false,
        supernew: false,
        laxcomma: false,
        asi: false,
        es5: false,
        scripturl: false,
        withstmt: false,
        bitwise: true,
        eqeqeq: false,
        shadow: false,
        expr: false,
        noarg: true,
        newcap: true,
        forin: false,
        regexdash: false,
        node: false,
        dojo: false,
        eqnull: false,
        browser: true,
        mootools: false,
        iterator: false,
        undef: true,
        latedef: true,
        nonstandard: false,
        trailing: false,
        jquery: true,
        loopfunc: false,
        boss: false,
        nonew: true,
        funcscope: false,
        regexp: false,
        lastsemic: false,
        smarttabs: false,
        devel: false,
        esnext: false,
        sub: false,
        curly: false,
        prototypejs: false,
        proto: false,
        plusplus: false,
        noempty: false
      },
      globals: {
        igic__: true,
        unescape: true,
        escape: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat');

};
