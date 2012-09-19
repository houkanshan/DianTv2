define(['spine', 
        'jquery'
        ], function(Spine, $)){
    var ArticleController = Spine.Controller.create();

    ArticleController.extend({
    });

    ArticleController.include({
        el:'',
        elements: {},
        init: function(){
            //init View
            //init model
        },
        render: function(){
        }
    });

    return ArticleController;
});
