define(['jquery'], function($){

var Weather = {
    // url from http://www.gbin1.com/technology/democenter/weather-forecast/
    url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D12713102%20and%20u%3D%22c%22&format=json&callback=?',
    // for item.code, no use
    weatherMap: [
        'storm', 'storm', 'storm', 'lightning', 'lightning', 'snow', 'hail', 'hail',
        'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'snow', 'snow', 'snow', 'snow',
        'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
        'cloud', 'cloud_moon', 'cloud_sun', 'cloud_moon', 'cloud_sun', 'moon', 'sun',
        'moon', 'sun', 'hail', 'sun', 'lightning', 'lightning', 'lightning', 'rain',
        'snowflake', 'snowflake', 'snowflake', 'cloud', 'rain', 'snow', 'lightning'
    ],
    getText: function(){
        return $.Deferred($.proxy(function(dfd){
            $.getJSON(this.url)
            .done(function(res){
                console.log(res);
                var weather = res.query.results.channel.item.forecast[1];  // forecast item

                var text = weather.text + ' ' + weather.low + '℃~' + weather.high + '℃ ';

                dfd.resolve(text);
            })

        }, this)).promise();
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
