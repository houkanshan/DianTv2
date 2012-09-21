define(['spine', 
        'jquery', 
        'model/storyItem'], function(Spine, $, StoryItemModel){
    var StorysModel = Spine.Class.create();
    StorysModel.include(Spine.Events);
    StorysModel.include({
        init: function(){
        },
        curIndex: 0, 
        getNext: function(){
            return new StoryItemModel({
                option: {
                    start: this.curIndex,
                    count: 1
                }
            });
        },
        // base method
        read: function(option){
            // TODO
        },
        create: function(){
            // TODO
        },
        update: function(){
            // TODO
        },
        del: function(){
            // TODO
        },
        get: function(){
            // TODO
        },
        post: function(){
            // TODO
        }
    });

    return StorysModel;
});
