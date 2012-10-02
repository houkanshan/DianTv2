define(['spine', 
        'jquery'
        ], function(Spine, $){
        
    var ArticlesController = Spine.Controller.create();

    ArticlesController.extend({
        tag: 'div',
        className: '',          // abstruct
        parentEl: undefined,         // abstruct
        Model: undefined,            // abstruct  
        ItemController: undefined,   // abstruct
        itemControllerList: undefined, 
        __parent__: ArticlesController,  // no a good idea
        elements: {},
        option: {               // abstruct
            style: {},
            hideStep: 200
        },
        init: function(){
            // init view
            this.render();

            // model init
            this.model = new this.Model;

            // self object init
            this.itemControllerList = [];
            this.isEditable = false;

            // event init
            this.bind('style:update', this.updateItemStyle);
            //this.bind('items:allHide', this.showItems);


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
            this.hideItems()
            .done(this.proxy(this.showItems));
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
        _hideItemByTime: function(){
            var dfd = $.Deferred();

            (function _hideOne(){
                console.log('hide timer: run');
                if(this.itemControllerList.length === 0){
                    dfd.resolve();
                    return;
                }

                var curItem  = this.itemControllerList.pop();
                curItem.destory();
                console.log('hide timer: done');

                // check if item is the last
                if(this.itemControllerList.length === 0){
                    curItem.bind('destoryed', function(){
                        dfd.resolve();
                    });
                    return;
                }

                setTimeout(this.proxy(_hideOne), this.option.hideStep);
            }).call(this);

            return dfd.promise();
        },
        hideItems: function(){
            // effect: hide from bottom
            return this._hideItemByTime();

            // effect: ones hide all
            //this.triggerItems('destory');
            //this.itemControllerList = [];
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
