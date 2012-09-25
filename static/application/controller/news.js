define(['spine', 
        'jquery',
        'app/config',
        'controller/Articles',
        'model/news',
        'controller/newsItem'
        ], function(Spine, $, config,
            ArticlesController, NewsModel, NewsItemController){
    var NewsController = Spine.Controller.create();

    var NewsController = ArticlesController.create();
    NewsController.include(ArticlesController);

    NewsController.include({
        className: 'main',
        parentEl: $('.content'),
        Model: NewsModel,
        ItemController: NewsItemController,
        option: {
            style: {},
            itemControllerListLength: config.newsNum
        }
    });

    return NewsController;
});
