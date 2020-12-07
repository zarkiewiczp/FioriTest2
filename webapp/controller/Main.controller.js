sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "companyRepo/appName/helper/Globals"
  ],
  function(Controller, Globals) {
    "use strict";

    return Controller.extend("companyRepo.appName.controller.Main", {
      createProduct: function(event) {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("routeNewProduct");
        // sap.m.MessageToast.show(event.getSource().getText() + " Pressed");
        // let model = this.getView().getModel();
        // model.create("/Products", { "ID": "921", "Name": "Test", "Description": "Test description" });

      },
      onProductPress: function(event) {
        let key = event.getSource().getBindingContext().getProperty("ID");
        Globals.setProductKey(key);
        sap.ui.core.UIComponent.getRouterFor(this).navTo("routeProduct");
      }
    });
  }
);
