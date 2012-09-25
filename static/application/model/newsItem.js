define(['spine', 
        'jquery',
        'model/ArticleItem'
        ], function(Spine, $, ArticleItemModel){

    var NewsItemModel = ArticleItemModel.create();
    NewsItemModel.include(ArticleItemModel);

    NewsItemModel.include({
        name: 'news',
        collectionUrl: '/news',
        singletonUrl: '/new'
    });

    return NewsItemModel;
});
