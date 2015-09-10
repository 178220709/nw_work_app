/**
 * Created by json on 2015/9/8.
 */

var http = require('http');
var then = require('thenjs');

var getUrlThen = function( url){
    // Utility function that downloads a URL and invokes
    // callback with the data.
    return then(function(cont){
        http.get(url, function(res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function() {
                cont(null,data);
            });
        }).on("error", cont);
    });
};

var url = "www.baidu.com";
var test = function(){
    getUrlThen(url).then(function (cont, data){
        console.log(data);
    })
};