/*global KeywordTool, Backbone*/

KeywordTool.Routers = KeywordTool.Routers || {};

(function () {
    'use strict';

    KeywordTool.Routers.RouterRouter = Backbone.Router.extend({
    	routes: {
    		'': 'keywords',
    		'keywords': 'keywords',
    		'apps': 'appList',
            'apps/new': 'appNew',
            'apps/:id/edit': 'appEdit',
    		'help': 'help'
    	},
    	initialize: function(options) {
    		this.header = new KeywordTool.Views.HeaderView();
	        $('#header').html(this.header.render().el);

          this.apps = options.apps;
          
          // this is debug only to demonstrate how the backbone collection / models work
          this.apps.bind('reset', this.updateApps, this);
          this.apps.bind('add', this.updateApps, this);
          this.apps.bind('remove', this.updateApps, this);

          Backbone.history.start();
          // this.keywords();

    	},
    	keywords: function() {
        this.header.setNav('keywordsNav');
        this.currentView = new KeywordTool.Views.SearchView({apps: this.apps});
    		$('#primary-content').html(this.currentView.render().el);
    	},
    	appList: function() {
          this.header.setNav('appsNav');
          this.currentView = new KeywordTool.Views.AppsView({apps: this.apps});
          $('#primary-content').html(this.currentView.render().el);
      },
      appNew: function() {
          this.header.setNav('appsNav');
          this.currentView = new KeywordTool.Views.AppInputView({apps: this.apps, app: new KeywordTool.Models.AppModel()});
          $('#primary-content').html(this.currentView.render().el);
      },
    	help: function() {
        this.header.setNav('helpNav');
    		console.log('at help');
    		this.currentView = new KeywordTool.Views.HelpView({});
    		$('#primary-content').html(this.currentView.render().el);
    	},
      appEdit: function (id) {
        this.header.setNav('appsNav');
        var app = this.apps.get(id);
        this.currentView = new KeywordTool.Views.AppInputView({app: app, isEditing: true});
        $('#primary-content').html(this.currentView.render().el);
      }
    });

})();
