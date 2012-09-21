// will only bind event of view
define(['spine', 'jquery', 'handlebars'], function(Spine, $, handlebars) {
    var StoryItemController = Spine.Controller.create();
    StoryItemController.include({
        tag: 'section',
        className: 'story tiny',
        elements: {},
        model: null,
        style: null,
        template: Handlebars.compile($('#storyTmpl').html()),
        init: function() {
            //init view
            this.render();

            // model fetch
            this.model.bind('fetched', this.proxy(this.render));
            this.model.trigger('fetch');

            // bind event
            this.bind('updateStyle', this.updateStyle);
            this.bind('destory', this.destory);
        },
        render: function() {
            var story = this.model.item;
            if(!story){
                this.loading();
                return;
            }
            this.loaded();
            this.el.html(this.template(story));

            this.trigger('rendered', this.el);
        },
        updateStyle: function(newOpt){
            $.extend(this.style, newOpt);
            this.el.css(newOpt);
        },
        destory: function() {
            // remove the view
            return this.el.remove();
        },
        loading: function() {
            this.el.addClass('loading');
            console.log('story loadling');
            this.trigger('loading');
        },
        loaded: function(){
            console.log('story loaded');
            this.el.removeClass('loading');
            this.trigger('loaded');
        }
    });

    return StoryItemController;
});

