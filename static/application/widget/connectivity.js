
define(['jquery', 
        'app/config'
        ], function($, config){

var Connectivity = {
    ping: function(){
        return $.ajax({
            url: config.pingHost,
            //type: 'HEAD',  // why head 405?
            type: 'GET',
            timeout: 3 * 1000
        });
    },
    startPing: function(failedCb, successCb){

        this.timer = setInterval($.proxy(function(){
            var failed = false;

            this.ping()
            .fail(function(){
                if(failed === false){
                    failedCb();
                    failed = true;
                }
            }).done(function(){
                if(failed === true){
                    successCb();
                    failed === false;
                }
            });

        }, this), 1000 * 60 * 3); // 1 minite
    },
    stopPing: function(){
        clearInterval(this.timer);
    }
}
return Connectivity;

});
