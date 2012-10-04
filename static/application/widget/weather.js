define(['jquery'], function($){

var Weather = {
    getText: function(){
        return $.Deferred(function(dfd){
            $.get('http://m.weather.com.cn/data/101200101.html')
            .done(function(res){
                console.log(res);

                var weather = res.weatherinfo;
                var text = weather.weather1 + ' ' + weather.temp1

                dfd.resolve(text);
            })

        }).promise();
    },
    startGet: function(callback){
        this.getText().done(callback);

        this.timer = setInterval($.proxy(function(){

            this.getText().done(callback);

        }, this), 1000 * 60 * 60 * 2); // 2 hour
    },
    stopGet: function(){
        clearInterval(this.timer);
    }
}
return Weather;

});
