jQuery(function($){
    Diantv = Spine.Controller.create({
        el: $('body'),
        elements: {
        },
        init: function(){
            // models init
            this.storys = Storys.init();
            this.news = News.init();

            // controllers init

            // page init
        }
    });

    var diantv = Diantv.init();
});
