define(['spine', 'jquery'], function(Spine, $) {
    var StoryItemModel = Spine.Class.create();
    StoryItemModel.include(Spine.Events);
    StoryItemModel.include({
        // added in init arguments
        option: null,

        init: function() {
            //$.extend(this.option, option);

            this.bind('fetch', this.read);
        },
        read: function() {
            // TODO
            var res = {
                title: 'haha', 
                content:['aa','aaa','aaa'], 
                img:{}
            };
            console.log('story fetched');
            this.item = res;
            this.trigger('fetched');
        },
        create: function() {
            // TODO
        },
        update: function() {
            // TODO
        },
        del: function() {
            // TODO
        },
        // base network request
        get: function() {
            // TODO
        },
        post: function() {
            // TODO
        }
    });

    return StoryItemModel;
});

