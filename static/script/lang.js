define([], function(){
    if(!String.prototype.trim){
        String.prototype.trim  = function(){
            var str = this.replace('^\s/', ''),
                end = str.length - 1,
                ws = /\s/;
            while( ws.test(str.charAt(end)) ){
                end--;
            }

            return str.slice(0, end + 1);
        }
    }
});
