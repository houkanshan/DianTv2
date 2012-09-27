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
        model: null,
        style: null,
        isLoading: false,
        template: null,
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
            this.model.trigger('fetch');

            // bind event
            this.bind('updateStyle', this.updateStyle);
            this.bind('destory', this.destory);
        },
        render: function(){
            if(!this.model || !this.model.item){
                this.loading();
                return;
            }
            this.loaded();

            var articleItem = this.model.item;
            this.el.html(this.template(articleItem));
            this.el.css(this.style);
            this.trigger('rendered', this.el);

        },
        updateStyle: function(newStyle){
            $.extend(this.style, newStyle);
            this.el.css(newStyle);
        },
        destory: function(){
            Animate(this.el).fadeIn(1000)
            .onEnd(this.proxy(function(){
                this.el.remove();
            }));
        },
        // render method: private
        loading: function(){
            // is loading now, do noting
            if(this.isLoading){return}
            // not loading state, do loading
            console.log(this.name + 'loadling');

            this.el.addClass('loading');
            this.trigger('loading');
        },
        loaded: function(){
            console.log(this.name + 'loaded');

            this.el.removeClass('loading');
            this.trigger('loaded');
        }
    });

    return ArticleItemController;
});
