define(["jquery",
    "underscore",
    "backbone",
    "scripts/models/Note",
    "scripts/views/NoteView"
],
    function (jQuery, _, Backbone, Note, NoteView) {
        var startView;
        var $ = jQuery;
        var initialize = function(){
            startView = new NoteView({model:new Note(), el:$("body")});
        }
        return {initialize:initialize};

});