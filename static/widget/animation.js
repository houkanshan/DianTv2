define(['jquery'], function($){
    var effectStyle = {
        fadeOut: '',
        fadeIn: ''
    }

    function getTransitionCss(property, duration, timingFunction){
        var transition = property + ' ' + duration + ' ' + timingFunction;
        if(arguments.length === 0){ 
            transition = 'none';
        }
        return {
          '-webkit-transition': transition,
             '-moz-transition': transition,
              '-ms-transition': transition,
               '-o-transition': transition,
                  'transition': transition
        }

    }

    function animateFactory(){

    }

    /*
     * 'this' will be proxied to $elemnt
     *  @param option = {
     *      property: 'all',
     *      duration: '500',
     *      timingFunction: 'ease',
     *      startCss: 'opacity: 1',
     *      endCss: 'opacity: 0'
     *  }
     */
    function animate(option){
        option = option || {};
        var property = option.property || 'all';
        var duration = option.duration || '500';
        var timingFunction = option.timingFunction || 'ease';
        var startCss = option.start.split(':');
        var endCss = option.end.split(':');

        var $elem = this;
        var endQuene = [];

        // set start style [if needed]
        $elem.css(startCss[0], startCss[1]);

        // change animate style
        $elem.css(getTransitionCss(property, duration/1000 + 's', timingFunction));
        
        // set end style
        $elem.css(endCss[0], endCss[1]);

        // reset the transition
        endQuene.push(function(){
            $elem.css(getTransitionCss());
        });

        // set end timer
        setTimeout(function(){
            for(var i = endQuene.length; i--;){
                endQuene[i].call(this);
            }
        }, duration);

        return {
            onStart: function(callback){
                callback.call(this);
            },
            onEnd: function(callback){
                endQuene.unshift(callback);
            }
        };
    }

    function fadeIn(duration){
        return animate.call(this, {
            property: 'opacity',
            duration: duration,
            timingFunction: 'ease',
            start: 'opacity: 1',
            end: 'opacity: 0'
        });
    }

    /*
     * 'this' will be proxied to $elemnt
     */
    function fadeOut(duration){
        return animate.call(this, {
            property: 'opacity',
            duration: duration,
            timingFunction: 'ease',
            start: 'opacity: 0',
            end: 'opacity: 1'
        });
    }

    var Animate = function(elem){
        var elem = $(elem);
        elem.addClass('animation');
        return {
            define: $.proxy(animate, elem),
            fadeIn: $.proxy(fadeIn, elem),
            fadeOut: $.proxy(fadeOut, elem)
        };

    };

    return Animate;
});