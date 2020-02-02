var canvas;
var contexto;
var img;
var posx = 100, posy = 100
var arrOrigen, arrDestino;
var origen, destino;
var btnMover;
var idSw, btnConsulta;

function init() {
    arrOrigen = ["uno", "dos", "tres", "cuatro"];
    arrDestino = [];
    origen = document.getElementById("origen");
    destino = document.getElementById("destino");
    btnMover = document.getElementById("btnMover");
    cargaArregloSelect(arrOrigen, origen);
    cargaArregloSelect(arrDestino, destino);
    btnConsulta = document.getElementById("btnConsulta");
    idSw = document.getElementById("idSW");
    btnConsulta.onclick = cargaSWPeople;
    btnMover.onclick = moverDato;
    canvas = document.getElementById("lienzo");
    contexto = canvas.getContext('2d');
    img = new Image();
    img.src = 'img/nave.png';
    img.onload = () => contexto.drawImage(img, posx, posy);
    window.addEventListener("keydown", precionaTecla, false);
}
function moverDato() {
    if (origen.selectedIndex >= 0) {
        arrDestino.push(arrOrigen[origen.selectedIndex]);
        arrOrigen.splice(origen.selectedIndex, 1);
        cargaArregloSelect(arrOrigen, origen);
        cargaArregloSelect(arrDestino, destino);
    } else {
        alert ("Tiene que seleccionar un elemento");
    }
}

function cargaSWPeople() {
    http = new XMLHttpRequest();
    http.open('GET', "https://swapi.co/api/people/"+ idSw.value + "/", true);
    http.onload = function() {
        let data = JSON.parse(this.response)
        alert(data.name);
    }
    http.send();
}
function precionaTecla(e) {
    let diff = 8;
    switch (e.keyCode) {
        case 37 : //izq
            if (posx > 0) {
              posx = posx - diff;
            }
            break;
        case 38 : // up
            posy = posy - diff;
            break;
        case 39 : //der
            if (posx + img.width < canvas.width ) {
               posx = posx + diff;
            }
            break;
        case 40 : //abajo
            posy = posy + diff;
            break;
    }
    dibujarNave();
}

function dibujarNave() {
    contexto.clearRect(0,0, canvas.width, canvas.height);
    contexto.drawImage(img, posx, posy);
}

function cargaArregloSelect(arr, sel) {
    borraSelect(sel);
    arr.forEach(x => {
        let option = document.createElement("option");
        option.text = x;
        sel.add(option);
    });
}

function borraSelect(sel) {
    while (sel.options.length > 0) {
        sel.remove(0);
    }
}

init();