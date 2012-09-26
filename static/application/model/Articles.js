define(['spine', 
        'jquery', 
        'model/storyItem'], function(Spine, $, StoryItemModel){

    var ArticlesModel = Spine.Class.create();
    ArticlesModel.extend(Spine.Events);

    ArticlesModel.extend({
        name: '',               //abstruct
        ItemModel: undefined,   //abstruct
        item: undefined,
        init: function(){
        },
        curIndex: 0, 
        //TODO: deal with boundary 
        getNext: function(){
            var itemModel = new this.ItemModel({
                option: {
                    start: this.curIndex++,
                    count: 1
                }
            });

            // when item fetched, check the item
            // if undefined, reset the curIndex
            itemModel.bind('fetched', this.proxy(function(item){
                if(!item){
                    this.curIndex = 0;
                }
            }));

            return itemModel;
        }
    });

    return ArticlesModel;
});
