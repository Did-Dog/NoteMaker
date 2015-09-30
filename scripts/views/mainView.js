define(["backbone",
    "underscore",
    "../models/note",
    "../views/notesView",
    "text!../templates/mainTemplate.html"],
    function (Backbone, _, Note, NotesView,  mainTemplate) {
        var MainView = Backbone.View.extend({
            initialize:function(){
                this.render();
                this.model.set("store", window.localStorage);
                this.model.set("notes", new NotesView({el:this.$el.find(".note-container")}));
            },
            render:function(){
                var html = _.template(mainTemplate)({})

                this.$el.append($(html));
            },
            events:{
                "click .create-note": "save"
            },
            save: function(e){
                var newAuthor = this.$el.find(".new-author-input").val();
                var newNoteText = this.$el.find(".new-note-text").val();

                var note = new Note({author:newAuthor,note:newNoteText});
                this.model.get("store").setItem(note.cid + "_" + new Date().getTime(),JSON.stringify(note.toJSON()));
                this.model.get("notes").collection.add(note);
            }

        });
        return MainView;
    });