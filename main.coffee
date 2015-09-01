require.config
  urlArgs: {
    "scripts/*": "v=" + (new Date - 0)
#"*": "v=" + "0.0.0.1"
  },
  paths: {
    "lib": "Content/libs",
    "sc": "Scripts",
    "pub": "scr/Public",
    "util": "public/util"
    "jquery": "content/libs/jquery-ui-1.10.4/js/jquery-1.10.2.js"
    "bootstrap": "content/libs/bootstrap/js/bootstrap.js"
    #"app": "content/libs/AdminLTE-2.0.3/dist/js/app.js"
    "app": "Scripts/Public/app2.js"
    "lodash": "content/libs/lodash/lodash.js"
  },
  shim: {
    bootstrap:{
      deps:["jquery"],
      exports: '$'
    },
    app:{
      deps: ["bootstrap"]
      exports: '$'
    }
  }


require ["sc/index/main_index"],(index)->
  index.init()







