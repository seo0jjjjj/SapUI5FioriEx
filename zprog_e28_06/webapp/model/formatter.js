sap.ui.define([
],()=>{
    "use strict";


    return {
        airlineText(sValue){
            if(!sValue) return;

            const airlineAlias = {
                "AA" : "American Airlines",
                "GL" : "Lufthansa",
                "AZ" : "Alitalia",
                "JL" : "Japen Airlines"
            }
            
            return airlineAlias[sValue] ?? sValue;
        },

        calSeat(left,total){
            return `${left}/${total}`
        }
    };
});