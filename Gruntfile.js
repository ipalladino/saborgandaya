#!/usr/bin/env nodejs

module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: './web/',
          livereload: true,
          project : "./web/"
        }
      }
    },
    watch: {
      files: ['web/**/*'],
      tasks: ['less'],
      options: {
        livereload: true
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "web/source/css/main.css": "web/source/less/*.less"
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['express','watch']);

};
