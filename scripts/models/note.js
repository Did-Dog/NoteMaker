define(["backbone",
    "underscore"
], function(Backbone, _){

    var Note = Backbone.Model.extend({
        defaults:{
            author:"J.R.R. Tolkien",
            note:"Note to Self!"
        }
    });

    return Note;

});