export default class CompleteList {
    arrayList = [];
     addCompVal = function(value) {
        this.arrayList.push(value);
     }

     complVal = function (ID) {
        let index = -1;
        this.arrayList.map((complValue, compI) => { 
            if (complValue.id == ID) {
                index = compI;
            }
         })
         return index;
    }     

    deleteComplVal = function (ID) {
        let index = this.complVal(ID);

        if (index > -1) {
            this.arrayList.splice(index, 1);
        }
    }
}