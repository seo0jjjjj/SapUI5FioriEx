
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "github/seo0jjjjj/zproge2806/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel"

], (Controller,myFormatter,
   Filter,
   FilterOperator,
   Fragment,
   Sorter,
   JSONModel
) => {
    "use strict";

    return Controller.extend("github.seo0jjjjj.zproge2806.controller.Main", {
        formatter : myFormatter,
        onInit() {
            const cModel = new sap.ui.model.json.JSONModel("../model/data.json");
            this.getView().setModel(cModel,"cModel");
            this.getOwnerComponent().setModel(new JSONModel({value2:"hello"}),"top");

            cModel.dataLoaded().then((data)=>{
                console.log(data);
            });
        },
        onSelectionChanged(oEvent){

            const ctx = oEvent.getParameters().listItem.getBindingContext("cModel");
            this.byId("idTable2").setBindingContext(ctx,"cModel");

            // path로 하기
            // const path = oEvent.getParameters().listItem.getBindingContextPath();
            // this.byId("idTable2").bindElement({
            //     path: path,
            //     model : "cModel"
            // })

            // console.log(path);
            
        },

        onPress()
        {
          const table1 = this.byId("idTable1");
        
          /*
          sPath : 기준이 되는 키
          sOperator : 오퍼레이터 정보
          vValue1 : 필터 대상
          vValue2 : 
          */
         const sPath = "CustomerName";
         const sOperator = FilterOperator.EQ; // equal
         const vValue1 = "장원영";
         const aFilter = [];

         
         const oFilter = new Filter(sPath,sOperator,vValue1);
         const oFilter1 = new Filter("PhoneNumber",FilterOperator.Contains,"88");
         aFilter.push(oFilter);
         aFilter.push(oFilter1);
         

         table1.getBinding("items").filter(aFilter);
            
        },
        onPress2(){
            this.byId("idTable1").getBinding("items").filter([]); // 필터초기화

        },
        openDialog(){
            const fragment = sap.ui.getCore().byId("idDialog");
            if(fragment) {
                fragment.open();
                return;
            }

            this.fragment = Fragment.load({
                name: "github.seo0jjjjj.zproge2806.view.fragment.MyFragment",
                type: "XML",
                controller: this
            });

            // this.fragment = this.loadFragment({
            //     name : "github.seo0jjjjj.zproge2806.view.fragment.MyFragment"
            // });
            this.fragment.then(fragment => {
                // fragment.setModel(new JSONModel({value:"name"}), "data");
                
                
                fragment.open();
                console.log(data);
                
            });
        },
        onClose(oEvent){
            // const name = core.byId("idInputName").getModel("data").getData().value;
            const name = this.getOwnerComponent().getModel("top").getProperty("/value2");

            this.byId("idTable1").getBinding("items").filter(
                new Filter(
                    "CustomerName",
                    FilterOperator.EQ,
                    name
                )
            );
            core.byId("idDialog").close();
        },
        sortPress(){
            this.toggle = !this.toggle ?? false;

            if(!this.toggle){
                oTable.getBinding("items").sort([]);
                return;
            }

            let oTable = this.byId("idTable2");
            let aSorter = [
                new Sorter("FlightDate", true), // 내림차순
                new Sorter("seatsOcc", false) // 오름차순
            ];

            oTable.getBinding("items").sort(aSorter);
        }


    });
});