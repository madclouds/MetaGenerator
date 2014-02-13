/*global KeywordTool, Backbone, JST*/

KeywordTool.Views = KeywordTool.Views || {};

(function () {
    'use strict';

    KeywordTool.Views.SearchView = Backbone.View.extend({

    	events: {
    		'keyup input#keywords': 'searchForKeywords',
    		'submit form': 'searchForKeywords',
    		'click .addKeywordButton': 'addKeyword',
            'click .addNameButton': 'addName',
            'click .addApp': 'addApp',
            'submit .addMetaToApp': 'addMetaToApp',
    		'click span.removeWord': 'removeWord',
            'keyup input#keywordList': 'updateCount',
    		'mouseenter #keywordList': 'selectKeywords'
    	},
        template: JST['app/scripts/templates/search.ejs'],
        initialize: function(options) {
            this.searchTerm = '';
            this.apps = options.apps;
            this.app = options.app;
        },
        
        render: function () {
        	this.$el.html(this.template());
            this.$el.find('#keywords').focus();
            var list = this.$el.find('.appsList');
            console.log(this.apps.length);
            this.apps.map(function(app, index){
                console.log();
                list.append('<option value='+index+'>'+app.get('name')+'</option>');
            });
            
        	return this;
        },
        searchForKeywords: function(event) {
        	event.preventDefault();
            var input = $('input').val();
            if (input != this.searchTerm) {
            	this.searchTerm = input;
            	console.log('searching for: '+this.searchTerm);
            	$('.results').empty();
            	var track = new KeywordTool.Models.TrackModel({});
                var that = this;
                track.fetch({ data: {term: this.searchTerm, entity: 'software'},
                    success: (function(data){
                        that.tracks = data.attributes.results;
                    	that.renderTracks(that.tracks);
                    }),
                    fail: (function(data){
                        // console.error(data);
                    })
                });
            };
        },
        renderTracks: function(tracks) {
        	var keywords = new Array();
        	$('.keywordResults').removeClass('hide');
        	$('table#tracks').empty();
        	tracks.map(function(track, index){
        		$('table#tracks').append('<tr><td><a href="'+track.trackViewUrl+'" target="_blank">'+track.trackName+'</a></td>'+
                    '<td><button type="button" class="btn btn-default addApp" id='+index+'>Add Add</</td></tr>');
        		var wordArray = track.trackName.split(' ');
        		wordArray.forEach(function(word){
					keywords.push(word);
        		});

        		if($('#descriptions').attr('checked')) {
	        		var dscriptionArray = track.description.split(' ');
	        		dscriptionArray.forEach(function(word){
						keywords.push(word);
	        		});
        		}

        		
        	});
        	this.renderRanks(keywords);


        },
        renderRanks: function(keywords){
        	// keywords = keywords.sort();
        	var counts = {};

			keywords.forEach(function(x) { counts[x.toLowerCase()] = (counts[x.toLowerCase()] || 0)+1; });

			this.keys = [];
			for (var prop in counts) {
				this.keys.push({name: prop, count:counts[prop]});
			};
			this.keys.sort(function(a,b){ return a.count - b.count})
			this.keys.sort();
			this.keys.reverse();
        	$('table#ranks').empty();

        	for (var i = 0; i < this.keys.length; i++) {
        		$('table#ranks').append('<tr><td style="width: 70px;"><button class="btn btn-default btn-sm addNameButton" id='+i+'>Add Name</button></td><td><button class="btn btn-default btn-sm addKeywordButton" id='+i+'>Add Keyword</button></td><td>'+this.keys[i].name+'</td><td>'+this.keys[i].count+'</td></tr>');
        	}
        },
        addKeyword: function(event) {
            event.preventDefault();
            $('#keywordListContainer').removeClass('hide');
            var name = this.keys[event.target.id].name;
            var htmlString = $('#keywordList').val();
            if ($('#keywordList').val().length > 0 && $('#keywordList').val().slice(-1) != ',') {
                $('#keywordList').val($('#keywordList').val()+",")
            };
            if (htmlString.indexOf(name) < 0 && name.length > 0) {
                $('#keywordList').val($('#keywordList').val()+name);
            }
            this.updateCount();
            
        },
        addApp: function(event) {
            event.preventDefault();
            var track = this.tracks[event.target.id];
            var newApp = new KeywordTool.Models.AppModel({track:track});
            newApp.set({
                id: track.trackId,
                name: track.trackName
            });
            this.apps.create(newApp);
            $(event.target).addClass('btn-success').html('Added');
            // window.location.hash = 'apps/'+newApp.id+'/edit';

            
            
        },
        updateCount: function() {
            var totalLength = $('#keywordList').val().length
            $('#charCount').html(totalLength);
            $('#charLeft').html((100-totalLength));
        },
        addName: function(event) {
            event.preventDefault();
            $('#keywordListContainer').removeClass('hide');
            var name = this.keys[event.target.id].name;
            var htmlString = $('#nameList').val();
            if ($('#nameList').val().length > 0 && $('#nameList').val().slice(-1) != ',') {
                $('#nameList').val($('#nameList').val()+" ");
            };
            if (htmlString.indexOf(name) < 0 && name.length > 0) {
                $('#nameList').val($('#nameList').val()+name);
            }
        },
        removeWord: function(event) {

        	var removeWord = $(event.target).remove();

        },
        selectKeywords: function() {
        	$('#keywordList').highlight();
        },
        addMetaToApp: function() {

            var index = this.$el.find('.appsList option:selected').attr('value');
            //New App
            if( !index) { 
                console.log('addmetatoapp');
                var newApp = new KeywordTool.Models.AppModel();
                newApp.set({
                    id: this.apps.length,
                    keywords: $('#keywordList').val(),
                    storeName: $('#nameList').val(),
                    name: $('#nameList').val()
                });
                this.apps.create(newApp);
                // app.save();
                window.location.hash = 'apps/'+newApp.get('id')+'/edit';
            } else {
                var app = this.apps.models[index];
                app.set('keywords', $('#keywordList').val());
                app.set('storeName', $('#nameList').val());
                // app.save();
                window.location.hash = 'apps/'+app.get('id')+'/edit';
            }
            
        }


    });

})();
