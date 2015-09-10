defineb ["lib/avalon/mmRouter/mmRouter"], (avalon)->
  indexModel = avalon.define "msTopContent", (vm)->
    vm.showContent = true; #content is load over
    vm.crumbs = [] #the crumbs on the top
    vm.contentUrl = "pages/home/index.html"
    vm.pageName = "Home"
    vm.pageDescription = "pageDescription"
    return

  avalon.history.start() #历史记录堆栈管理
  callback = (p1,p2,p3)->
    hash  = _.template("pages/<%=controller%>/<%=action%>.html")(this.params)
    #不缓存每次都重新加载 供测试
    delete avalon.templateCache[hash];
    if (this.path == "/")
      indexModel.contentUrl = "home/index.html";
    else
      avalon.router.setLastPath(this.path);
      indexModel.contentUrl = hash;
      indexModel.pageName = this.path;


  #avalon.router.get("/*path", callback);
  # 劫持url hash并触发回调
  avalon.router.get "/{controller}/{action}", callback
#    console.log(p1)
#    console.log(p2)
#    console.log(p3)
#    console.log(this)

  init = ()->
    avalon.scan()
#    hash = avalon.history.fragment
#    if (hash && hash != "/")
#      indexModel.contentUrl = hash
#    else
#      lastPath = avalon.router.getLastPath()
#      if (lastPath && lastPath != "/")
#        indexModel.contentUrl = lastPath
#      else
#        # host/#!/Home/ContextContent 如果都没命中 则填充默认页面
#        indexModel.contentUrl = "home/indexContent"


  obj = {
    model: indexModel
    init: init
  }
  return obj