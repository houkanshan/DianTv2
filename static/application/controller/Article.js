define(['spine', 
        'jquery'
        ], function(Spine, $)){
    var ArticleController = Spine.Controller.create();

    ArticleController.extend({
        el:'',
        elements: {},
        init: function(){
            //init View
            //init model
        },
        render: function(){
        }
        
        
    });

    ArticleController.include({

    });

    return ArticleController;
}
