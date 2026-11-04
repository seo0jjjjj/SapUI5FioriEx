sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], (Controller, Fragment) => {
    "use strict";

    return Controller.extend("github.seo0jjjjj.zproge2807.controller.Main", { // TODO: 경로 변경해야함.

        _navToDetail(paramOrder, op = "") {
            this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                paramOrder,
                ...(op ? { op } : {})
            });
        },
        /*  */
        _createDialog() {
            Fragment.load({
                name: "github.seo0jjjjj.zproge2807.view.OrderID", // TODO: 경로 변경해야함.
                controller: this
            }).then((dialog) => {
                this.dialog = dialog // Dialog 재사용을 위해 Controller 내 객체에 저장함.
            });


        },
        onInit() {
            this._createDialog(); // Fragment 생성 후 대기
            console.log(this.getOwnerComponent().getModel().getData().name); // 데이터 잘등록 됐는지 확인용
        },
        onValueHelpRequest() {
            // sap.m.MessageToast.show("ValueHelp 이벤트 실행");
            const dialog = sap.ui.getCore().byId("myDialog");

            if (!dialog) {// Fragment 로드가 안됐을 때
                this._createDialog(); // Fragment 다시 로드
            }

            dialog.setModel(this.getView().getModel()); // fragment에 Model 전달
            dialog.open(); // Dialog 팝업 띄우기


        },
        // Dialog 내 종료 버튼을 눌렀을 때 호출
        onClose(oEvent) {
            // 이벤트가 발생한 버튼 -> 부모(Dialog) -> Dialog.close()
            oEvent.getSource().getParent().close();
        },
        onNavDetail() {
            // Detail.View로 화면 이동
            this._navToDetail(123);
        },
        onRowSelectionChanged(oEvent) {
            const path = oEvent.getParameters().rowContext.sPath;
            this._navToDetail(path.replace("/Orders/", ""));

        }
    });
});