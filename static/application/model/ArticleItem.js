define(['spine', 
        'jquery'
        ], function(Spine, $) {
    var ArticleItemModel = Spine.Class.create();
    // TODO: maybe not a good idea
    ArticleItemModel.extend(Spine.Events);

    ArticleItemModel.extend({
        // added in init arguments
        host: 'http://localhost:8081/api',
        name: 'article',            // abstruct
        collectionUrl: undefined,   // abstruct
        singletonUrl: undefined,    // abstruct
        option: undefined,

        init: function() {
            //extend elements
            var elem = arguments.length && arguments[0];
            for(var key in elem){
                if(!elem.hasOwnProperty(key));
                this[key] = elem[key];
            }

            this.bind('fetch', this._read);
        },
        // util
        _serialize: function(){
            // TODO;
            this.el;
        },
        _formatTime: function(timeInModel){
            var timeRegexp = /([^T]+)T([^.]+).\.*/i;
            var matchs = timeInModel.match(timeRegexp);
            return matchs[1] + ' ' + matchs[2];
        },
        _format: function(res){
            var item = {};

            item.id = res.id;
            item.title = res.title;
            item.author = res.author;
            item.create_on = res.create_on;
            item.create_on = this._formatTime(res.create_on);
            item.content = res.text.split('\n');
            if(res.img_url){
                item.img = {};
                item.img.url = res.img_url;
                item.img.floatValue = res.img_horizontal;
            }

            return item;
        },
        // model control
        _read: function() {
            $.get(this.host + this.collectionUrl, this.option)
            .done(this.proxy(function(res){
                // TODO: need decorate
                if(res.length !== 0){
                    this.item = this._format(res[0]);
                }
                this.trigger('fetched', this.item);
            }))
            .fail(this.proxy(function(res){
                this.trigger('failed');
            }));
        },
        _create: function() {
            // TODO
            var promise = $.post(this.host + this.collectionUrl, this)
            .done(this.proxy(function(res){
                // do not use the remote object
                this.trigger('fetched', this.item);
            }))
            .faied(this.proxy(function(res){
                this.trigger('failed');
            }));

            return promise;
        },
        _update: function(data) {
            // TODO
            var promise = $.ajax({
                url: this.host + this.singletonUrl,
                method: 'PUT',
                data: data
            })
            .done(this.proxy(function(){
                this.trigger('fetched');
            }))
            .failed(this.proxy(function(){
                this.trigger('failed');
            }));
            return promise;
        },
        _del: function() {
            // TODO
        }
    });

    return ArticleItemModel;
});

