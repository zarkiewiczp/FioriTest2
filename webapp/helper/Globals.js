sap.ui.define(
  ["sap/ui/base/ManagedObject"],
  function(ManagedObject) {
    "use strict";
    var Globals = ManagedObject.extend("companyRepo.appName.Globals", {
      metadata: {
        properties: {
          productKey: { type: "string" },
          supplierKey: { type: "string" }
        }
      },
    });

    return new Globals();
  }
);
