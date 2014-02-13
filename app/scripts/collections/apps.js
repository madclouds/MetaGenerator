/*global KeywordTool, Backbone*/

KeywordTool.Collections = KeywordTool.Collections || {};

(function () {
    'use strict';

    KeywordTool.Collections.AppsCollection = Backbone.Collection.extend({

		
        model: KeywordTool.Models.AppModel,

        localStorage: new Backbone.LocalStorage("apps-list")


    });

})();
