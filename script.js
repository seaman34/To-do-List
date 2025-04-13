var zIndex = 1;
var isPaintMode = false;
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
    createCell(quantity = 1) {
        for(var i=0;i<quantity ;i++){
            var newDiv = document.createElement("div");
            var newSpan = document.createElement("span");
            newSpan.contentEditable = "true";
            newSpan.innerHTML = "new notice";
            newDiv.append(newSpan);
            newDiv.classList.add("cell");
            document.querySelector(".freeArea").appendChild(newDiv);
            arrayCell.push(new cells(newDiv));
            arrayCell[arrayCell.length - 1].grab();
        }
    }
    activePaint(){
        isPaintMode ? isPaintMode=false : isPaintMode=true;
        pointerEvent(isPaintMode);
    }
}
//paint =>
var canvas = document.querySelector("canvas");
canvas.classList.add("none-events");
var ctx = canvas.getContext("2d");
var isDrawing = false;
var x;
var y;
function pointerEvent(none){
    if(none){
        canvas.classList.remove("none-events");
        arrayCell.forEach((element,i) => {
            document.querySelectorAll(".cell")[i].classList.add("none-events");
        });
    }else{
        canvas.classList.add("none-events");
        arrayCell.forEach((element,i) => {
            document.querySelectorAll(".cell")[i].classList.remove("none-events");
        });
    }
}

function paint(e){
    if (!this.isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    x = e.offsetX;
    y = e.offsetY;
}
//paint <=
var arrayCopies=[
    copyButton = new buttons(undefined,undefined),
];
var arrayCell = [
    new cells(document.querySelector(".cell"))
];
var arrayButtons = [
    createButton = new buttons(document.getElementById("createCell"),copyButton.createCell),
    paintButton = new buttons(document.getElementById("paintButton"),copyButton.activePaint)
];
function getRandomColor() {
    const someColors = ["#d1c30a","#990850","#238510","#0a13c7","#ba4907","#990e84","#077d8f"];
    var color ;
    color = someColors[Math.floor(Math.random() * someColors.length)];
    return color;
}
//включаем 
function turnOn(){
    //кнопки
    arrayButtons.forEach(element => {
        try{
            element.button.addEventListener("click", () => {
                element.method();
            });
        }catch{
            console.error("undefined passed")
        }
    });
    //красим "paint"
    for(var i =0;i<6;i++){
        document.querySelectorAll(".rainbowLetter")[i].style.color = getRandomColor();
    }
    //заметка
    arrayCell[0].grab();
    //холст
    canvas.addEventListener("mousedown", (e) =>{
        isDrawing = true;
        x = e.offsetX;
        y = e.offsetY;
    });
    canvas.addEventListener("mouseout", (e)=>{
        paint(e);
        isDrawing = false;
    });
    canvas.addEventListener("mousemove", (e)=>{paint(e);});
    canvas.addEventListener("mouseup", (e)=>{isDrawing = false;});
}
turnOn();