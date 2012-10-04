define(['spine', 
        'jquery', 
        'app/config',
        'controller/Articles',
        'model/storys', 
        'controller/storyItem'
        ], function(Spine, $,  config, 
            ArticlesController, StorysModel, StoryItemController){

    //var StorysController = Spine.Controller.create();
    var StorysController = ArticlesController.create();
    StorysController.include(ArticlesController);

    StorysController.include({
        name: 'storys',
        className: 'aside',
        parentEl: $('article'),
        Model: StorysModel,
        ItemController: StoryItemController,
        option: {
            style: {},
            itemControllerListLength: config.storysNum,
            hideStep: config.hideStep
        },
        init: function(){
            this.__parent__.init.call(this);

            this.bind('editable', function(isEditable){
                this.itemOption.isEditable = isEditable;
                this.triggerItems('editable', isEditable);
            });

            Spine.bind('storys:add', this.proxy(this.add));

        },
        add: function(){
            //TODO: finish add
            var itemModel = this.model.add();

            var option = {
                model: itemModel,
                style: this.option.style
            };
            $.extend(option, this.itemOption);
            
            var itemController = new this.ItemController(option);
            itemController.fetch();

            this.el.prepend(itemController.el);

            this.itemControllerList.unshift(itemController);

        }
    });
    return StorysController;
});
