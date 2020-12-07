sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
  ],
  function(Controller, History) {
    "use strict";
    var me;
    var newProductModel;

    function onRouteChange() {
      newProductModel = new sap.ui.model.json.JSONModel();
      newProductModel.setData({ ID: 1, Name: "Name", Description: "Some desc", ReleaseDate: null, Rating: 0, Price: "0", DiscontinuedDate: null })
      me.getView().byId("productForm").setModel(newProductModel, "newProduct");
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

    function getCheckIdExistPromise(id) {
      return new Promise(function(resolve, reject) {
        let path = "/Products(" + id + ")";
        me.getView().setBusy(true);
        me.getView().getModel().read(path, {
          success: function() {
            me.getView().setBusy(false);
            //            resolve(id) <- this would not work, as id is out of context
            resolve();
          },
          error: function() {
            me.getView().setBusy(false);
            reject();
          }
        });
      });
    }

    function onAdd() {
      //Check if ID and Name are filled
      console.log(newProductModel.getData().toString());
      let id = newProductModel.getProperty("/ID");
      getCheckIdExistPromise(id).then(function() {
          sap.m.MessageToast.show("ID is already taken!");
        },
        function() {
          let model = me.getView().getModel();
          me.getView().setBusy(true);
          let newProductData = newProductModel.getData();
          model.create("/Products", newProductData, {
            error: (error) => {
              console.error(error);
              me.getView().setBusy(false);
              sap.m.MessageToast.show("Create operation failed");
            },
            success: () => {
              me.getView().setBusy(false);
              navigateBack();
            }
          });
        })
    }

    function onIdCheck() {
      let id = newProductModel.getProperty("/ID");
      getCheckIdExistPromise(id).then(function() {
          sap.m.MessageToast.show("ID is already taken!");
        },
        function() {
          sap.m.MessageToast.show("ID is free!");
        })
    }

    function onCancel() {
      me.getView().getModel().resetChanges();
    }


    return Controller.extend("companyRepo.appName.controller.Product", {
      onInit: function() {
        me = this;
        let router = sap.ui.core.UIComponent.getRouterFor(me);
        router.getRoute("routeNewProduct").attachPatternMatched(onRouteChange)
      },
      onRouteChange: onRouteChange,
      navigateBack: navigateBack,
      onIdCheck: onIdCheck,
      onAdd: onAdd,
      onCancel: onCancel
    });
  });
