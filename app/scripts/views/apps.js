/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.AppsView = Backbone.View.extend({

    	events: {
    		'click .addApp':'addNew'
    	},

        template: JST['app/scripts/templates/apps.ejs'],
        initialize: function(options) {
        	this.apps = options.apps;
        	this.apps.bind('reset', this.addAll, this);
            this.listenTo(this.apps, 'add', this.addOne);
            this.listenTo(this.apps, 'reset', this.addAll);
            this.listenTo(this.apps, 'all', this.render);
        },
        render: function() {
        	this.$el.html(this.template());
        	this.addAll();
        	return this;
        },
        addAll: function(apps) {
            this.$el.find('#apps').children().remove();
            _.each(this.apps.models, $.proxy(this, 'addOne'));
        },
        addOne: function (app) {
            console.log(app.id);
	      var view = new KeywordTool.Views.AppView({apps: this.apps, app: app});
	      this.$el.find("#apps").append(view.render().el);
	    },
	    addNew: function(event) {
	    	event.preventDefault();
	    	window.location.hash = 'apps/new';
	    }

    });

})();
