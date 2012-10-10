define(['spine', 'jquery'], function(Spine, $) {
    // Timeer Controller, send msg by timer
    var Timer = Spine.Controller.create({
        el: 'body',
        elements: {},
        init: function(option) {
            option = option || {}
            var timerStep = option.interval || 3000;

            //bind event
            Spine.bind('timer:on', this.proxy(this.turnOn));
            Spine.bind('timer:off', this.proxy(this.turnOff));
            
            // do setInterval of timerStep
            this.start(timerStep);
        },

        // after start, the timer will keep running
        // wheather sending msg depands on On/Off
        start: function(timerStep) {
            if(this.timer) {return}
            this.timer = setInterval(this.proxy(function() {
                if (!this.timerOn) {
                    return;
                }

                //send refresh msg
                // TODO
                Spine.trigger('timer:step');
            }),
            timerStep);
            
            // do first timer, needn't
            //this.timerOn && Spine.trigger('timer:step');
        },
        turnOn: function() {
            this.timerOn = true;
        },
        turnOff: function() {
            this.timerOn = false;
        },
        destory: function(){
            // FIXME:don't use
            clearInterval(this.timer);
            //this.parent.destory();
        }
    });

    return Timer;
});
