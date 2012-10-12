define(['spine', 
        'jquery',
        'app/config'
        ], function(Spine, $, config) {

var ArticleItemModel = Spine.Class.create();
// TODO: maybe not a good idea
//ArticleItemModel.extend(Spine.Events);
//

// use to make new editable article
var emptyItem = {
    title: ' ',
    author: ' ',
    content: [' '],
    img: ' '
};

ArticleItemModel.extend({
    // added in init arguments
    host: config.apiHost,
    name: 'article',            // abstruct
    collectionUrl: undefined,   // abstruct
    singletonUrl: undefined,    // abstruct
    option: {},
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

        if(this.option.empty){
            this.bind('fetch', this._getEmpty);
        }
        else{
            this.bind('fetch', this._read);
        }

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
        delete item.text;

        item.img = {};
        item.img.url = (item.img_url && item.img_url.length) ? 
            item.img_url : null;
        item.img.floatValue = item.img_horizontal;
        delete item.img_url;
        delete item.img_horizontal;

        return item;
    },
    _format2server: function(res){
        //var item = {};

        //item.id = res.id;
        //item.title = res.title;
        //item.author = res.author;
        var item = this._deepcp(res);

        item.text = item.content.join('\n');
        $.trim(item.text);
        delete item.content

        if(item.img){
            item.img_url = item.img.url;
            item.img_horizontal = item.img.floatValue;
            delete item.img;
        }

        return item;
    },
    // model control
    //    _getEmpty need to be discarded
    _getEmpty: function(){
        this.item = this._deepcp(emptyItem);
        this.trigger('fetched', this.item);
    },
    _read: function() {
        $.get(this.host + this.collectionUrl, this.option)
        .done(this.proxy(function(res){
            // TODO: need decorate
            if(res.length !== 0){
                this.item = this._format2client(res[0]);
            }
            else {
                this.exceed = true;
            }
            this.trigger('fetched', this.item);
        }))
        .fail(this.proxy(function(res){
            this.trigger('failed');
        }));
    },
    _create: function() {
        var article = this._format2server(this.item);

        var promise = $.ajax({
            url: this.host + this.collectionUrl,
            type: 'POST',
            data: article
        })
        .done(this.proxy(function(res){
            if(res.length !== 0){
                this.item = this._format2client(res[0]);
            }
            this.trigger('fetched', this.item);
        }))
        .fail(this.proxy(function(res){
            this.trigger('failed');
        }));

        return promise;
    },
    _update: function() {
        var article = this._format2server(this.item);

        var promise = $.ajax({
            url: this.host + this.singletonUrl + '/' + article.id,
            type: 'PUT',
            data: article
        })
        .done(this.proxy(function(res){
            if(res.length !== 0){
                this.item = this._format2client(res[0]);
            }
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
        if(this.item.id >= 0){
            this._update();
        }
        else {
            this._create();
        }
    }

});

return ArticleItemModel;

});

