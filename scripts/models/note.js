define(["backbone",
    "underscore"
], function(Backbone, _){

    var Note = Backbone.Model.extend({
        defaults:{
            title:"Title",
            note:"Note to Self!"
        }
    });

    return Note;

});