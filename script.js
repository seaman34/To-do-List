var zIndex = 1;

class cells {
    cell;
    constructor(cell) {
        this.cell = cell;
    }

    tracking() {
        let MouseDown = false;
        this.cell.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.cell.style.zIndex = zIndex;
                MouseDown = true;
            }
        });
        this.cell.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                MouseDown = false;
                zIndex++;
            }
        });
        document.addEventListener("mousemove", (event) => {
            if (MouseDown) {
                this.cell.style.top = event.clientY - this.cell.offsetHeight / 2 + "px"; 
                this.cell.style.left = event.clientX - this.cell.offsetWidth / 2 + "px"; 
            }
        });
    }
}
class buttons{
    button;
    constructor(button){
        this.button = button;
    }
    createCell() {
        var newd = document.createElement("div");
        newd.classList.add("cell");
        newd.innerHTML = "new"
        document.querySelector(".freeArea").appendChild(newd);
        newd.style.left = "65%";
        containers.push(new cells(newd));
        turnOn();

    }
}
//надо изменить
containers = [
    new cells(document.querySelectorAll(".cell")[0]),
];
var arayButtons = [
    createButton = new buttons(document.getElementById("createCell")),
];

createButton.button.addEventListener("click", () => {
    createButton.createCell();
});
function turnOn(){
    containers.forEach(element => {
        element.tracking();
    });
}
//
turnOn();