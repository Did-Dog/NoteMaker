define(["backbone",
    "underscore",
    "../collections/noteCollection"
], function(Backbone, _, NoteCollection){

    var mainModel = Backbone.Model.extend({
        defaults:{
            store : {},
            groups : {"New Notes" : new NoteCollection()}
        }
    });

    return mainModel;

});