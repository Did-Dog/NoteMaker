define(["backbone",
    "underscore",
    "../models/note",
    "../views/noteView",
    "../collections/noteCollection"],
    function (Backbone, _, Note, NoteView, NoteCollection) {
        var MainView = Backbone.View.extend({
            initialize: function () {
                this.collection = new NoteCollection();
                this.render();
                this.listenTo( this.collection, 'add', this.renderNote   );
            },
            events:{
                "click .delete-note":"deleteNote"
            },
            deleteNote:function(e){
                var self = this;
                var noteId = $(e.target).parents(".note-container").data("id");
                this.collection.each(function(note){
                    if(note !== undefined && note.cid === noteId){
                        self.collection.remove(note);
                        self.render();

                    }
                })
            },

            render: function() {
                this.$el.empty();

                this.collection.each(function( note ){
                    this.renderNote( note );
                }, this);
            },

            renderNote: function ( note ) {
                var noteView = new NoteView ({
                    el:this.$el,
                    model: note
                });
            }

        });
        return MainView;
    });