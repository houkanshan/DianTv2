define(['spine', 
        'jquery', 
        'widget/clock',
        'widget/weather',
        'controller/action',
        ], function(Spine, $, Clock, Weather, Action){
    var Header = Spine.Controller.create();

    Header.include({
        el: $('header'),
        elements: {
            '.date': 'dateEl',
            '.weather': 'weatherEl'
        },
        init: function(){
            //var el = $('<div>').addClass('date mod-left');
            var clock = Clock({
                el: this.dateEl
                //, refreshInterval: 1000
            }).start();

           //Weather.startGet(this.proxy(function(msg){
                //this.weatherEl.text(msg);
           //}));
        },
        render: function(){
        }
    });

    return Header;
});
