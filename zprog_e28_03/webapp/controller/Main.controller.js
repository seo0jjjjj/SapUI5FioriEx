sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageToast, MessageBox, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("zproge2803.controller.Main", {
        onInit() {
            this.hid = 0;
            const oModel = new JSONModel("../model/calc.json");
            this.getView().setModel(oModel, "calc");
            this.getView().setModel(new JSONModel("../model/history.json", "history"), "history");
        },
        onRowSelectionChanged(oEvent) {
            this.currentId = oEvent.getParameters("arguments")?.rowContext?.getProperty("id");
        },

        onPressDelete() {
            // debugger;
            // if (!Number.isFinite(this.currentId)) return;
            // const model = this.getView().getModel("history");

            // model?.setProperty(`/History/${this.currentId}/visible`, false);

            // console.log(model.getData()?.Hisotry);

            // this.byId("idTable").getBinding("rows").filter(new Filter("visible", FilterOperator.EQ, true));
            const index = this.byId("idTable").getSelectedIndex();
            this.getView().getModel("history").getProperty("/History").splice(index, 1);

            this.getView().getModel("history").refresh(true);

            debugger;
        },

        onToggleChange() {
            const currentState = this.byId("input").getEditable();
            const controls = ["input", "select", "input2"]

            controls.forEach(
                (control) =>
                    this.byId(control).setEditable(!currentState));

            this.byId("btnSwitch").setText(currentState ?
                "잠금" :
                "시작");
        },

        onCal() {
            const var1 = +this.byId("input").getValue();
            const var2 = +this.byId("input2").getValue();
            const oper = this.byId("select").getSelectedKey();

            //  if(oper === "/" && var2 === 0) {
            //     MessageBox.show("infinity");
            //     return;
            //  }          
            if (
                !Number.isFinite(var1) ||
                !Number.isFinite(var2)
            ) return;

            const cal = {
                "+": (a, b) => a + b,
                "-": (a, b) => a - b,
                "*": (a, b) => a * b,
                "/": (a, b) => a / b,
            }
            sap.m.MessageToast.show("" + cal[oper](var1, var2));

            const arr = this.getView().getModel("history").getData().History;
            arr.push({
                id: this.hid++,
                var1,
                var2,
                oper,
                result: cal[oper](var1, var2),
                visible: true
            });

            this.getView().getModel("history").refresh();
        }
    });
});