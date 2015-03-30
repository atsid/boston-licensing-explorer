"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            src: ['js/**/*.js', '!node_modules/**/*.*', '!js/lib/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        watch: {
            js: {
                files: ['**/*.js', '!**/node_modules/**'],
                tasks: ['lint', 'test']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            function(req, res, next) {
                                res.setHeader('Access-Control-Allow-Origin', "*");
                                next();
                            },
                            connect.static('./')
                        ]
                    }
                }
            }
        },
        'gh-pages': {
            options: {
              base: '',
              message: 'Publish from master',
              add: true //won't remove remote files, so we can put our google analytics on the branch
            },
            src: ['**']
          }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('publish', ['gh-pages']);
    grunt.registerTask('default', ['lint', 'test']);

};
