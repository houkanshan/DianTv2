define(['spine', 
        'jquery', 
        'widget/clock',
        'controller/action'
        ], function(Spine, $, Clock, Action){
    var Header = Spine.Controller.create();

    Header.include({
        el: $('header'),
        elements: {
            '.date': 'dateEl'
        },
        init: function(){
            //var el = $('<div>').addClass('date mod-left');
            var clock = Clock({
                el: this.dateEl
                //, refreshInterval: 1000
            }).start();
        },
        render: function(){
        }
    });

    return Header;
});
