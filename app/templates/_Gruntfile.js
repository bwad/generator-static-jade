// static-jade/Gruntfile.js

module.exports = function (grunt) {

   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

   grunt.initConfig({
   
      jade: {        // Task
         compile: {     // Target
            options: {
               pretty: true,
               data: {     // Target options
                  debug: false
               }
            },
            files: [{
               expand: true,
               flatten: true,
               src: ["src/*.jade", "!src/_*.jade"],  // Jade files, exclude partials.
               dest: 'public/',
                  ext: '.html'
            }]
         }
      },
     
      compass: {               // Task
         options: {            // Target options
            sassDir: 'src/stylesheets',
            cssDir: 'public/css',
            environment: 'production'
         }
      },
      
      connect: {
         server: {
            options: {
               port: 9001,
               base: 'public',
               livereload: true,
               open: true,
               keepalive: false,
               middleware: function (connect) {
                 return [
                   require('connect-livereload')(), // <--- here
                   connect.static(require('path').resolve('public'))
                 ];
               }
            }
         }
      },
      
      watch: {
         files: ['src/*.jade'],
         tasks: ['jade'],
         options: { 
            livereload: true
         }
      },
      
      open: {
         dev: {
          url: 'http://localhost:9001',
          }
       }
      
      
   });
   
   grunt.registerTask('server', [
     'jade',
     'compass',
     'connect',
     'open',
     'watch'
   ]);
   
   grunt.registerTask('default', [ 'server']);

};
