define(['spine', 
        'jquery', 
        'model/Articles',
        'model/storyItem'
        ], function(Spine, $, ArticlesModel, StoryItemModel){

    var StorysModel = ArticlesModel.create();
    StorysModel.include(ArticlesModel);

    StorysModel.include({
        name: 'storys',
        ItemModel: StoryItemModel
    });

    return StorysModel;
});
