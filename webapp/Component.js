sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/core/ComponentSupport"],
  function(UIComponent) {
    "use strict";
    return UIComponent.extend("companyRepo.appName.Component", {
      metadata: {
        manifest: "json",
      },
      init: function() {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);
        // Change odata model binding mode
        /* Important! Odata reference service has default mode "OneWay"
        because of that, in the very beginning of model initialization, before odata controls are bound to the view,
        default binding mode should be changed!*/
        let model = this.getRootControl().getModel();
        let twoWayMode = sap.ui.model.BindingMode.TwoWay;
        if (model.isBindingModeSupported(twoWayMode)) {
          model.setDefaultBindingMode(twoWayMode);
        }
        // create the views based on the url/hash
        this.getRouter().initialize();
      }
    });
  }
);
