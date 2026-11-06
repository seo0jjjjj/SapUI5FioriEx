sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  (Controller, JSONModel, Filter, FilterOperator, MessageToast) => {
    "use strict";

    return Controller.extend("exam.zexame28.controller.Main", {
      // Dialog를 생성 및 띄우는 함수
      //  dialogName : string
      //  데이얼로그 파일 이름
      //  func? : function
      //  다이얼로그 생성시 실행할 함수
      _openDialog(dialogName, func = () => {}) {
        if (typeof dialogName !== "string")
          throw new sap.ui.model.ValidateException(
            "_openDialog내 Parameter는 String 이어야함.",
          );

        // 다이알로그 재사용을 위한 if문
        if (!this[dialogName]) {
          this[dialogName] = this.loadFragment({
            name: `exam.zexame28.view.${dialogName}`,
          });
        }
        this[dialogName].then((d) => {
          func(d);
          d.open();
        });
      },

      // id를 통해 input 컨트롤의 value를 가져오는 함수
      _getInputValue(id) {
        return this.getView().byId(id)?.getValue();
      },

      onInit() {
        //Dialog에서 사용하는 모델
        const dModel = new JSONModel({
          Class: [
            { class: "CL1", class_name: "1반" },
            { class: "CL2", class_name: "2반" },
            { class: "CL3", class_name: "3반" },
            { class: "CL4", class_name: "4반" },
            { class: "CL5", class_name: "5반" },
            { class: "CL6", class_name: "6반" },
            { class: "CL7", class_name: "7반" },
          ],
        });
        this.dModel = dModel;

        this.getView().setModel(dModel, "dModel");

        // 3-1 stduents 데이터는 manifest.json에서 데이터 들고오는걸로 수정
        // const sModel = new JSONModel("../model/students.json");
      },

      // 조회 버튼 눌렀을 때 이벤트 핸들러
      onSearch() {
        const text = this.byId("idInput").getValue();

        // 1-3  입력 값을 지우고 검색 클릭 시 전체 조회 되도록 한다.
        if (!text.trim()) {
          this.byId("idTable").getBinding("rows").filter([]); // 필터초기화
          return;
        }

        this.byId("idTable")
          .getBinding("rows")
          .filter(new Filter("class", FilterOperator.EQ, text));
      },
      // 다이알로그 내 닫기 버튼 눌렀을 때
      onClose(oEvent) {
        this.byId("idComboBox").getSelectedKey();
        oEvent.getSource().getParent().close();
      },

      onSave(oEvent) {
        const path = this.getView()
          .byId("idDialogSimpleForm")
          .getBindingContext()?.sPath;
        const prevData = this.getOwnerComponent().getModel().getProperty(path);
        const newData = {
          ...prevData,
          name: this._getInputValue("idInputName"),
          age: this._getInputValue("idInputAge"),
          gender: this._getInputValue("idInputGender"),
          class: this.byId("idComboBox").getSelectedKey(),
          grade_level: this._getInputValue("idInputGradeLevel"),
          phone_number: this._getInputValue("idPhoneNumber"),
        };

        console.log("new data", newData);
        console.log("path", path);

        this.getOwnerComponent().getModel().setProperty(path, newData);

        this.onClose(oEvent); // 창 종료
      },

      // input 옆 버튼
      onValueHelpRequest() {
        this._openDialog("Dialog");
      },

      //다이알로그 속 row 선택 시
      onDialogRowSelected(oEvent) {
        const path = oEvent.getParameter("rowContext").sPath;

        const className = this.getView()
          .getModel("dModel")
          ?.getProperty(path)?.class;

        //input 값 변경
        this.byId("idInput").setValue(className);

        // 창 닫기
        this.onClose(oEvent);
      },

      onPressDetail(oEvent) {
        const studentId = oEvent
          .getSource()
          .getParent()
          .getBindingContext()
          .getProperty("student_id");
        this.getOwnerComponent().getRouter().navTo("RouteDetail", {
          studentId,
        });
      },

      // 변경 버튼 누를 시,
      onPressChange(oEvent) {
        // this.getOwnerComponent().getModel().refresh(true);

        // 선택된 index (선택없을 시, -1)
        const index = oEvent
          .getSource()
          .getParent()
          .getParent()
          .getSelectedIndex();

        // 선택한 index가 없을 경우 메세지 출력
        if (index === -1) {
          MessageToast.show("변경할 데이터를 선택해주세요.");
          return;
        }
        this._openDialog("DialogEdit", (dialog) => {
          this.byId("idDialogSimpleForm").bindElement(`/Students/${index}`);

          //   dialog.setModel(this.dModel, "dModel");
          //   this.byId("idSelectClass").bindElement({
          //     path: "/Class",
          //     model: "dModel",
          //   });
        });
      },

      onSelectChange(oEvent) {
        debugger;
      },
    });
  },
);
