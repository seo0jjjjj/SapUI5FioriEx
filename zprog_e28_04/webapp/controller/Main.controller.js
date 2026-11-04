sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
], (Controller, JSONModel,Fragment) => {
    "use strict";

    return Controller.extend("github.seo0jjjjj.zproge2804.controller.Main", {
        onInit() {
            this.model = new JSONModel({
                name:"홍길동",
                age:28
            });

            this.getView().setModel(this.model,"모델이름");
        },
        
        onFragmentButton(){
            sap.m.MessageToast.show("helloworld!");
        },

        openDialog(){
            console.log("1111");
            
            if(!this.dialog){
                this.dialog = this.loadFragment({
                name:"github.seo0jjjjj.zproge2804.view.fragment.MyDialog",
                
            });
        }
            this.dialog.then((d)=>d.open());
            
        },

         openDialogUI(){
            if(!this.dialog2){
                this.dialog2 = this.loadFragment({
                name:"github.seo0jjjjj.zproge2804.view.fragment.UserInput",
                
            });
        }
            this.dialog2.then((d)=>d.open());
        },

        onClose(){
            this.byId("idDialog").close();
            console.log(this.dialog);
            
        },
         onCloseUI(oEvent){
            // this.byId("idDialogUI").close();
            oEvent.getSource().getParent().getParent().close();
            sap.m.MessageToast.show(`이름 : ${this.byId("idInputName").getValue()} \n 취미 : ${this.byId("idInputHobby").getValue()}`)
            console.log(this.dialog);
            
        },
        loadMyFragment(){
            let oDialog = sap.ui.getCore().byId("idDialog");

            if(oDialog){
                oDialog.open();
                return;
            }

            Fragment.load({
                name : "github.seo0jjjjj.zproge2804.view.fragment.UserInput",
                type : "XML",
                controller : this
            }).then((fragment)=>fragment.open());
        },

        closeDialog(){
            
        }
    });
});