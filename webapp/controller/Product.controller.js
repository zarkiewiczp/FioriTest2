sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "companyRepo/appName/helper/Globals",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
  ],
  function(Controller, Globals, History, MessageBox) {
    "use strict";
    var me;

    function onRouteChange() {
      //If application is loaded from Product view - return to main app view
      if (!Globals.getProductKey()) {
        navigateBack();
        return;
      }

      let bindingPath = "/Products(" + Globals.getProductKey() + ")";
      me.getView().byId("productForm").bindElement(bindingPath);

      me.getView().byId("productCategorySelect").bindProperty("selectedItemId", bindingPath + "/Category/ID");
      me.getView().byId("productSupplierSelect").bindProperty("selectedItemId", bindingPath + "/Supplier/ID");

      me.getView().byId("productSuppliers").bindElement(bindingPath + "/Supplier");
      me.getView().byId("productCategories").bindElement(bindingPath + "/Category");

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
      //Options to save: 
      // 1. Update just single property
      // oModel.setProperty("Orders(123)/Account/AccountNumber", 123)

      // 2. Update whole object below certain path
      let context = me.getView().byId("productForm").getBindingContext();
      me.getView().getModel().update(context.getPath(), context.getObject(), {
        error: () => {
          sap.m.MessageToast.show("Save operation failed");
        },
        success: () => {
          sap.m.MessageToast.show("Save operation was successful");
        },
        refreshAfterChange: true
      });

      //3. Commit all changes at Odatamodel
      // me.getView().getModel().submitChanges({
      //   error: () => {
      //     sap.m.MessageToast.show("Save operation failed");
      //   },
      //   success: () => {
      //     sap.m.MessageToast.show("Save operation was successful");
      //   }
      // });
    }

    function onCancel() {
      let bindingPath = "/Products(" + Globals.getProductKey() + ")";
      // Provide array of paths to be cleared
      me.getView().getModel().resetChanges([bindingPath]);
    }

    function onDelete() {
      let i18nBundle = me.getView().getModel("i18n").getResourceBundle();
      let messageText = i18nBundle.getText("ProductDeleteText", [Globals.getProductKey()]);
      MessageBox.confirm(messageText, {
        onClose: (action) => {
          console.log(action);
          if (action === "OK") {
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
        },
        emphasizedAction: sap.m.MessageBox.Action.Cancel,
        initialFocus: sap.m.MessageBox.Action.Cancel,
      });
    }

    function isContinued(date) {
      let result = (date === null);
      return !result;
    }

    function productCategoryChange(event) {
      //This contains new value
      // event.getSource().getSelectedItem().getProperty("key")
      //Where to pick the old state of the property?
      //Workaround is to search for the item which matches this property: 
      //event.getSource().getBindingContext().getObject().Category.ID
      // and then extract the key of the item by:
      //      event.getSource().getItems()[1].getKey()
      // then if selection did change, delete old entry and create new before saving main entity change!

      //Check if custom data may help here!
      console.log(event);
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
      isContinued: isContinued,
      onCancel: onCancel,
      onDelete: onDelete,
      onProductCategoryChange: productCategoryChange
    });
  });
