define(['spine', 
        'jquery', 
        'model/storyItem'], function(Spine, $, StoryItemModel){

var ArticlesModel = Spine.Class.create();
//ArticlesModel.extend(Spine.Events);


ArticlesModel.extend({
    name: 'article',               //abstruct
    ItemModel: undefined,   //abstruct
    item: undefined,
    init: function(){
        //self property init
        //this.extend(Spine.Events);
        $.extend(this, Spine.Events);
    },
    curIndex: 0, 
    getNext: function(){
        var modelItem = this.get();
        this.curIndex++;
        return modelItem;
    },
    getPrev: function(){
        var modelItem = this.get();
        this.curIndex--;
        return modelItem;
    },
   add: function(){
        var option  = {
            empty: true
        };
        var itemModel = new this.ItemModel({
            option: option
        });
        return itemModel;
    },
    get: function(){
        if(this.curIndex < 0){
            this.curIndex = 0;
            Spine.trigger('msg:one', '到顶了哦, 没有了哦');
        }
        var option = {
            start: this.curIndex,
            count: 1
        };

        //(this.curIndex < 0) && (option.empty = true);

        var itemModel = new this.ItemModel({
            option: option
        });

        // when item fetched, check the item
        // if undefined, reset the curIndex
        itemModel.bind('fetched failed', this.proxy(function(item){
            if(!item){
                this.curIndex = 0;
            }
        }));

        return itemModel;
    }
});

return ArticlesModel;


});
