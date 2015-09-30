define(["backbone",
    "underscore",
    "../collections/noteCollection"
], function(Backbone, _, NoteCollection){

    var mainModel = Backbone.Model.extend({
        defaults:{
            store : {},
            notes : new NoteCollection()
        }
    });

    return mainModel;

});