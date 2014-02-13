/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.HelpView = Backbone.View.extend({

        template: JST['app/scripts/templates/help.ejs'],
        render: function() {
        	this.$el.html(this.template());
        	return this;
        }

    });

})();
