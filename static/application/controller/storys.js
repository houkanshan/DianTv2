define(['spine', 
        'jquery', 
        'app/config',
        'model/storys', 
        'controller/storyItem'
        ], function(Spine, $,  config, Storys, StoryItemController){

    var StorysController = Spine.Controller.create();

    StorysController.extend({
        // class
    });

    StorysController.include({
        // inhered ?
        el: $('<div>').addClass('aside'),  // view entity   (section)
        itemList: [],               // object entity (storyItemController)
        elements: {},
        init: function(){
            // init view
            this.render();

            // model init
            this.model = new Storys;
            this.model.bind('fetched', this.proxy(this.addAll));
            // TODO: some bad side to fix
            //this.model.bind('update', this.proxy(this.update));
            //this.model.bind('create', this.addOne);

            // event init
            this.bind('next', this.proxy(this.goNext));
            this.bind('style:update', this.updateStyle);

        },
        updateStyle: function(newOpt){
            $.extend(this.option, newOpt);
            for(var i = this.itemList.length; i--;){
                this.itemList[i].updateStyle(newOpt);
            }
        },
        render: function(){
            this.parentEl = $('.content');
            this.el.appendTo(this.parentEl);
            //this.asideEl = $('.aside');
            //this.asideEl.appendTo(this.el);
        },
        goNext: function(){
            this.hideAll();
            this.fetchAll();
        },
        fetchAll: function(){
            var len = config.storysNum;
            for(var i = 0; i < len; i++){
                var storyItem = new StoryItemController;
                this.itemList.push(storyItem);
                this.el.append(storyItem.el);
            }
            this.model.trigger('fetch', {
                start: 0, 
                count: len
            });
        },
        addAll: function(storys){
            // init list dis-ordinary
            var len = storys.length;
            for(var i = 0; i < len; i++){
                this.addOne(i, storys[i]);
            }
        },
        addOne: function(i, story){
            var storyItem = this.itemList[i]
            storyItem.render(story);
            this.itemList.push(storyItem);
        },
        hideAll: function(){
            var len = this.itemList.length;
            for(var i = 0; i < len; i++){
                this.itemList[i].remove();
            }
            this.itemList = [];
        },
        // this will cause object remove
        removeAll: function(){
            //TODO
        },
        // index change to a query will be better
        removeOne: function(index){
            //TODO
        }
    });

    return StorysController;
});
