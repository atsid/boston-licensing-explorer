requirejs.config({
    'baseUrl': 'js/lib',
    'paths': {
        'app': '../app',
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min'
    }
});

requirejs(['app/main'], function (app) {
    app.initialize();
});
