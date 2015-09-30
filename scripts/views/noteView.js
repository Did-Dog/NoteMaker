define(["backbone",
    "underscore",
    "text!../templates/noteTemplate.html"],
    function (Backbone, _, noteTemplate) {
    var NoteView = Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        render:function(){
            var html = _.template(noteTemplate)(this.model.attributes)

            this.$el.append($(html));
        },
        events:{
        }

    });
    return NoteView;
});