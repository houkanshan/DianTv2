define(['spine', 'jquery'], function(Spine, $){
    var StorysModel = Spine.Class.create();
    StorysModel.include(Spine.Events);
    StorysModel.include({
        init: function(){
            this.bind('fetch', this.proxy(this.read));
            this.bind('update', this.proxy(this.update))
        },
        read: function(option){
            // TODO
            this.trigger('fetched', [{
                title: 'haha', 
                content:['aa','aaa','aaa'], 
                img:{}
            }]);
        },
        create: function(){
            // TODO
        },
        update: function(){
            // TODO
        },
        del: function(){
            // TODO
        },
        get: function(){
            // TODO
        },
        post: function(){
            // TODO
        }
    });

    return StorysModel;
});
