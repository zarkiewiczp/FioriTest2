sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "companyRepo/appName/helper/Globals",
    "sap/ui/core/routing/History"
  ],
  function(Controller, Globals, History) {
    "use strict";
    var me;

    function onRouteChange() {
      //If application is loaded from Product view - return to main app view
      if (!Globals.getProductKey()) {
        navigateBack();
        return;
      }

      if (me.getView()) {
        let bindingPath = "/Products(" + Globals.getProductKey() + ")";
        me.getView().byId("productObjectHeader").bindObject(bindingPath);
      }
    }

    function navigateBack() {

      let history = History.getInstance();
      let previousHash = history.getPreviousHash();

      if (previousHash) {
        window.history.go(-1);
      } else {
        sap.ui.core.UIComponent.getRouterFor(me).navTo("routeMain");
      }

    }

    return Controller.extend("companyRepo.appName.controller.Product", {
      onInit: function() {
        me = this;
        let router = sap.ui.core.UIComponent.getRouterFor(me);
        router.getRoute("routeProduct").attachPatternMatched(onRouteChange)
      },
      onRouteChange: onRouteChange,
      navigateBack: navigateBack
    });
  }
);
