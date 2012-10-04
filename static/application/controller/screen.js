define(['spine', 'jquery'], function(Spine, $){
    /*
     * View controller here is to render the base framework of the app,
     * the parent module should control the layout of its children's modules,
     * and the style, inner-layout will be controled by children's modules
     * */
    var Screen = Spine.Controller.create({ 
        el: $('html'),
        elements: {
            'body': 'bodyEl',
            'header': 'headerEl',
            '.content': 'contentEl'
        },
        defaultOption: {
            storysNum: 3
        },
        init: function(opt){
            // FIXME: onresizeEnd?
            this.option = $.extend(this.defaultOption, opt);

            var resizeCallback = this.onresizeWrapper(this.proxy(this.render));
            $(window).resize(resizeCallback);

            // change view on view num change
            this.bind('storys:num:update', this.render);
        },
        // wrapper resize callback with a setTimeout.
        onresizeWrapper: function(callback){
            var resizeTimer = null;
            return function(){
                if(resizeTimer === null){
                    resizeTimer = setTimeout(function(){
                        callback && callback();
                        resizeTimer = null;
                    }, 200);
                }
            };
        },
        // do init after re-resize section, proxied
        render: function(){
            console.log('re-render screen');
            this.htmlHeight = this.el.height();
            this.htmlWidth = this.el.width();

            this.headerHeight = this.headerEl.height();
            this.contentHeight = this.htmlHeight - this.headerHeight;
            this.tinyBoxHeight = this.contentHeight / this.option.storysNum;

            //send height(style) of tinyBox
            this.trigger('storys:style:update', {
                styleFunc: {
                    outerHeight: this.tinyBoxHeight
                }
            });
        }
    });

    return Screen;
});
