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
        var cleanCss = option.clean && option.clean.split(':');

        var $elem = this;
        var dfd = $.Deferred();

        // turn off the transition
        $elem.css(getTransitionCss());
        // set start style [if needed]
        $elem.css(startCss[0], startCss[1]);

        setTimeout(function(){
            // turn on the transition
            $elem.css(getTransitionCss(property, duration/1000 + 's', timingFunction));
            // set end style
            $elem.css(endCss[0], endCss[1]);
        }, 1);

        // reset the transition

        // set end timer
        setTimeout(function(){
            // do css clean
            $elem.css(getTransitionCss());
            cleanCss && $elem.css(cleanCss[0], cleanCss[1]);

            dfd.resolve();
        }, duration);

        return dfd.promise();
    }

    function fadeIn(duration){
        return animate.call(this, {
            property: 'opacity',
            duration: duration,
            timingFunction: 'ease',
            start: 'opacity: 1',
            end: 'opacity: 0',
            clean: 'opacity:'
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
            end: 'opacity: 1',
            clean: 'opacity:'
        });
    }

    var Animate = function(elem){
        var elem = $(elem);
        //elem.addClass('animation');
        return {
            define: $.proxy(animate, elem),
            fadeIn: $.proxy(fadeIn, elem),
            fadeOut: $.proxy(fadeOut, elem)
        };

    };

    return Animate;
});
