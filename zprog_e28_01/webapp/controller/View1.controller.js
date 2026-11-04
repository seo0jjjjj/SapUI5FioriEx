sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";
    return Controller.extend("btp.zproge2801.controller.View1", {
        onInit : function(){
            const input = this.getView().byId("idTestInput");
            input.setValue("기본값 세팅");
        },
        onClick(oEvent){
            console.log(oEvent);
            sap.m.MessageToast.show(this.byId("idTestInput").getValue())
        },
        onChange(){
           MessageBox.error("change called!");
        },
        onSubmit(){
            sap.m.MessageToast.show("on submit!");
        },
        onT2Submit(){
            this.byId("t1").setText(this.byId("i1").getValue())
        },
        onPressNextPage(){
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        fnSet :{ onClick(){
            sap.m.MessageToast.show(this.byId("idTestInput").getValue())
        }

        }
    });
}); 