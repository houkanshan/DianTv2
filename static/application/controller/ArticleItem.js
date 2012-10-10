/**
 * @module ArticleItemController
 * @define Abstract of StorysControllerItem & NewsControllerItem
 */
define(['spine', 
        'jquery', 
        'handlebars',
        'widget/animation'
        ], function(Spine, $, Handlebars, Animate){

    var ArticleItemController = Spine.Controller.create();
    // use 'extend' so that can be touched outside by module, 
    // then it can be included
    ArticleItemController.extend({
        name: 'article',  // name of item
        tag: 'section',
        className: '',
        elements: {},
        model: undefined,
        style: undefined,
        isLoading: undefined,
        template: undefined,
        __parent__: ArticleItemController,  // not a good idea
        /**
         * @descript new ArticleItemController({
         *     model: articleModelItem
         * });
         * on init, a model will be added by ArticlesController
         */
        init: function(){
            // init view
            this.render();

            // model fetch
            this.model.bind('fetched', this.proxy(this.render));

            //self property init
            this.isLoading = false;

            // bind event
            this.bind('updateStyle', this.updateStyle);
            this.bind('destory', this.destory);
        },
        fetch: function(){
            this.model.trigger('fetch');
        },
        render: function(){
            if(!this.model || !this.model.item){
                this.loading();
                this.updateStyle();
                return;
            }

            // add id (needn't)
            this.el.data('id', this.model.item.id);

            // render view
            var articleItem = this.model.item;
            this.el.html(this.template(articleItem));
            // setTimeout:do render first
            setTimeout(this.proxy(function(){
                this.updateStyle();
            }), 1);
            Animate(this.el).fadeOut(800);
            this.trigger('rendered', this.el);

            // trigger statue to loaded
            this.loaded();
        },
        updateStyle: function(newStyle){
            // outer style set
            $.extend(this.style, newStyle);
            if(this.style.css){
                this.el.css(this.style.css);
            }
            if(this.style.styleFunc){
                for(var funcName in this.style.styleFunc){
                    this.el[funcName](this.style.styleFunc[funcName]);
                }
            }

            // self style set
            var totalHeight = this.el.height();
            var hdHeight = this.el.find('.hd').outerHeight();
            var bdHeight = totalHeight - hdHeight - 20;
            this.el.find('.bd').outerHeight(bdHeight);
            // hack for firefox
            this.el.find('.pic img').css('max-height', bdHeight);

            if(this.model.item && (this.model.item.id & 1)){
                this.el.find('.pic').addClass('b-style');
            }
        },
        /*
         * return a Promise
         */
        destory: function(){
            return Animate(this.el).fadeIn(500)
            .done(this.proxy(function(){
                this.trigger('destoryed');
                this.release();
            }));
        },
        // render method: private
        loading: function(){
            // is loading now, do noting
            if(this.isLoading){return}
            // not loading state, do loading

            this.el.addClass('loading');
            this.trigger('loading');
        },
        loaded: function(){
            this.el.removeClass('loading');
            this.trigger('loaded', this.model);
        }
    });

    return ArticleItemController;
});
