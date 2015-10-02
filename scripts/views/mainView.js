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
                this.model.set("notesView", new NotesView({el:this.$el.find(".notes-container")}));
                this.listenTo(this.model.get("notesView").collection, 'remove', this.removeNoteFromStore);
                this.listenTo(this.model.get("notesView").collection, 'change', this.addNoteToStore);


                if(this.model.get("store").length>0){
                    this.loadNotes();
                }
            },
            addNoteToStore: function(note){
                this.model.get("store").setItem(note.cid,JSON.stringify(note.toJSON()));
            },
            removeNoteFromStore: function(note){
                this.model.get("store").removeItem(note.cid);
            },
            render:function(){
                var html = _.template(mainTemplate)({})

                this.$el.append($(html));
            },
            events:function(){
                return Modernizr.touch ?
                {
                    "touchstart .create-note": "save",
                    "touchstart .expand-plus": "toggleCreateWindow",
                    "touchstart .delete-all": "clearStore"
                }:
                {
                    "click .create-note": "save",
                    "click .expand-plus": "toggleCreateWindow",
                    "click .delete-all": "clearStore"
                };
            },
            clearStore:function(){

                this.model.get("notesView").collection.reset();
                this.model.get("notesView").render();
                this.model.get("store").clear();
            },
            toggleCreateWindow:function(){
                this.save();
            },
            save: function(e){

                var newTitle = "New Note Title";
                var newNoteText = "New Note Text";

                var note = new Note({title:newTitle,note:newNoteText});
                this.addNoteToStore(note);
                this.model.get("notesView").collection.add(note);

                this.$el.find(".new-title-input").val("");
                this.$el.find(".new-note-text").val("");

            },
            loadNotes:function(){
                var store = this.model.get("store")
                for(var i =0;i<store.length;i++){
                    var noteJson = JSON.parse(store.getItem(store.key(i)));
                    var note = new Note({title:noteJson.title,note:noteJson.note});
                    this.model.get("notesView").collection.add(note);
                }

            }

        });
        return MainView;
    });