sap.ui.define([
    "sap/ui/core/UIComponent",
    "github/seo0jjjjj/zproge2806/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("github.seo0jjjjj.zproge2806.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});