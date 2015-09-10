'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var _ = require('lodash');
var then = require('thenjs');

var help = require('../core/spiderHelper');

var collection = require('../../mongodbBase/db').cns.haha;
var exurl = "http://www.haha.mx/joke/1661672";

var haha = {};
var getFlag = function (url) {
    return (url.slice(-7));
};

haha.getModelThen = function (url) {
    return help.getUrlThen(url).then(function (cont, data) {
        var joke = {};
        var $ = help.load(data);
        var topContent = $(".list.joke.joke-item");
        joke.Content = topContent.find(".clearfix.mt-15").eq(0).html();
        var zan = parseInt(topContent.find(".clearfix.mt-20.joke-item-footer .fl a").eq(0).text());
        var bishi = parseInt(topContent.find(".clearfix.mt-20.joke-item-footer .fl a").eq(1).text());
        var weight = ((zan + bishi) / 100) * (zan - bishi * 3);
        joke.Url = url;
        joke.Weight = parseInt(weight) ;
        joke.Flag = getFlag(url);
        cont(null, joke);
    });
};

haha.getCurrent = function () {
    //从某个页面得到当前热门推荐
    help.getUrlThen(exurl).then(function (cont, data) {
        var $ = help.load(data);
        //解析出所有的热门推荐笑话的url 包括图片笑话和文字笑话
        var imgJokes = _.map($(".recommand-joke-main-list-thumbnail .joke-text.word-wrap a"), function ($a) {
            return "http://www.haha.mx" + $a.attribs.href;
        });
        var textJokes = _.map($(".recommand-joke-main-list-text  a"), function ($a) {
            return "http://www.haha.mx" + $a.attribs.href;
        });
        var urls = _.union(imgJokes, textJokes);


        //遍历  检查是否已经爬取过
        _.each(urls, function (url) {
            then(function (cont) {
                 collection.findOne({Url: url},{}, cont);
            }).then(function (cont, doc) {
                if (doc) {
                    help.showExist("url: " + url + "  is already exist :");
                } else {
                    haha.getModelThen(url)
                        .then(function (cont, model) {
                            model.AddedTime = new Date();
                            collection.insert(model,cont);
                        }).then(function (cont, doc){
                            help.log("model is insert :" + doc.Url);
                        }).fail(function (cont, err){
                            help.log(err);
                        });
                }
            }).fail(function (cont, error) {
                help.log(error);
            });
        });
    });
};

haha.runBackSpider = function () {
    try {
       // haha.getCurrent();
        haha.task = setInterval(haha.getCurrent, 30 * 60 * 1010);
    }
    catch (e) {
        console.log(e);
    }
};
haha.stopBackSpider = function () {
    clearInterval(haha.task);
};
haha.test = function () {
   //haha.getCurrent();
};
module.exports = haha;

//haha.runBackSpider();
haha.test();