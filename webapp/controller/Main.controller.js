sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "companyRepo/appName/helper/Globals"
  ],
  function(Controller, Globals) {
    "use strict";

    return Controller.extend("companyRepo.appName.controller.Main", {
      createProduct: function(event) {
        sap.m.MessageToast.show(event.getSource().getText() + " Pressed");
        let model = this.getView().getModel();
        model.create("/Products", { "ID": "921", "Name": "Test", "Description": "Test description" });
      },
      createSupplier: function(event) {
        sap.m.MessageToast.show(event.getSource().getText() + " Pressed");
        let model = this.getView().getModel();
        model.create("/Suppliers", { "ID": "666", "Name": "Test Supplier"});
      },
      onProductPress: function(event) {
        let key = event.getSource().getBindingContext().getProperty("ID");
        Globals.setProductKey(key);
        sap.ui.core.UIComponent.getRouterFor(this).navTo("routeProduct");
      },
      onSupplierPress: function(event) {
        let key = event.getSource().getBindingContext().getProperty('ID');
        Globals.setSupplierKey(key);
        sap.ui.core.UIComponent.getRouterFor(this).navTo("routeSupplier");
      }
    });
  }
);
