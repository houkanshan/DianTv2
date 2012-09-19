// 考虑一级模块直接使用全局消息总线
// 主要的问题是，被控制的模块不想要多少往其他模块的通信，
// 就完全可以使用独立的消息模块
// 但如果像顶层模块这样需要跨模块通信，就最好用全局

define(['spine', 
        'jquery', 
        'app/config', 
        'spine.route',
        'controller/storys', 
        'controller/news',
        'controller/view'
        ], function(Spine, $, config, route, Storys, News, ViewFrame) {
    var DianTv = Spine.Controller.create({
        el: $('body'),
        elements: {},
        init: function() {
            // models init
            // current no Global Models
            
            // route init
            this.route('/tv', this.proxy(this.toTv));
            this.route('', this.proxy(this.toPc));
            Spine.Route.setup(); // apply route onload

            // controllers init
            // contorller module load
            this.storys = new Storys;
            this.news = new News;

            // page init
            this.viewFrame = new ViewFrame({storysNum: config.storysNum});
            //temp no-use
            this.viewFrame.bind('storys:style:update', this.proxy(function(opt){
                    this.storys.trigger('style:update', opt);
            }));
        },
        // url route
        toTv: function() {
            require(['controller/timer'], function(Timer) {
                this.timer = new Timer({
                    interval : 3000
                });
                Spine.trigger('timer:on');
            });
            Spine.bind('timer:step', this.proxy(this.next));
        },
        toPc: function() {
            Spine.trigger('timer:off');
            Spine.unbind('timer:step');
        },
        //TODO:view slide
        next: function(){
            this.storys.trigger('next');
            this.news.trigger('next');
        }
    });

    return DianTv;
});
