import ToDo from "../service/ToDo.js";
import ToDoArr from "../service/ArrList.js";
import CompleteList from "../service/CompleteList.js";

let toDoArr = new ToDoArr();
let completeList = new CompleteList();

let getELE = id => document.getElementById(id);

let autoReload = (array) => {
    if (array.length == 0) {
        window.location.reload();
    }
}

let formatID = () => {
    for (let i = 0; i < toDoArr.arrayList.length; i++) {
        toDoArr.arrayList[i].id = i;
    }
    setToDoLocal();
}

// creat local
let setComplLocal = () => localStorage.setItem("ComplTaskLocal", JSON.stringify(completeList.arrayList));

// get local
let getComplLocal = () => {
    if (localStorage.getItem("ComplTaskLocal") != undefined) {
        completeList.arrayList = JSON.parse(localStorage.getItem("ComplTaskLocal"));
    }
}
getComplLocal();

//hien thi UI
let showToDo = arrayList => {
    let content = "";
    let idList = 0;
    arrayList.map(value => {

        content += `

            <li class= "" id= "${idList++}">
            ${value.content}
                <div>
                    <button onclick= "removeToDo(${value.id})" class= "remove__btn">
                    <i class="fa-regular fa-trash"></i>
                    </button> 
                    <button onclick= "checkList(${value.id})" class= "check__btn">
                    <i class="far fa-check-circle"></i>
                    </button>
                </div>
            </li>
        `;

        getELE("todo").innerHTML = content;

    });
}

let setToDoLocal = () => localStorage.setItem("ToDoLocal", JSON.stringify(toDoArr.arrayList));

let getToDoLocal = () => {
    //check data
    if (localStorage.getItem("ToDoLocal") != undefined) {
        toDoArr.arrayList = JSON.parse(localStorage.getItem("ToDoLocal"));
    }
    showToDo(toDoArr.arrayList);
}
getToDoLocal();

//them
let addToDo = () => {
    let inputToDo = getELE("newTask").value;
    let objList = new ToDo(inputToDo);

    toDoArr.addVal(objList);
    formatID();

    showToDo(toDoArr.arrayList);
    getELE("newTask").value = "";
}

getELE("addItem").onclick = addToDo;
window.addToDo = addToDo;

//xoa
let removeToDo = id => {
    toDoArr.removeVal(id);
    formatID();

    showToDo(toDoArr.arrayList);
    autoReload(toDoArr.arrayList);
}

window.removeToDo = removeToDo;

//kiemtra

let checkList = id => {

    let getToDoVal = document.querySelectorAll("#todo li");

    for (let i = 0; i < getToDoVal.length; i++) {
        if (id == getToDoVal[i].id) {
            completeList.addCompVal(toDoArr.arrayList[id]);

            setComplLocal();
            showComplete(completeList.arrayList);
            toDoArr.removeVal(id);
            formatID();

            showToDo(toDoArr.arrayList);
            autoReload(toDoArr.arrayList);
        }
    }
}
window.checkList = checkList;

//onclick
let checkTDL = () => {
    for (let i = 0; i < toDoArr.arrayList.length; i++) {
        completeList.arrayList.push(toDoArr.arrayList[i]);
    }
    setComplLocal();
    showComplete(completeList.arrayList);

    toDoArr.arrayList = [];
    setToDoLocal();
    showToDo(toDoArr.arrayList);

    autoReload(toDoArr.arrayList);
}

getELE("one").onclick = checkTDL;
window.checkTDL = checkTDL;

//Sap xep A -> Z
let shortAZ = () => {
    let arrayList2 = [];

    for (let i = 0; i < toDoArr.arrayList.length; i++) {
        arrayList2.push(toDoArr.arrayList[i].content);
    }
    arrayList2.sort();

    for (let k = 0; k < toDoArr.arrayList.length; k++) {
        toDoArr.arrayList[k].content = arrayList2[k];
        setToDoLocal();
    }
    showToDo(toDoArr.arrayList);
}

getELE("two").onclick = shortAZ;
window.shortAZ = shortAZ;

//Sap xep Z -> A

let shortZA = () => {
    let arrayList2 = [];

    for (let i = 0; i < toDoArr.arrayList.length; i++) {
        arrayList2.push(toDoArr.arrayList[i].content);
    }

    arrayList2.sort();
    arrayList2.reverse();

    for (let u = 0; u < toDoArr.arrayList.length; u++) {
        toDoArr.arrayList[u].content = arrayList2[u];

        setToDoLocal();
    }
    showToDo(toDoArr.arrayList);
}

getELE("three").onclick = shortZA;

window.shortZA = shortZA;

// hien thi clocal
let showComplete = arrayComplete => {
    let content = "";
    arrayComplete.map(value => {

        content += `
            <li>
                ${value.content}
                <div>
                    <button onclick= "removeComplete(${value.id})" class= "remove__btn">
                    <i class="fa-regular fa-trash"></i>
                    </button> 
                    <button class= "check__btn">
                    <i class="far fa-check-circle"></i>
                    </button>
                </div>
            </li>
        `;

        getELE("completed").innerHTML = content;
    })
}

showComplete(completeList.arrayList);

//remove
let removeComplete = id => {
    completeList.deleteComplVal(id);
    setComplLocal();
    showComplete(completeList.arrayList);

    autoReload(completeList.arrayList);
}
window.removeComplete = removeComplete;

//format
let formatID2 = () => {
    if (completeList.arrayList.length > 0) {
        for (let i = 0; i < completeList.arrayList.length; i++) {
            completeList.arrayList[i].id = i;
            setComplLocal();
        }
    }
}

formatID2();
