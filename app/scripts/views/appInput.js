/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.AppInputView = Backbone.View.extend({
        className: 'row',
    	events: {
            'keypress input' : 'checkEnter',
    		'click .save': 'save',
    		'click .cancel': 'cancel'
    	},
        template: JST['app/scripts/templates/appInput.ejs'],
        initialize: function(options) {
        	this.apps = options.apps;
            this.isEditing = options.isEditing;
        	this.app = options.app;
            console.log(this.app);
        },
        render: function() {
        	this.$el.html(this.template(this.app.toJSON()));
        	return this;
        },
        checkEnter: function(event) {
        // Enter key pressed?
         if ( event.which === 13 ) { 
            this.save(event);
          }

        },
        save: function(event) {
        	event.stopPropagation();
        	event.preventDefault();
        	
            console.log('SAVED');
        var id = (this.$el.find('input#appId').val() || Math.floor(Math.random() * 100) + 1);
        console.log(id);
    	this.app.set({
	        name: this.$el.find('input#appName').val(),
	        keywords: this.$el.find('input#keywordList').val(),
            storeName: this.$el.find('input#appStoreName').val(),
            description: this.$el.find('textarea#description').val(),
            notes: this.$el.find('textarea#notes').val(),
	        id: id
	      });

	    if (!this.isEditing && this.app.isValid()){
	        // add it to the collection
	        this.apps.create(this.app);
	        // this.note.save();
	        // redirect back to the index
	        
	      } else {
            this.app.save();
          }

          window.location.hash = "apps";
	      
        },
        cancel: function(event) {
        	event.preventDefault();
        	window.location.hash = 'apps';
        }

    });

})();
