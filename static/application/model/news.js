define(['spine', 
        'jquery',
        'model/Articles',
        'model/newsItem'
        ], function(Spine, $, ArticlesModel, NewsItemModel){

    var NewsModel = ArticlesModel.create();
    NewsModel.include(ArticlesModel);

    NewsModel.include({
        name: 'news',
        ItemModel: NewsItemModel,
        init: function(){
        }
    });

    return NewsModel;
});

