define(['spine', 'jquery'], function(Spine, $){
    //Spine doesn't support AMD, so let it be a Global var
    var DianTv = Spine.Controller.create({
        el: $('body'),
        elements: {
        },
        init: function(){
            // models init
            // FIXME:current no Global Models

            // controllers init
            require(['app/controller/storys', 
                'app/controller/news'], function(Storys, News){
                this.storys = Storys.init();
                this.news = News.init();
            });
            // page init
            // ...view init
        }
    });

    return DianTv;
});
