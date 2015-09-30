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
                this.model.set("notesView", new NotesView({el:this.$el.find(".note-container")}));
                if(this.model.get("store").length>0){
                    this.loadNotes();
                }
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
                this.model.get("notesView").collection.add(note);
            },
            loadNotes:function(){
                var store = this.model.get("store")
                for(var i =0;i<store.length;i++){
                    var noteJson = JSON.parse(store.getItem(store.key(i)));
                    var note = new Note({author:noteJson.author,note:noteJson.note});
                    this.model.get("notesView").collection.add(note);
                }

            }

        });
        return MainView;
    });