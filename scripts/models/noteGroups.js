define(["backbone",
    "underscore",
    "scripts/collections/noteCollection"
], function(Backbone, _, NoteCollection){

    var NoteGroups = Backbone.Model.extend({
        defaults:{
           groups : new NoteCollection()
        }
    });

    return NoteGroups;

});