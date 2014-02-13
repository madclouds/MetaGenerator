/*global KeywordTool, Backbone*/

KeywordTool.Models = KeywordTool.Models || {};

(function () {
    'use strict';

    KeywordTool.Models.AppModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
            console.log('app inited');
        },

        defaults: {
            name: 'New App',
            keywords: '',
            storeName: '',
            storeKeywords: '',
            id: '',
            notes:'',
            description: '',
            version: '',
            track: new KeywordTool.Models.TrackModel()

        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
