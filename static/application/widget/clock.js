// need require widget css
define(['jquery'], function($){
    var Clock = function(option){
        option = option || {};

        var el = option.el || '';
        el = $(el);
        var refreshInterval = option.refreshInterval || 1000 * 60;

        var timer = null;

        function _renderTime(){
            var timeStr = (function(){
                var now = new Date();
                return now.getFullYear() + '年' + 
                (now.getMonth()+1) + '月' + 
                now.getDate() + '日 ' + 
                now.getHours() + ':' + 
                (now.getMinutes()/100).toFixed(2).toString().substr(2);
            }());

            el.text(timeStr);
        }

        function _start(){
            _renderTime();
            timer = setInterval(_renderTime, refreshInterval);
        }

        function _stop(){
            clearInterval(timer);
            timer = null;
        }

        return {
            start: _start,
            stop: _stop
        };
    }

    /*
     *  example: 
     *  Clock({
     *      el: '#click',
     *      refreshInterval: 1000*60
     *  }).start();
     */
    return Clock;

});
