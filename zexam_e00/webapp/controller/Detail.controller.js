sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("zexame00.controller.Detail", {
        onInit() {
            // 모델 적용 방안 
            // 1. manifest.json 에 모델 등록해서, 전역모델로 사용
            //    => 전역모델의 경우 Main,Detail 모두 접근 가능. 따라서 별도의 내부 데이터 추가해서 사용해도 무방함.
            // 2.(현재로직) Detail.view.xml 에 모델 등록해서, 지역모델로 사용 (원본 데이터 동일)
            let oModel = new JSONModel();
            oModel.loadData("../model/data.json", {}, false);
            this.getView().setModel(oModel, "detail");

            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
        },
        _onPatternMatched: function(oEvent) {
            let sKey = oEvent.getParameter("arguments").key; // student_id
            let aStudents = this.getView().getModel("detail").getProperty("/Students");

            let oSelectedItem = aStudents.find(item => item.student_id === sKey); // 배열함수 find 사용

            // JSON Data는 Object이고, Object는 새로운 요소를 추가할 수 있음
            this.getView().getModel("detail").setProperty("/item", oSelectedItem);
        },
        onNavPress: function() {
            this.oRouter.navTo("RouteMain");
        }
    });
});