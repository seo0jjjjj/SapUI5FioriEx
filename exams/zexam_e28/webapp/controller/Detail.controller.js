sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  (Controller, JSONModel) => {
    ("use strict");
    return Controller.extend("exam.zexame28.controller.Detail", {
      // student_id를 통해 해당 데이터의 index를 가져오는 함수
      _getStudentIndexById(studentId) {
        const students = this.getView().getModel().getProperty("/Students");
        let index = -1;

        // student_id로 index찾기
        for (let i = 0; i < students.length; i++) {
          if (students[i].student_id !== studentId) continue;
          index = i;
        }
        // 해당 학생이 없을 시, false 반환
        if (index === -1) return false;

        return index;
      },

     

      onInit() {
        // 라우트에서 파라메터 가져오기
        this.getOwnerComponent()
          .getRouter()
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPartternMatched, this);
      },
      // 페이지 뒤로가기 버튼
      onNavBack() {
        this.getOwnerComponent().getRouter().navTo("RouteMain");
      },

      // 파라메터에서 데이터 가져오기
      _onPartternMatched(oEvent) {
        const { studentId } = oEvent.getParameter("arguments");
        const index = this._getStudentIndexById(studentId);

        // this.byId("idSimpleForm").bindElement(`/Students/${index}`);
        this.byId("idPageDetail").bindElement(`/Students/${index}`);
      },
      // 변경 버튼
     
    });
  },
);
