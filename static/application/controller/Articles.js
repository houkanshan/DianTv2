define(['spine', 
        'jquery'
        ], function(Spine, $){
        
    var ArticlesController = Spine.Controller.create();

    // TODO: no-use, will not run
    ArticlesController.include({
        init: function(){
            // init view
            this.render();

            // model init
            this.model = new this.Model;

            // event init
            this.bind('style:update', this.updateItemStyle);

            // do the first fetch, now start
            this.goNext();
        }
    });

    ArticlesController.extend({
        tag: 'div',
        className: '',          // abstruct
        parentEl: null,         // abstruct
        Model: null,            // abstruct  
        ItemController: null,   // abstruct
        itemControllerList: [], 
        elements: {},
        option: {               // abstruct
            style: {}          
        },
        init: function(){
            // init view
            this.render();

            // model init
            this.model = new this.Model;

            // event init
            this.bind('style:update', this.updateItemStyle);

            // do the first fetch, now start
            this.goNext();
        },
        // util
        triggerItems: function(){
            var args = arguments.length ? [].slice.call(arguments):[];
            for(var i = this.itemControllerList.length; i--;){
                this.itemControllerList[i].trigger.apply(this.itemControllerList[i], args);
            }
        },
        /**
         * --self contorl
         */
        render: function(){
            this.el.appendTo(this.parentEl);
        },
        goNext: function(){
            this.hideItems();
            this.showItems();
        },
        /**
         * --items control
         */
        // update the style of each story
        updateItemStyle: function(newOpt){
            $.extend(this.option.style, newOpt);
            this.triggerItems('updateStyle', newOpt);
        },
        // show control: remove items and destory elem 
        hideItems: function(){
            this.triggerItems('destory');
            this.itemControllerList = [];
        },
        // show control: fetch items and render elem
        showItems: function(){
            //the show animate is defined here
            for(var i = this.option.itemControllerListLength; i--;){
                var itemModel = this.model.getNext();
                var itemController = new this.ItemController({
                    model: itemModel,
                    style: this.option.style
                });
                this.el.append(itemController.el);

                this.itemControllerList.push(itemController);
            }
        }
    });

    return ArticlesController;
});
