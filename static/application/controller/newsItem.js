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
        init: function(){
            // FIXME: rewrite inhert method
            this.__parent__.init.call(this);

            this.template = Handlebars.compile($('#newsTmpl').html());
        }
    });
    return NewsItemController;
});
