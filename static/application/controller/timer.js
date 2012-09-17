define(['spine', 'jquery'], function(Spine, $) {
    // Timeer Controller, send msg by timer
    var Timer = Spine.Controller.create({
        el: 'body',
        elements: {},
        init: function(option) {
            option = option || {}
            var timerStep = option.interval || '3000';

            //bind event
            Spine.bind('timer:on', this.turnOn);
            Spine.bind('timer:off', this.turnOff);
            
            // do setInterval of timerStep
            this.start(timerStep);
        },

        // after start, the timer will keep running
        // wheather sending msg depands on On/Off
        start: function(timerStep) {
            this.timer = setInterval(function() {
                if (!timerOn) {
                    return;
                }

                //send refresh msg
                // TODO
                Spine.trigger('timer:step');
            },
            timerStep);
        },
        turnOn: function() {
            this.timerOn = true;
        },
        turnOff: function() {
            this.timerOn = false;
        }
    });

    return Timer;
});
