define(["backbone",
    "underscore",
    "../models/note"
], function(Backbone, _, Note){

    var NoteCollection = Backbone.Collection.extend({
        model: Note,
        name:"New Notes"
    });

    return NoteCollection;

});
