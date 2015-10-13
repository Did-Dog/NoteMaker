define(["backbone",
    "underscore"
], function(Backbone, _){

    var Note = Backbone.Model.extend({
        defaults:{
            group:"none",
            title:"Title",
            note:"Note to Self!"
        }
    });

    return Note;

});