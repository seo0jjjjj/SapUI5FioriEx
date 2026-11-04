sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "use strict";
    return Controller.extend("github.seo0jjjjj.zproge2807.controller.Detail", {
        onInit() {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteDetail")
                .attachPatternMatched(this._onPartternMatched, this);
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteMain");
        },
        _onPartternMatched(oEvent) {
            const { paramOrder, op } = oEvent.getParameter("arguments");
            console.log(paramOrder, op);

            this.byId("idTable").bindRows({
                path: `/Orders/${paramOrder}/Item`,
            });

        }

    });
});