define(['spine', 'jquery'], function(Spine, $) {
    var StoryItemModel = Spine.Class.create();
    StoryItemModel.include(Spine.Events);
    StoryItemModel.include({
        // added in init arguments
        host: 'http://localhost:8081/api',
        collectionUrl: '/storys',
        singletonUrl: '/story',
        option: null,

        init: function() {
            //$.extend(this.option, option);

            this.bind('fetch', this.read);
        },
        // util
        serialize: function(){
            // TODO;
            this.el;
        },
        format: function(res){
            var item = {};
            item.id = res.id;
            item.title = res.title;
            item.author = res.author;
            item.create_on = res.create_on;
            item.content = res.text.split('\n');
            if(res.img_url){
                item.img = {};
                item.img.url = res.img_url;
                item.img.floatValue = res.img_horizontal;
            }
            return item;
        },
        // model control
        read: function() {
            // TODO
            //var res = {
                //title: 'haha', 
                //content:['aa','aaa','aaa'], 
                //img:{}
            //};
            //console.log('story fetched');
            //this.item = res;
            //this.trigger('fetched');
            // --
            $.get(this.host + this.collectionUrl, this.option)
            .done(this.proxy(function(res){
                // TODO: need decorate
                this.item = this.format(res[0]);
                this.trigger('fetched');
            }))
            .fail(this.proxy(function(res){
                this.trigger('failed');
            }));
        },
        create: function() {
            // TODO
            $.post(this.host + this.collectionUrl, this);
            this.trigger('fetched');
        },
        update: function() {
            // TODO
        },
        del: function() {
            // TODO
        },
        // base network request
        get: function(data) {
            // TODO
            return $.ajax({
                url: this.url,
                type: 'GET',
                data: data
            });
        },
        post: function() {
            // TODO
        }
    });

    return StoryItemModel;
});

