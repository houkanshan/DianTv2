define(['spine', 'jquery'], function(Spine, $){
    var NewsController = Spine.Controller.create();

    NewsController.extend({
        // public ? protected ?
    });

    NewsController.include({
        el: $('<div>').addClass('main'),
        elements: {},
        init: function(){

        },
        goNext: function(){
        }
    });
    //temp
    //


    return NewsController;
});
