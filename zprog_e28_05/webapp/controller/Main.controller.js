sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("zproge2805.controller.Main", {
      _setDefault() {
        this.byId("idVBox").bindElement({
          path: "/name",
          model: "sec",
        });
      },

      onInit() {
        let oMainModel = this.getOwnerComponent()?.getModel("main");
        console.log("Main: ", oMainModel?.getData());

        const oModel = new JSONModel();
        oModel.loadData("../model/default.json", {}, false);
        console.log(oModel?.getData());

        this.obj = {
          name: {
            FirstName: "길동",
            LastName: "홍",
            FullName: "홍길동",
          },
        };

        const secModel = new JSONModel(this.obj);

        this.thirdModel = new JSONModel({
          CustomerName: "서윤오",
        });

        this.getView().setModel(oModel);
        this.getView().setModel(secModel, "sec");
        this.getView().setModel(this.thirdModel, "customer");
        this._setDefault();
      },

      onClick() {
        const cName = this.getView()
          .getModel("customer")
          .getData().CustomerName;
        this.getView().getModel("sec").setProperty("/name/FullName", cName);

        console.log(this.obj === this.getView().getModel("sec").getData());

        this.obj.name.DummyData = "Dummy";
        //console.log("DummyData : "+ this.getView().getModel("sec").getData().name.DummyData);

        // sap.m.MessageToast.show(JSON.stringify(this.getView().getModel("sec").getData(),null,2));
        sap.m.MessageToast.show(
          this.getView().getModel("myModel").getData().name,
        );
      },
      onSelectionChange(oEvent) {
        const path = oEvent
          .getParameters()
          .listItem.getBindingContext()
          .getPath();
        const name = this.getView()
          .getModel()
          .getProperty(path + "/name");

        this.byId("idItemTable").bindElement(path);
      },
      changeBindElement() {
        this.byId("idItemTable").bindElement("/");
      },
    });
  },
);
