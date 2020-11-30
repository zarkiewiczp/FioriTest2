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

      let bindingPath = "/Products(" + Globals.getProductKey() + ")";
      me.getView().byId("productForm").bindObject(bindingPath);
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

    function onSave() {
      me.getView().getModel().submitChanges({
        error: () => {
          sap.m.MessageToast.show("Save operation failed");
        },
        success: () => {
          sap.m.MessageToast.show("Save operation was successful");
        }
      });
    }

    function onCancel() {
      me.getView().getModel().resetChanges();
    }

    function onDelete() {
      me.getView().getModel().remove("/Products(" + Globals.getProductKey() + ")", {
        method: "DELETE",
        success: function() {
          navigateBack();
        },
        error: function(e) {
          sap.m.MessageToast.show("Delete failed");
        }
      });
    }

    function onContinued(date) {
      let result = (date === null);
      return !result;
    }

    return Controller.extend("companyRepo.appName.controller.Product", {
      onInit: function() {
        me = this;
        let router = sap.ui.core.UIComponent.getRouterFor(me);
        router.getRoute("routeProduct").attachPatternMatched(onRouteChange)
      },
      onRouteChange: onRouteChange,
      navigateBack: navigateBack,
      onSave: onSave,
      isContinued: onContinued,
      onCancel: onCancel,
      onDelete: onDelete
    });
  }
);
