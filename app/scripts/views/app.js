/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.AppView = Backbone.View.extend({

	    events: {
            'click .delete': 'delete',
            'click h3': 'edit'
        },

        tagName: 'li',
        className: 'well',

        template: JST['app/scripts/templates/app.ejs'],
        initialize: function (options) {
	      // model is passed through
	      this.app  = options.app;
	      this.apps = options.apps;

	    },
	    render: function() {
	    	console.log('at render');
	    	this.$el.html(this.template(this.app.toJSON()));
	    	return this;
	    },
        delete: function (event) {
            event.preventDefault();
            this.app.destroy();
        },
        edit: function() {
            window.location.hash = 'apps/'+this.app.id+'/edit';
        }


    });

})();
