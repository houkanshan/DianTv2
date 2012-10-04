define(['spine', 
        'jquery'
       ], function(Spine, $){

var Action = Spine.Controller.create();

Action.include({
    el: $('.menu'),
    events: {
        'click .home': 'home',
        'click .next': 'next',
        'click .prev': 'prev',
        'click .add': 'add'
    },
    init: function(){
        Spine.bind('menu:hide', this.proxy(this.hide));
        Spine.bind('menu:show', this.proxy(this.show));
    },
    render: function(){
    },
    home: function(){
        Spine.trigger('all:goto', 0);
    },
    next: function(){
        Spine.trigger('all:next');
    },
    prev: function(){
        Spine.trigger('all:prev');
    },
    add: function(){
        this.home();
        Spine.trigger('storys:add');
    },
    hide: function(){
        this.el.hide();
    },
    show: function(){
        this.el.show();
    }
});

return Action;


});
