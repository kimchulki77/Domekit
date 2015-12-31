/**
 * Created by mac on 15. 9. 25..
 */
requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'bs_datetimepicker': {
            deps: ['jquery'],
            exports: 'bs_datetimepicker'
        },
        'jqueryToast': {
            deps: ['jquery'],
            exports: 'jqueryToast'
        },
        'jqueryUI': {
            deps: ['jquery'],
            exports: 'jqueryUI'
        }
    },
    /**
     * HACK:
     * Modified Underscore and Backbone to be AMD compatible (define themselves)
     * since it didn't work properly with the RequireJS shim when optimizing
     */
    paths: {
        'text': 'lib/text',
        'jquery': 'lib/jquery/jquery.min',
        'jqueryToast': 'lib/jquery/jquery.toastmessage',
        'jqueryUI': 'lib/jquery/jquery-ui.min.js',
        'underscore': 'lib/underscore-1.7.0.min',
        'backbone': 'lib/backbone',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'bs_datetimepicker': 'lib/bootstrap/bootstrap-datetimepicker',
        'moment': 'lib/moment',

        'App': 'app',
        'AppView': 'views/App',
        'util': 'util',
        'plugins': 'plugins',
        //'Router': 'router',
        'SupplySettingCollection': 'collections/SupplySetting',
        'SupplySettingModel': 'models/SupplySetting',
        'SupplySettingView': 'views/SupplySetting',

        'SupplySectionView': 'views/SupplySection'
    }
});

