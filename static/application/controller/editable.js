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
            'click .set-btn': 'addImage',
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
            this.renderImg();

            return this.el;
        },
        collectFromHtml: function(elem){
            var $elem = $(elem);

            var article = {
                title: $elem.find('.title').text().trim(),
                author: $elem.find('.author').text().trim(),
                // content need format
                content: $elem.find('.content').contents().map(function(index, elem){
                    return elem.textContent;
                }).get(),
                img: (function(){
                    var img = $elem.find('.pic img');
                    var url = img.attr('src');
                    return {
                        url: url,
                        floatValue: img.data('floatvalue')
                    };
                }())
            };

            return article;
        },
        checkHtmlComp: function(){
            var editableEl =  this.el.find('.editable').not('.url-field');
            var isComp = true;
            editableEl.each(function(index, elem){
                if($(elem).text().trim().length === 0){
                    isComp = false;
                }
            });
            return isComp;

        },
        edit: function(){
            this.isEditing = true;
            this.render();
            this.trigger('editing');
        },
        save: function(){
            // check if could save
            if(!this.checkHtmlComp()){
                Spine.trigger('msg:one', '内容不完整, 保存失败...');
                return;
            }

            this.isEditing = false;
            this.render();
            var collectedHtml = this.collectFromHtml(this.el);
            this.trigger('save', collectedHtml);
            // destory
            this.unbind();
        },
        renderImg: function(){
            var picEl = this.el.find('.pic');
            var hasImg = !!picEl.find('img').attr('src');
            if(hasImg){
                picEl.removeClass('no-img');
                picEl.addClass('has-img');
            }
            else {
                picEl.removeClass('has-img');
                picEl.addClass('no-img');
            }
        },
        addImage: function(){
            console.log('add img');
            var picEl = this.el.find('.pic');
            var imgEl = picEl.find('img');
            var urlEl = this.el.find('.url-field');
            var url = urlEl.text().trim();
            url = encodeURI(url);

            imgEl.attr('src', url);
            this.renderImg();
        },
        delImage: function(){
            var picEl = this.el.find('.pic');
            var imgEl = picEl.find('img');

            imgEl.attr('src', '');
            this.renderImg();
        }
    });

    return Editable;
});
