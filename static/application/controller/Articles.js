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
        itemOption: {},
        init: function(){
            // init view
            this.render();

            // model init
            this.model = new this.Model;

            // self object init
            this.itemControllerList = [];

            // event init
            this.bind('style:update', this.updateItemStyle);
            // api bind
            Spine.bind('all:next', this.proxy(this.goNext));
            Spine.bind('all:prev', this.proxy(this.goPrev));
            Spine.bind('all:goto', this.proxy(this.go));


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
        go: function(index){
            this.hideItems()
            .done(this.proxy(function(){
                this.model.curIndex = 0;
                this.showItems('getNext');
            }))
        },
        goPrev: function(){
            this.hideItems()
            .done(this.proxy(this.showPrevItems));
        },
        goNext: function(){
            this.hideItems()
            .done(this.proxy(this.showNextItems));
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
        showItems: function(iterName){
            //the show animate is defined here
            for(var i = this.option.itemControllerListLength; i--;){
                // get item's model
                var itemModel = this.model[iterName]();

                // get item's controller
                var option = {
                    model: itemModel,
                    style: this.option.style
                };
                $.extend(option, this.itemOption);
                var itemController = new this.ItemController(option);
                itemController.fetch();

                this.el.append(itemController.el);

                this.itemControllerList.push(itemController);
            }
        },
        showPrevItems: function(){
            // XXX: this module care of Index or NOT ??!!
            this.model.curIndex -= 2 * this.option.itemControllerListLength;
            this.showItems('getNext');
        },
        showNextItems: function(){
            this.showItems('getNext');
        }
    });

    return ArticlesController;
});
