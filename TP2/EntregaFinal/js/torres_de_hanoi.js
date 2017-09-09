// --------------------------------------------------------------- //
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dificultad = document.getElementById("dificultad");
const tIzqX = 25;
const tCenX = 325;
const tDerX = 625;
const tBaseY = 290;
const tWidth = 250;
const colorTorre = "#313131";
const colorDisco = "#28A094";
var torreIzq = [];
var torreCen = [];
var torreDer = [];
var discos = [];
var discoSelect = {
  discNro: null,
  origenX: 0,
  origenY: 0
};

// --------------------------------------------------------------- //
function dibujarTorre(x, y){
  ctx.fillStyle = colorTorre;
  ctx.fillRect(x,y,tWidth,5);
  ctx.fillStyle = colorTorre;
  ctx.fillRect((x + ((tWidth/2) - 4)),0,8,tBaseY);
}

function dibujarTorres(){
  dibujarTorre(tIzqX,tBaseY);
  dibujarTorre(tCenX,tBaseY);
  dibujarTorre(tDerX,tBaseY);
}

function Disco(nro, paramPosX, paramPosY, paramHeight, paramWidth){
  this.nro = nro;
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.Height = paramHeight;
  this.Width = paramWidth;
}

function reset(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarTorres();
  torreIzq = [];
  torreCen = [];
  torreDer = [];
  discos = [];
}

function dibujarDiscos(){
  startBtm.innerHTML = 'Volver a empezar';
  if (discos.length > 0){
    reset();
  }
  var dX = tIzqX;
  var dY = tBaseY - 26;
  var dWidth = tWidth;
  var dNro = 1;
  var dHeight = 25;
  for (var i = 0; i < dificultad.value; i++){
    torreIzq[i] = dNro;
    discos[i] = new Disco(dNro,dX,dY,dHeight,dWidth);
    ctx.fillStyle = colorDisco;
    ctx.fillRect(discos[i].posX,discos[i].posY,discos[i].Width,discos[i].Height);
    dWidth -= 26;
    dX += 13;
    dY -= 26;
    dNro += 1;
  }
}

function MousePos(e){
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(e.clientX - rect.left),
    y: Math.round(e.clientY - rect.top)
  };
}

function selectDisco(torre){
  var pos = torre[torre.length - 1] - 1;
  discoSelect.discNro = discos[pos].nro;
  discoSelect.origenX = discos[pos].posX;
  discoSelect.origenY = discos[pos].posY;
}

function refresh(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarTorres();
  for (var i = 0; i < discos.length; i++){
    ctx.fillStyle = colorDisco;
    ctx.fillRect(discos[i].posX,discos[i].posY,discos[i].Width,discos[i].Height);
  }
}

function volverPos(){
  discos[discoSelect.discNro - 1].posX = discoSelect.origenX;
  discos[discoSelect.discNro - 1].posY = discoSelect.origenY;
  if ((discoSelect.origenX >= tIzqX) && (discoSelect.origenX <= (tIzqX + tWidth)) && (discoSelect.origenY <= tBaseY)){
    torreIzq.push(discoSelect.discNro);
  }else if ((discoSelect.origenX >= tCenX) && (discoSelect.origenX <= (tCenX + tWidth)) && (discoSelect.origenY <= tBaseY)){
    torreCen.push(discoSelect.discNro);
  }else if ((discoSelect.origenX >= tDerX) && (discoSelect.origenX <= (tDerX + tWidth)) && (discoSelect.origenY <= tBaseY)){
    torreDer.push(discoSelect.discNro);
  }
}

function colocarDisco(torre){
  if (torre == 'izq'){
    discos[discoSelect.discNro - 1].posX = tIzqX + (13 * (discoSelect.discNro - 1));
    discos[discoSelect.discNro - 1].posY = (tBaseY - 26) - (26 * torreIzq.length);
  }else if (torre == 'cen'){
    discos[discoSelect.discNro - 1].posX = tCenX + (13 * (discoSelect.discNro - 1));
    discos[discoSelect.discNro - 1].posY = (tBaseY - 26) - (26 * torreCen.length);
  }else{
    discos[discoSelect.discNro - 1].posX = tDerX + (13 * (discoSelect.discNro - 1));
    discos[discoSelect.discNro - 1].posY = (tBaseY - 26) - (26 * torreDer.length);
  }
}

function verificar(){
  if ((torreIzq.length == 0) && (torreCen.length == 0) && (torreDer.length <= dificultad.value)){
    alert('Felicitaciones ¡has ganado!')
    reset();
    startBtm.innerHTML = 'Volver a jugar';
  }else if ((torreIzq.length == 0) && (torreCen.length <= dificultad.value) && (torreDer.length == 0)) {
    alert('Felicitaciones ¡has ganado!')
    reset();
    startBtm.innerHTML = 'Volver a jugar';
  }
}

function mouseDown(e){
  if (discoSelect.discNro == null){
    var mousePos = MousePos(e);
    if ((mousePos.x > tIzqX) && (mousePos.x < (tIzqX + tWidth)) && (mousePos.y < tBaseY)){
      var pos = torreIzq.length - 1;
      selectDisco(torreIzq);
      torreIzq.splice(pos,1);
    }else if ((mousePos.x > tCenX) && (mousePos.x < (tCenX + tWidth)) && (mousePos.y < tBaseY)){
      var pos = torreCen.length - 1;
      selectDisco(torreCen);
      torreCen.splice(pos,1);
    }else if ((mousePos.x > tDerX) && (mousePos.x < (tDerX + tWidth)) && (mousePos.y < tBaseY)){
      var pos = torreDer.length - 1;
      selectDisco(torreDer);
      torreDer.splice(pos,1);
    }
  }
}

function mouseMove(e){
  if (discoSelect.discNro != null){
    var mousePos = MousePos(e);
    var mX = discos[discoSelect.discNro - 1].Width / 2;
    var mY = discos[discoSelect.discNro - 1].Height / 2;
    discos[discoSelect.discNro - 1].posX = mousePos.x - mX;
    discos[discoSelect.discNro - 1].posY = mousePos.y - mY;
    refresh();
  }
}

function mouseUp(e){
  if (discoSelect.discNro != null){
    var mousePos = MousePos(e);
    if ((mousePos.x > tIzqX) && (mousePos.x < (tIzqX + tWidth)) && (mousePos.y < tBaseY)){
      if (torreIzq.length == 0){
        colocarDisco('izq');
        torreIzq.push(discoSelect.discNro);
      }else if (torreIzq[torreIzq.length - 1] < discoSelect.discNro){
        colocarDisco('izq');
        torreIzq.push(discoSelect.discNro);
      }else {
        volverPos();
      }
    }else if ((mousePos.x > tCenX) && (mousePos.x < (tCenX + tWidth)) && (mousePos.y < tBaseY)){
      if (torreCen.length == 0){
        colocarDisco('cen');
        torreCen.push(discoSelect.discNro);
      }else if (torreCen[torreCen.length - 1] < discoSelect.discNro){
        colocarDisco('cen');
        torreCen.push(discoSelect.discNro);
      }else {
        volverPos();
      }
    }else if ((mousePos.x > tDerX) && (mousePos.x < (tDerX + tWidth)) && (mousePos.y < tBaseY)){
      if (torreDer.length == 0){
        colocarDisco('der');
        torreDer.push(discoSelect.discNro);
      }else if (torreDer[torreDer.length - 1] < discoSelect.discNro){
        colocarDisco('der');
        torreDer.push(discoSelect.discNro);
      }else {
        volverPos();
      }
    }else{
      volverPos();
    }
    discoSelect.discNro = null;
  }
  refresh();
  verificar();
}

// --------------------------------------------------------------- //
window.onload = dibujarTorres;

var startBtm = document.getElementById('start');
startBtm.addEventListener("click", dibujarDiscos);

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
