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
        parentEl: $('.content'),
        Model: StorysModel,
        ItemController: StoryItemController,
        option: {
            style: {},
            itemControllerListLength: config.storysNum,
            hideStep: config.hideStep
        }
        /*init: function(){
            debugger;
            console.log('chile run');
        }*/
    });
    return StorysController;
});
