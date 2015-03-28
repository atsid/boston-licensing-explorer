"use strict";

var allTestFiles = [],
    pathToModule = function (path) {
        var fixed = path.replace(/^\/base\//, '').replace(/\.js$/, '');
        return fixed;
    };

Object.keys(window.__karma__.files).forEach(function (file) {
    if (/.*\.test\.js$/.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        'app': '../app',
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min'
    },

    // ask Require.js to load these files (all our tests)
    deps: allTestFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start

});