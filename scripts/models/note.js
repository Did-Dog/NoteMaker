define(["backbone"
], function(Backbone){

    var Note = Backbone.Model.extend({
        defaults:{
            id:-1,
            author:"J.R.R. Tolkien",
            note:"Note to Self!"
        }
    });

    return Note;

});