define(['spine', 'jquery'], function(Spine, $){
    /*
     * View controller here is to render the base framework of the app,
     * the parent module should control the layout of its children's modules,
     * and the style, inner-layout will be controled by children's modules
     * */
    var ViewFrame = Spine.Controller.create({
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
            //this.initRender();
            this.option = $.extend(this.defaultOption, opt);
            $(window).resize(this.onresizeWrapper(this.proxy(this.initRender)));

            // change view on view num change
            this.bind('storys:num:update', this.proxy(this.initRender));
        },
        onresizeWrapper: function(callback){
            var resizeTimer = null;
            if(resizeTimer === null){
                resizeTimer = setTimeout(function(){
                    callback && callback();
                }, 200);
            }
        },
        // do init after re-resize section, proxied
        initRender: function(){
            this.htmlHeight = this.el.height();
            this.htmlWidth = this.el.width();

            this.headerHeight = this.headerEl.height();
            this.contentHeight = this.htmlHeight - this.headerHeight;
            this.tinyBoxHeight = this.contentHeight / this.option.storysNum;

            //send height of tinyBox
            this.trigger('storys:height:update', {height: this.tinyBoxHeight});
        },
        // do renderView after re-append section
        renderView: function(){
            this.contentEl.find('.tiny').height(this.tinyBoxHeight);
        }
    });

    return ViewFrame;
});
