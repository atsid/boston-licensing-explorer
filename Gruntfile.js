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
                                console.log('serving ' + req.url);
                                res.setHeader('Access-Control-Allow-Origin', "*");
                                next();
                            },
                            connect.static('./')
                        ]
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('default', ['lint', 'test']);

};
