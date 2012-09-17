// 考虑一级模块直接使用全局消息总线
// 主要的问题是，被控制的模块不想要多少往其他模块的通信，
// 就完全可以使用独立的消息模块
// 但如果像顶层模块这样需要跨模块通信，就最好用全局
//
define(['spine', 
        'jquery', 
        'app/config', 
        'spine.route'
        ], function(Spine, $, config) {
    var DianTv = Spine.Controller.create({
        el: $('body'),
        elements: {},
        init: function() {
            // models init
            // FIXME:current no Global Models
            
            // route init
            this.route('/tv', this.proxy(this.toTv));
            this.route('', this.proxy(this.toPc));
            Spine.Route.setup(); // apply route onload

            // controllers init
            // contorller module load
            require([
                'controller/storys', 
                'controller/news'
                ], this.proxy(function(Storys, News) {
                this.storys = new Storys;
                this.news = new News;
            }));

            // page init
            require(['controller/view'], this.proxy(function(View){
                this.viewFrame = new View({storysNum: config.storysNum});
                this.viewFrame.bind('storys:height:update', 
                    this.proxy(function(opt){
                    this.storys.trigger('height:update', opt);
                }));
            }));
        },
        // url route
        toTv: function() {
            require(['controller/timer'], function(Timer) {
                this.timer = Timer.init();
                timer.start();
            });
            Spine.trigger('timer:turnOn');

        },
        toPc: function() {
            Spine.trigger('timer:turnOff');
        }
        //TODO:view render 
        //
        
    });

    return DianTv;
});
