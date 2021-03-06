// Generated by CoffeeScript 1.9.3
(function() {
  defineb(["lib/avalon/mmRouter/mmRouter"], function(avalon) {
    var callback, indexModel, init, obj;
    indexModel = avalon.define("msTopContent", function(vm) {
      vm.showContent = true;
      vm.crumbs = [];
      vm.contentUrl = "pages/home/index.html";
      vm.pageName = "Home";
      vm.pageDescription = "pageDescription";
    });
    avalon.history.start();
    callback = function(p1, p2, p3) {
      var hash;
      hash = _.template("pages/<%=controller%>/<%=action%>.html")(this.params);
      delete avalon.templateCache[hash];
      if (this.path === "/") {
        return indexModel.contentUrl = "home/index.html";
      } else {
        avalon.router.setLastPath(this.path);
        indexModel.contentUrl = hash;
        return indexModel.pageName = this.path;
      }
    };
    avalon.router.get("/{controller}/{action}", callback);
    init = function() {
      return avalon.scan();
    };
    obj = {
      model: indexModel,
      init: init
    };
    return obj;
  });

}).call(this);

//# sourceMappingURL=main_index.js.map
