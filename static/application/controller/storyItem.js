// will only bind event of view
define(['spine', 
        'jquery', 
        'handlebars', 
        'controller/ArticleItem',
        'controller/editable'
        ], function(Spine, $, Handlebars, 
            ArticleItemController, Editable) {

var StoryItemController = Spine.Controller.create();
StoryItemController.include(ArticleItemController);

StoryItemController.include({
    name: 'story',
    className: 'story tiny',
    template: Handlebars.compile($('#storyTmpl').html()),
    init: function(){
        // FIXME: not a good idea
        this.__parent__.init.call(this);

        this.bind('editable', this.editable);
        this.bind('rendered', this.editable);

        this.editable();
    },
    editable: function(isEditable){
        if(typeof isEditable === 'boolean'){
            this.isEditable = isEditable;
        }

        if(this.model.item && this.model.item.id >= 0){
            this.isEditable ? this.waitEdit() : this.nowaitEdit();
        }
    },
    waitEdit: function(){
        if(this.el.hasClass('editable')){return;}
        this.el.addClass('editable')
        .on('click', this.proxy(this.edit));
    },
    nowaitEdit: function(){
        if(this.el.hasClass('editable')){
            this.el.removeClass('editable')
            .unbind('click');
        }
    },
    edit: function(e){
        // disable edit button, do first to unbind all click event
        this.nowaitEdit();

        this.editController = new Editable({
            el: this.el
        });
        this.editController.bind('save', this.proxy(this.save));
        this.editController.edit();

        //e.stopPropagation();
    },
    save: function(article){
        this.editable();
        
        // TODO save to model
        this.model.save(article);

        //this.render();

        delete this.editController;
    }
});
return StoryItemController;

});
