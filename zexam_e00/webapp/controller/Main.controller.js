sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("zexame00.controller.Main", {
      onInit() {
        let oModel = new JSONModel();
        oModel.loadData("../model/data.json", {}, false);
        this.getView().setModel(oModel); // 학생 정보

        let oClassModel = new JSONModel();
        oClassModel.loadData("../model/class.json", {}, false);
        this.getView().setModel(oClassModel, "class"); // ValueHelp 학급 정보

        this.getView().setModel(new JSONModel(), "dialog"); // 변경데이터 관리

        //################################ 추가 ###############
        this.getView().getModel("dialog").setDefaultBindingMode("OneWay");
      },
      onPress: function () {
        let sValue = this.byId("idInput").getValue(); // ""
        let oTable = this.byId("idTable");
        let aFilter = [];

        // "  cl2  ".trim().toUpperCase();
        if (sValue) {
          aFilter.push(new Filter("class", FilterOperator.EQ, sValue));
        }

        oTable.getBinding("items").filter(aFilter);
      },
      //=========================================== Dialog function START ========================================
      onValueHelpRequest: function (oEvent) {
        //let that = this;
        if (!this.pClassDialog) {
          this.pClassDialog = this.loadFragment({
            name: "zexame00.view.fragment.ClassDialog",
          });
        }

        this.pClassDialog.then(function (oDialog) {
          //that.byId("idClassTable").removeSelections();
          oDialog.open();
        });
      },

      onUpdatePress: function () {
        let oDialogModel = this.getView().getModel("dialog");
        let oItem = this.byId("idTable").getSelectedItem();

        if (oItem) {
          let obj = oItem.getBindingContext().getObject();
          //   let obj_copy = JSON.parse(JSON.stringify(obj));

          /* 여기서 문제 발생 
                    사용자가 값 변경 후 [저장]하지 않고 [닫기]했는데, 이전에 변경했던 값을 계속 들고 있는 상황
                    원본 데이터로 세팅되지 않는 문제가 발생함 => 얕은복사, 깊은복사 찾아보기
                    (Sample)
                    let obj_copy = JSON.parse(JSON.stringify(obj));
                */

          oDialogModel.setData(obj);
          oDialogModel.refresh(true);

          if (!this.pStudentDialog) {
            this.pStudentDialog = this.loadFragment({
              name: "zexame00.view.fragment.StudentManage",
            });
          }
          this.pStudentDialog.then(function (oDialog) {
            oDialog.open();
          });
        } else {
          sap.m.MessageToast.show("변경할 데이터를 선택해주세요.");
        }
      },

      onClose: function (oEvent) {
        oEvent.getSource().getParent().close();
      },
      onDialogSelect: function (oEvent) {
        let selectedItem = oEvent
          .getParameter("listItem")
          .getBindingContext("class")
          .getObject();

        // 1번 방안 : this.byId("idInput").setValue(selectedItem.code);
        // 2번 방안(현재로직) : Input의 Value에 모델 바인딩 시켜놓은 후, 모델에 데이터 세팅 (two-way binding)
        let oModel = this.getView().getModel();
        oModel.setProperty("/searchClass", selectedItem.code);

        this.byId("idDialog").close();
      },

      onSave: function (oEvent) {
        let oModel = this.getView().getModel();
        let oData = this.getView().getModel("dialog").getData();
        let aStudents = oModel.getProperty("/Students");

        let results = aStudents.map(function (oItem) {
          if (oItem.student_id == oData.student_id) {
            oItem = oData;
          }
          return oItem;
        });

        oModel.setProperty("/Students", results);

        this.onClose(oEvent);
      },
      //=========================================== Dialog function END ==========================================
      onNavDetailPress: function (oEvent) {
        const oRouter = this.getOwnerComponent().getRouter();
        let sPath = oEvent.getSource().getParent().getBindingContextPath();
        let oItem = this.getView().getModel().getProperty(sPath);

        oRouter.navTo("RouteDetail", {
          key: oItem.student_id,
        });
      },
    });
  },
);
