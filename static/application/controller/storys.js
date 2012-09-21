define(['spine', 
        'jquery', 
        'app/config',
        'model/storys', 
        'controller/storyItem'
        ], function(Spine, $,  config, StorysModel, StoryItemController){

    var StorysController = Spine.Controller.create();

    StorysController.extend({
        // class
    });

    StorysController.include({
        // inhered ?
        tag: 'div',
        className: 'aside',
        parentEl: $('.content'),
        itemList: [],               // object entity (storyItemController)
        elements: {},
        option: {
            // public, XXX
            storysNum: config.storysNum,
            style: {}
        },
        init: function(){
            // init view
            this.render();

            // model init
            this.model = new StorysModel;

            // event init
            this.bind('style:update', this.updateItemStyle);

            // do the first fetch, now start
            this.goNext();
        },
        // util
        triggerItems: function(){
            var args = arguments.length ? [].slice.call(arguments):[];
            for(var i = this.itemList.length; i--;){
                this.itemList[i].trigger.apply(this.itemList[i], args);
            }
        },
        /**
         * ---------self contorl
         */
        render: function(){
            this.el.appendTo(this.parentEl);
        },
        goNext: function(){
            this.hideItems();
            this.showItems();
        },
        /**
         * ---------items control
         */
        // update the style of each story
        updateItemStyle: function(newOpt){
            $.extend(this.option.style, newOpt);
            this.triggerItems('updateStyle', newOpt);
        },
        // show control: remove items and destory elem 
        hideItems: function(){
            this.triggerItems('destory');
            this.itemList = [];
        },
        // show control: fetch items and render elem
        showItems: function(){
            //the show animate is defined here
            for(var i = this.option.storysNum; i--;){
                var itemModel = this.model.getNext();
                var itemController = new StoryItemController({
                    model: itemModel,
                    style: this.option.style
                });
                this.el.append(itemController.el);

                this.itemList.push(itemController);
            }
        }
    });

    return StorysController;
});
