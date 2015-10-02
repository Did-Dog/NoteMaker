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
            var self = this;
            this.$el.append($(html));
            this.$el.find(".note-container[data-id="+this.model.cid+"]").toggle("slide");
            this.$el.find("[data-id=" + this.model.cid + "] .title-label").get(0).addEventListener("input", function(e){
                self.titleChange();
            }, false);

            this.$el.find("[data-id=" + this.model.cid + "] .note-text").get(0).addEventListener("input", function(e){
                    self.textChange();
            }, false);
        },
        events:{
            "blur title-label": "titleChange",
            "blur note-text": "textChange"
        },
        titleChange:function(e){
            var newTitle = this.$el.find("[data-id=" + this.model.cid + "] .title-label").html();
            this.model.set("title", newTitle);
        },
        textChange:function(e){
            var newText = this.$el.find("[data-id=" + this.model.cid + "] .note-text").html     ();
            this.model.set("note", newText);
        }

    });
    return NoteView;
});