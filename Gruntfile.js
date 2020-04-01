/* global module: true */
module.exports = function (grunt) {
  grunt.initConfig({
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        expand: true,
        src: ['*.html'],
        dest: 'dist/'
      }
    },
    cssmin: {
      files: {   
        expand: true,
        src: ['css/*.css', '*.css'],
        dest: 'dist/'
      }
    },
    uglify: {
      main: {
        files: [{
          expand: true,
          src: ['js/*.js'],
          dest: 'dist/'
        }]
      }
    },
    imagemin: {                               
      files: {
        expand: true,
        src: ['img/*.{png,jpg,gif}'],
        dest: 'dist/'
      }
    }   
  });

  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['uglify','cssmin', 'htmlmin','imagemin']);
};