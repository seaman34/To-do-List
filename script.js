var zIndex = 1;

class cells {
    cell;
    constructor(cell) {
        this.cell = cell;
    }

    grab() {
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
    method;
    constructor(button,method){
        this.button = button;
        this.method = method;
    }
    createCell() {
        var newDiv = document.createElement("div");
        var newSpan = document.createElement("span");
        newSpan.innerHTML = "new notice"
        newDiv.append(newSpan);
        newDiv.classList.add("cell");
        document.querySelector(".freeArea").appendChild(newDiv);
        arrayCell.push(new cells(newDiv));
        arrayCell[arrayCell.length - 1].grab();

    }
}

var arrayCell = [
    new cells(document.querySelectorAll(".cell")[0]),
];

var arrayButtons = [
    copy = new buttons(undefined,undefined),
    createButton = new buttons(document.getElementById("createCell"),copy.createCell),
];
//включаем кнопки
function turnOn(){
    arrayCell[0].grab();
    arrayButtons.forEach(element => {
        try{
            element.button.addEventListener("click", () => {
                element.method();
            });
        }catch{
            console.error("undefined passed")
        }
    });
}

turnOn();