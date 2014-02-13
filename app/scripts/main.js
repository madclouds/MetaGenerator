/*global KeywordTool, $*/

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = "https://itunes.apple.com/search" + options.url;
    options.crossDomain ={
        crossDomain: true
    };
});


window.KeywordTool = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
       
        // var search = new KeywordTool.Views.SearchView();
        // var header = new KeywordTool.Views.HeaderView();
        // $('#header').html(header.render().el);
        // $('#app').html(search.render().el);
        var apps = new KeywordTool.Collections.AppsCollection();
        apps.fetch();
        var appRouter = new KeywordTool.Routers.RouterRouter({apps: apps});

    }
};

$(document).ready(function () {
    'use strict';
    KeywordTool.init();
});

$.fn.highlight = function(what,spanClass) {
    return this.each(function(){
        var container = this,
            content = container.innerHTML,
            pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
            replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
            highlighted = content.replace(pattern,replaceWith);
        container.innerHTML = highlighted;
    });
}
