define(["backbone",
    "underscore",
    "text!../templates/noteTemplate.html"],
    function (Backbone, _, noteTemplate) {
    var NoteView = Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        render:function(){
            var html = _.template(noteTemplate)(_.extend(this.model.attributes,{cid:this.model.cid}));

            this.$el.append($(html));
        },
        events:{
        }

    });
    return NoteView;
});