// need require widget css
define(['jquery'], function($){
    var Clock = function(option){
        option = option || {};

        var el = option.el || '';
        el = $(el);
        var refreshTime = option.refreshTime || 1000 * 60;

        var timer = null;

        function _renderTime(){
            var timeStr = (function(){
                var now = new Date();
                return now.getYear() + '年' + 
                now.getMonth() + '月' + 
                now.getDate() + '日 ' + 
                now.getHours() + ':' + now.getMinutes();
            }());

            el.text(timeStr);
        }

        function _start(){
            timer = setInterval(_renderTime, refreshTime);
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
     *      refreshTime: 1000*60
     *  }).start();
     */
    return Clock;

});
