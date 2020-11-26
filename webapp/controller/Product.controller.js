sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "companyRepo/appName/helper/Globals"
  ],
  function(Controller, Globals) {
    "use strict";
    var me;

    function onRouteChange() {
      if (me.getView() && Globals.getProductKey()) {
        let bindingPath = "/Products(" + Globals.getProductKey() + ")";
        me.getView().byId("productObjectHeader").bindObject(bindingPath);
        //        me.getView().byId("productObjectHeader").setBindingContext(new sap.ui.model.Context(me.getView().getModel(), bindingPath));
      }
    }

    return Controller.extend("companyRepo.appName.controller.Product", {
      onInit: function() {
        me = this;
        let router = sap.ui.core.UIComponent.getRouterFor(this);
        router.getRoute("routeProduct").attachPatternMatched(onRouteChange)
      },
      onRouteChange: onRouteChange
        // createProduct: function(event) {
        //   sap.m.MessageToast.show(event.getSource().getText() + " Pressed");
        //   let model = this.getView().getModel();
        //   model.create("/Products", { "ID": "921", "Name": "Test", "Description": "Test description" });

      // },
      // onProductPress: function(event) {
      //   Globals.setProductKey(15);
      //   console.log(Globals.getProductKey());
      //   sap.ui.core.UIComponent.getRouterFor(this).navTo("routeProduct");
      // }
    });
  }
);
