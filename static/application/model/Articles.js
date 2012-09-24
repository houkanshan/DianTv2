define(['spine', 
        'jquery', 
        'model/storyItem'], function(Spine, $, StoryItemModel){

    var ArticlesModel = Spine.Class.create();
    ArticlesModel.extend(Spine.Events);

    ArticlesModel.extend({
        name: '',               //abstruct
        ItemModel: undefined,   //abstruct
        init: function(){
        },
        curIndex: 0, 
        //TODO: deal with boundary 
        getNext: function(){
            return new this.ItemModel({
                option: {
                    start: this.curIndex++,
                    count: 1
                }
            });
        },
    });

    return ArticlesModel;
});
