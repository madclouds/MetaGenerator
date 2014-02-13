/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.KeywordsView = Backbone.View.extend({

        template: JST['app/scripts/templates/keywords.ejs'],
        render: function(){
        	var keywords = new KeywordTool.Views.SearchView();
        	this.$el.html(keywords.render().el);
        	return this;
        }

    });

})();
