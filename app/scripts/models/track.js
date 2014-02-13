/*global KeywordTool, Backbone*/

KeywordTool.Models = KeywordTool.Models || {};

(function () {
    'use strict';

    KeywordTool.Models.TrackModel = Backbone.Model.extend({

        urlRoot: '/?callback=?',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
