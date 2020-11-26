sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  function(Controller) {
    "use strict";

    return Controller.extend("companyRepo.appName.controller.Main", {
      createProduct: function(event) {
        sap.m.MessageToast.show(event.getSource().getText() + " Pressed");
        let model = this.getView().getModel();
        model.create("/Products", { "ID": "921", "Name": "Test", "Description": "Test description" });

      },
      onProductPress: function(event) {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("routeProduct");
      }
    });
  }
);
