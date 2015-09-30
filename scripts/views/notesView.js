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
                this.listenTo( this.collection, 'add', this.renderBook );
            },

            render: function() {
                this.$el.empty();

                this.collection.each(function( note ){
                    this.renderBook( note );
                }, this);
            },

            renderBook: function ( note ) {
                var noteView = new NoteView ({
                    el:this.$el,
                    model: note
                });
            }

        });
        return MainView;
    });