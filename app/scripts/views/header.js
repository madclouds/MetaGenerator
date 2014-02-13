/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.HeaderView = Backbone.View.extend({

    	events: {
    		'click #goToKeywords': 'toKeywords',
    		'click #goToApps': 'toApps',
    		'click #goToHelp': 'toHelp',
            'click .logo' : 'goHome'
    	},

        template: JST['app/scripts/templates/header.ejs'],
        
        render:function(){
        	this.$el.html(this.template());
        	return this;
        },
        setNav: function(elementId) {
            this.$el.find('.nav.nav-pills li').removeClass('active');
            this.$el.find('#'+elementId).addClass('active');
        },
        goHome: function() {
            window.location.hash = '';
        },
        toKeywords: function(event) {
        	event.preventDefault();
        	window.location.hash = "keywords";
        },
        toApps: function(event) {
            
        	event.preventDefault();
        	window.location.hash = "apps";
        },
        toHelp: function(event) {
        	event.preventDefault();
        	window.location.hash = "help";
        }

    });

})();
