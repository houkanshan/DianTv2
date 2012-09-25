define(['spine', 
        'jquery',
        'model/ArticleItem'
        ], function(Spine, $, ArticleItemModel) {

    var  StoryItemModel = ArticleItemModel.create();
    StoryItemModel.include(ArticleItemModel);

    StoryItemModel.include({
        name: 'story',
        collectionUrl: '/storys',
        singletonUrl: '/story'
    });

    return StoryItemModel;
});

