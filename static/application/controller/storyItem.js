// will only bind event of view
define(['spine', 
        'jquery', 
        'handlebars', 
        'controller/ArticleItem'
        ], function(Spine, $, Handlebars, ArticleItemController) {

    var StoryItemController = Spine.Controller.create();
    StoryItemController.include(ArticleItemController);

    StoryItemController.include({
        name: 'story',
        className: 'story tiny',
        template: Handlebars.compile($('#storyTmpl').html())
    });
    return StoryItemController;
});
