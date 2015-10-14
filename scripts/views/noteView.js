define(["backbone",
    "underscore",
    "text!../templates/noteTemplate.html"],
    function (Backbone, _, noteTemplate) {
    var NoteView = Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        handleDragStart :function(e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/json', JSON.stringify(this.model));
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
            this.$el.find(".note-container[data-id=" + this.model.cid + "]").get(0).addEventListener("dragstart", self.handleDragStart.bind(this), false);


            this.$el.find(".note-container[data-id="+this.model.cid+"]").hover(
                function(e){
                },
                function(e){
                    $(e.target).find(".edit-note-title").hide();
                    $(e.target).find(".delete-note").hide();

                });

            this.$el.find(".note-container[data-id="+this.model.cid+"]").mouseenter(function(e){
                self.$el.find(".note-container[data-id="+self.model.cid+"] .edit-note-title").show();
                self.$el.find(".note-container[data-id="+self.model.cid+"] .delete-note").show();
            });
            this.$el.find(".note-container[data-id="+this.model.cid+"]").mouseleave(function(e){
                self.$el.find(".note-container[data-id="+self.model.cid+"] .edit-note-title").hide();
                self.$el.find(".note-container[data-id="+self.model.cid+"] .delete-note").hide();
            });

        },
        events:{
            "blur title-label": "titleChange",
            "blur note-text": "textChange",
            "click .edit-note-title": "toggleTitleEditable"
        },
        toggleTitleEditable:function(e){
            var inverse = !(this.$el.find(".note-container[data-id="+this.model.cid+"] .title-label").attr("contenteditable") == "true");
            this.$el.find(".note-container[data-id="+this.model.cid+"] .title-label").attr("contenteditable", inverse);
        },
        titleChange:function(e){
            var newTitle = this.$el.find("[data-id=" + this.model.cid + "] .title-label").html();
            this.model.set("title", newTitle);
        },
        textChange:function(e){
            var newText = this.$el.find("[data-id=" + this.model.cid + "] .note-text").html();
            this.model.set("note", newText);
        }

    });
    return NoteView;
});