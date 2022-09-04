export default class ToDoArr {
    arrayList = [];

    addVal = function (value) {
        this.arrayList.push(value);
    }

    findComp = function (tempID) {
        let tempD = -1;
        this.arrayList.map((valueToDo, indexToDo) => { 
            if (valueToDo.id == tempID) {
                tempD = indexToDo;
            }
         })
         return tempD;
    }

    removeVal = function (tempID) {
        let indexTD = this.findComp(tempID);

        if (indexTD > -1) {
            this.arrayList.splice(indexTD, 1);
        }
    }
}