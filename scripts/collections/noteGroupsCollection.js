define(["backbone",
    "underscore",
    "../models/noteGroups"
], function(Backbone, _, NoteGroups){

    var NoteGroupsCollection = Backbone.Collection.extend({
        model: NoteGroups
    });

    return NoteGroupsCollection;

});
