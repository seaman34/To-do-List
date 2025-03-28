var zIndex = 1;

class cells {
    cell;
    constructor(cell) {
        this.cell = cell;
    }

    tracking() {
        this.MouseDown = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.cell.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.cell.style.zIndex = zIndex;
                this.MouseDown = true;
                this.offsetX = event.clientX - this.cell.getBoundingClientRect().left;
                this.offsetY = event.clientY - this.cell.getBoundingClientRect().top;
            }
        });
        document.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.MouseDown = false;
                zIndex++;
            }
        });
        document.addEventListener("mousemove", (event) => {
            if (this.MouseDown) {
                let x = event.clientX - this.offsetX;
                let y = event.clientY - this.offsetY;
                const containerRect = this.cell.parentElement.getBoundingClientRect();
                const boxRect = this.cell.getBoundingClientRect();
                x = Math.max(containerRect.left, Math.min(containerRect.right - boxRect.width, x));
                y = Math.max(containerRect.top, Math.min(containerRect.bottom - boxRect.height, y));
                this.cell.style.left = x + "px";
                this.cell.style.top = y + "px";
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