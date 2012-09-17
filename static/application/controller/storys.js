define(['spine', 'jquery', 'model'], function(Spine, $, Storys){
    var StoryController = Spine.Controller.create();

    StoryController.extend({
        // public ? inhered ?
        el: $('.aside'),
        elements: {},
        init: function(){
            this.model = new Storys;
        },
        renderAll: function(){
        },
        renderOne: function(story){
            //this.templem
        },
        fetch: function(start, count){
        }
    });

    StoryController.include({
        // private
    });

    return StoryController;
});
