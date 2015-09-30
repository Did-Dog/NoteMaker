define(["jquery",
    "underscore",
    "backbone",
    "scripts/models/note",
    "scripts/models/mainModel",
    "scripts/views/mainView"
],
    function (jQuery, _, Backbone, Note, MainModel, MainView) {
        var startView;
        var $ = jQuery;
        var initialize = function(){
            startView = new MainView({model:new MainModel(), el:$("body")});
        }
        return {initialize:initialize};

});