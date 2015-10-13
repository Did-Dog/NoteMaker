define(["backbone",
    "underscore",
    "text!../templates/noteTemplate.html"],
    function (Backbone, _, noteTemplate) {
        var NoteGroupsView = Backbone.View.extend({
            initialize:function(){
                this.render();
            },
            render:function(){
                var html;
                _.each(this.collection, function(noteGroup){

                })

            },
            events:{
                "blur title-label": "titleChange",
                "blur note-text": "textChange"
            }
        });
        return NoteGroupsView;
    });