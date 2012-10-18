// 考虑一级模块直接使用全局消息总线
// 主要的问题是，被控制的模块不想要多少往其他模块的通信，
// 就完全可以使用独立的消息模块
// 但如果像顶层模块这样需要跨模块通信，就最好用全局

define(['spine', 
        'jquery', 
        'app/config', 
        'route',
        // module load
        'controller/header',
        'controller/storys', 
        'controller/news',
        'controller/screen',
        'controller/action',
        'controller/message',
        'widget/connectivity',
        'widget/weather'
        ], function(Spine, $, config, route, 
            Header, Storys, News, Screen, Action, Message, 
            Connectivity, Weather) {

    var DianTv = Spine.Controller.create({
        el: $('body'),
        elements: {},
        init: function() {
            // models init
            // current no Global Models

            // controllers init
            this.header = new Header;
            this.news = new News;
            this.storys = new Storys;

            this.action = new Action;

            this.message = new Message;
            this.message.add('head', 'www.dian.org.cn/tv');
            var helps = config.initMsg;
            for(var id in helps){
                this.message.add(id, helps[id]);
            }

            // widget init
            Connectivity.startPing(function(){
                Spine.trigger('msg:error:start', '连接断了...')
            }, 
            function(){
                Spine.trigger('msg:error:end');
            });
            Weather.startGet(function(text){
                $('.weather').text(text);
                console.log(text);
            });

            
            // route init
            this.route('/tv', this.proxy(this.toTv));
            this.route(/\/?/, this.proxy(this.toPc));
            Spine.Route.setup(); // apply route onload

            // page init
            this.screen = new Screen({storysNum: config.storysNum});
            //temp no-use
            this.screen.bind('storys:style:update', this.proxy(function(style){
                this.storys.trigger('style:update', style);
            }));
            // do first screen render
            this.screen.render();
        },
        // url route
        toTv: function() {
            require(['controller/timer'], function(Timer) {
                this.timer = new Timer({
                    interval : config.refreshInterval
                });
                Spine.trigger('timer:on');
            });
            Spine.bind('timer:step', this.proxy(this.next));

            this.storys.trigger('editable', false);
        },
        toPc: function() {
            Spine.trigger('timer:off');
            Spine.unbind('timer:step');

            this.storys.trigger('editable', true);
        },
        //TODO:view slide
        next: function(){
            // all the slide animate will make here!!
            // news 1st, append left
            this.news.goNext();
            // storys 2rd, append right
            this.storys.goNext();
        }
    });

    return DianTv;
});
