// use html contenteditable instead
define(['spine', 
        'jquery', 
        'handlebars'
        ], function(Spine, $, Handlebars){

    var Editable = Spine.Controller.sub();

    Editable.include({
        //tag:'div',
        //className: 'edit',
        //parentEl: undefined,
        //template: Handlebars.compile($('#editTmpl').html()),
        events:{
            'click .add-btn': 'addImage',
            'click .del-btn': 'delImage',
            'click .save-btn': 'save'
        },
        init: function(){
            // init view
            //var article = this.collectFromHtml(this.parentEl);
        },
        render: function(){
            //this.el.append(this.template(article));
            if(!this.isEditing){
                this.el.removeClass('editing');
                this.el.find('.editable').attr('contenteditable', false);
            }
            else {
                this.el.addClass('editing');
                this.el.find('.editable').attr('contenteditable', true);
            }

            // handle img
            var hasImg = !!this.el.find('.pic img').attr('src');
            this.hasImg(hasImg);

            return this.el;
        },
        collectFromHtml: function(elem){
            var $elem = $(elem);

            var article = {
                title: $elem.find('.title').text().trim(),
                author: $elem.find('.author').text().trim(),
                // content need format
                content: $elem.find('.content').text().trim().split('\n'),
                img: (function(){
                    var img = $elem.find('.pic img');
                    var url = img.attr('src');
                    if(!url){return}
                    return {
                        url: url,
                        floatValue: img.data('floatvalue')
                    };
                }())
            };

            return article;
        },
        edit: function(){
            this.isEditing = true;
            this.render();
            this.trigger('editing');
        },
        save: function(){
            this.isEditing = false;
            this.render();
            this.trigger('save', this.collectFromHtml(this.el));
            // destory
            this.unbind();
        },
        hasImg: function(hasImg){
            var imgEl = this.el.find('.pic');
            if(hasImg){
                imgEl.removeClass('no-img');
                imgEl.addClass('has-img');
            }
            else {
                imgEl.removeClass('has-img');
                imgEl.addClass('no-img');
            }
        },
        addImage: function(){
            console.log('click add');
        },
        delImage: function(){
            console.log('click del');
        }
    });

    return Editable;
});
