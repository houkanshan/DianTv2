// will only bind event of view
//
define(['spine', 'jquery', 'handlebars'], function(Spine, $, handlebars) {
    var StoryItemController = Spine.Controller.create();
    StoryItemController.extend({});

    StoryItemController.include({
        el: $('<section>').addClass('story tiny'),
        // view entity   (section)
        item: {},
        // object entity (story)
        elements: {},
        init: function() {
            this.loading();
            // 
            //this.bind('update', this.render);
        },
        template: Handlebars.compile($('#storyTmpl').html()),
        render: function(story) {
            this.item = story;

            this.el.remove('loading');
            this.el.html(this.template(story));
            this.trigger('rendered', this.el);
        },
        updateStyle: function(newOpt){
            this.el.css(newOpt);
        },
        remove: function() {
            // remove the view
            return this.el.remove();
        },
        loading: function() {
            this.trigger('loading');
            this.el.addClass('loading');
        }
    });

    return StoryItemController;
});

