define(["backbone",
    "underscore",
    "../models/note"
], function(Backbone, _, Note){

    var NoteCollection = Backbone.Collection.extend({
        model: Note
    });

    return NoteCollection;

});
