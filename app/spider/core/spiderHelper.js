'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var http = require('http');
var then = require('thenjs');
var cheerio = require('cheerio');
var help = {};

var collection = require('../../mongodbBase/db').cns;
help.getUrlThen = function( url){
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

help.addModelThen = function(model,type,cont){
        if(!type){
            cont(new Error("type is must"));
            return;
        }
        model.TypeId = type;



};



help.log = console.log;

help.showExist = function(str){
    if (!process.env.USER_ShowExist || process.env.USER_ShowExist === 1) {
        help.log(str);
    }
};

help.load = function(html){
   return cheerio.load(html, {decodeEntities: false});
};

module.exports = help;


