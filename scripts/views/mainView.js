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
//                this.model.set("notesView", new NotesView({el:this.$el.find(".notes-container")}));
//                this.listenTo(this.model.get("notesView").collection, 'remove', this.removeNoteFromStore);
//                this.listenTo(this.model.get("notesView").collection, 'change', this.addNoteToStore);
                var notesViewElement = $("<div class='note-group-parent'></div>");
                this.$el.find(".notes-container").prepend(notesViewElement);
                var defaultNotesGroup = new NotesView({el:notesViewElement});
                this.model.get("groups")[defaultNotesGroup.collection.name] = defaultNotesGroup;
                this.listenTo(this.model.get("groups")[defaultNotesGroup.collection.name].collection, 'remove', this.removeNoteFromStore);
                this.listenTo(this.model.get("groups")[defaultNotesGroup.collection.name].collection, 'change', this.addNoteToStore);


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
                var html = _.template(mainTemplate)({});

                this.$el.append($(html));
            },
            events:function(){
                return Modernizr.touch ?
                {
                    "touchstart .create-note": "save",
                    "touchstart .expand-plus": "toggleCreateWindow",
                    "touchstart .create-note-group": "createNewGroup",
                    "touchstart .delete-all": "clearStore"
                }:
                {
                    "click .create-note": "save",
                    "click .expand-plus": "toggleCreateWindow",
                    "click .create-note-group": "createNewGroup",
                    "click .delete-all": "clearStore"
                };
            },
            createNewGroup:function(){
                var notesViewElement = $("<div class='note-group-parent'></div>"),
                newNotesGroup = new NotesView({el:notesViewElement});
                this.$el.find(".notes-container").prepend(notesViewElement);
                newNotesGroup.collection.name = "New Notes ("+_.values(this.model.get("groups")).length+")";
                newNotesGroup.render();
                this.model.get("groups")[newNotesGroup.collection.name] = newNotesGroup;
            },
            clearStore:function(){

//                this.model.get("notesView").collection.reset();
//                this.model.get("notesView").render();
                _.each(_.values(this.model.get("groups")), function(groupView){
                    groupView.collection.reset();
                });
                var notesViewElement = $("<div class='note-group-parent'></div>");
                this.$el.find(".notes-container").prepend(notesViewElement);
                var defaultNotesGroup = new NotesView({el:notesViewElement});
                var object = {};
                object[defaultNotesGroup.name] = defaultNotesGroup

                this.listenTo(defaultNotesGroup.collection, 'remove', this.removeNoteFromStore);
                this.listenTo(defaultNotesGroup.collection, 'change', this.addNoteToStore);
                this.model.set("groups",object);


                this.model.get("store").clear();
            },
            toggleCreateWindow:function(){
                this.save();
            },
            save: function(e){

                var newTitle = "New Note Title";
                var newNoteText = "New Note Text";

//                var note = new Note({title:newTitle,note:newNoteText, group:this.model.get("notesView").collection.name});
//                this.addNoteToStore(note);
//                this.model.get("notesView").collection.add(note);
                var note = new Note({title:newTitle,note:newNoteText, group:"New Notes"});
                this.addNoteToStore(note);
                this.model.get("groups")[note.get("group")].collection.add(note);

                this.$el.find(".new-title-input").val("");
                this.$el.find(".new-note-text").val("");

            },
            loadNotes:function(){
                var store = this.model.get("store")
                for(var i =0;i<store.length;i++){
                    var noteJson = JSON.parse(store.getItem(store.key(i)));
                    var note = new Note({title:noteJson.title,note:noteJson.note, group:noteJson.group});
                    note.cid = store.key(i);
//                    this.model.get("notesView").collection.name = note.get("group");
//                    this.model.get("notesView").collection.add(note);

//                    for(var k =0;k < this.model.get("groups").length ; k++){
//                        if(this.model.get("groups")[k].collection.name == note.get("group")){
//                            this.model.get("groups")[k].collection.add(note);
//                        }
//                    }
                    if(this.model.get("groups")[note.get("group")]){
                        this.model.get("groups")[note.get("group")].collection.add(note);
                    }
                    else{
                        var notesViewElement = $("<div class='note-group-parent'></div>");
                        this.$el.find(".notes-container").prepend(notesViewElement);
                        var newNotesGroup = new NotesView({el:notesViewElement});
                        newNotesGroup.collection.name = note.get("group");
                        newNotesGroup.collection.add(note);
                        this.model.get("groups")[note.get("group")] = newNotesGroup;

                        this.listenTo(newNotesGroup.collection, 'remove', this.removeNoteFromStore);
                        this.listenTo(newNotesGroup.collection, 'change', this.addNoteToStore);
                    }

                }

            }

        });
        return MainView;
    });