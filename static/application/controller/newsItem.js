define(['spine', 
        'jquery', 
        'handlebars', 
        'controller/ArticleItem'
        ], function(Spine, $, Handlebars, ArticleItemController) {

    var NewsItemController = Spine.Controller.create();

    NewsItemController.include(ArticleItemController);

    NewsItemController.include({
        name: 'news',
        className: 'news big',
        template: Handlebars.compile($('#newsTmpl').html())
    });
    return NewsItemController;
});
