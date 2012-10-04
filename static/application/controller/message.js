define(['spine',
        'jquery',
        'app/config',
        'widget/animation'
        ], function(Spine, $, config, Animate){

var Message = Spine.Controller.create();
Message.include({
    el: $('.message'),
    msgIds: [],
    msgMap: {},
    init: function(){

        Spine.bind('msg:add', this.proxy(this.add));
        Spine.bind('msg:del', this.proxy(this.del));
        Spine.bind('msg:one', this.proxy(this.one));

        Spine.bind('msg:error:start', this.proxy(this.errorStart));
        Spine.bind('msg:error:end', this.proxy(this.errorEnd));

        this.start();
    },
    start: function(){
        if(this.timer){return}
        this.timer = setInterval(this.proxy(this.showNext), 
            config.msgScrollTime);
    },
    stop: function(){
        clearInterval(this.timer);
        this.timer = null;
    },
    showNext: function(){
        var id = this.msgIds.pop();
        if(!id){return}

        this.msgIds.unshift(id);
        var msg = this.msgMap[id];

        Animate(this.el).fadeIn(300)
        .done(this.proxy(function(){
            this.el.text(msg);
            Animate(this.el).fadeOut(300);
        }));
    },
    one: function(msg){
        // use a new element to cover the message
        this.stop();
        setTimeout(this.proxy(function(){
            this.el.text(msg);
            this.start();
        }, 5000));
    },
    add: function(id, msg){
        this.msgIds.push(id);
        this.msgMap[id] = msg;
    },
    del: function(id){
        var index = this.msgIds.indexOf(id);
        if(index >= 0){
            this.msgIds.split(index, 1);
            delete this.msgMap[id];
        }
    },
    errorStart: function(msg){
        this.stop();
        this.el.text(msg);
    },
    errorEnd: function(){
        this.start();
    }

});

return Message;

});
