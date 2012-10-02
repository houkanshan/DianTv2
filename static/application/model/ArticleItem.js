define(['spine', 
        'jquery'
        ], function(Spine, $) {
    var ArticleItemModel = Spine.Class.create();
    // TODO: maybe not a good idea
    //ArticleItemModel.extend(Spine.Events);

    ArticleItemModel.extend({
        // added in init arguments
        host: 'http://localhost:8081/api',
        name: 'article',            // abstruct
        collectionUrl: undefined,   // abstruct
        singletonUrl: undefined,    // abstruct
        option: undefined,
        __parent__: ArticleItemModel,

        init: function() {
            //extend elements
            var elem = arguments.length && arguments[0];
            for(var key in elem){
                if(!elem.hasOwnProperty(key));
                this[key] = elem[key];
            }

            //self property init
            $.extend(this, Spine.Events);

            this.bind('fetch', this._read);
        },
        // util
        _deepcp: function(obj){
            return JSON.parse(JSON.stringify(obj));
        },
        _serialize: function(){
            // TODO;
            this.el;
        },
        _formatTime: function(timeInModel){
            var timeRegexp = /([^T]+)T([^.]+).\.*/i;
            var matchs = timeInModel.match(timeRegexp);
            return matchs[1] + ' ' + matchs[2];
        },
        _format2client: function(res){
            //var item = {};

            //item.id = res.id;
            //item.title = res.title;
            //item.author = res.author;

            //item.create_on = res.create_on;
            var item = this._deepcp(res);
            item.create_on = this._formatTime(res.create_on);

            item.content = item.text.split('\n');

            if(item.img_url){
                item.img = {};
                item.img.url = item.img_url;
                item.img.floatValue = item.img_horizontal;
                delete item.img_url;
                delete item.img_horizontal;
            }

            return item;
        },
        _format2server: function(res){
            //var item = {};

            //item.id = res.id;
            //item.title = res.title;
            //item.author = res.author;
            var item = this._deepcp(res);

            item.text = item.content;
            delete item.content

            if(item.img){
                item.img_url = item.img.url;
                item.img_horizontal = item.img.floatValue;
                delete item.img;
            }

            return item;
        },
        // model control
        _read: function() {
            $.get(this.host + this.collectionUrl, this.option)
            .done(this.proxy(function(res){
                // TODO: need decorate
                if(res.length !== 0){
                    this.item = this._format2client(res[0]);
                }
                this.trigger('fetched', this.item);
            }))
            .fail(this.proxy(function(res){
                this.trigger('failed');
            }));
        },
        _create: function(article) {
            var promise = $.ajax({
                url: this.host + this.collectionUrl,
                type: 'POST',
                data: article
            })
            .done(this.proxy(function(res){
                // do not use the remote object
                //this.trigger('fetched', this.item);
            }))
            .fail(this.proxy(function(res){
                this.trigger('failed');
            }));

            return promise;
        },
        _update: function() {
                     debugger;
            article = this._format2server(this.item);

            var promise = $.ajax({
                url: this.host + this.singletonUrl + '/' + article.id,
                type: 'PUT',
                data: article
            })
            .done(this.proxy(function(){
                //this.trigger('fetched');
            }))
            .fail(this.proxy(function(){
                this.trigger('failed');
            }));
            return promise;
        },
        _del: function() {
            // TODO
        },

        // outer method
        save: function(article){
            $.extend(this.item, article);
            this._update();
        }

    });

    return ArticleItemModel;
});

