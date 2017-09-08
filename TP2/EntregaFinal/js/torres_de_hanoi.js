// --------------------------------------------------------------- //
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dificultad = document.getElementById("dificultad");
const tIzqX = 25;
const tCenX = 325;
const tDerX = 625;
const tBaseY = 290;
const tWidth = 250;
var torreIzq = [];
var torreCen = [];
var torreDer = [];
var discos = [];
var discoSelect = {
  discNro: null,
  oX: 0,
  oY: 0
};

// --------------------------------------------------------------- //
function Disco(nro, paramPosX, paramPosY, paramHeight, paramWidth){
  this.nro = nro;
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.Height = paramHeight;
  this.Width = paramWidth;
}

function torre(x, y){
  ctx.fillStyle = "#000000";
  ctx.fillRect(x,y,tWidth,5);
  ctx.fillStyle = "#000000";
  ctx.fillRect((x + ((tWidth/2) - 2)),0,5,tBaseY);
}

function reset(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  torres();
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
  var dY = tBaseY - 21;
  var dWidth = tWidth;
  var dNro = dificultad.value;
  for (var i = 0; i < dificultad.value; i++){
    torreIzq[i] = dNro;
    discos[i] = new Disco(dNro,dX,dY,20,dWidth);
    ctx.fillStyle = "#FFF000";
    ctx.fillRect(discos[i].posX,discos[i].posY,discos[i].Width,discos[i].Height);
    dX += 12;
    dY -= 21;
    dWidth -= 24;
    dNro -= 1;
  }
}

function torres(){
  torre(tIzqX,tBaseY);
  torre(tCenX,tBaseY);
  torre(tDerX,tBaseY);
}

function refresh(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  torres();
  for (var i = 0; i < discos.length; i++){
    ctx.fillStyle = "#FFF000";
    ctx.fillRect(discos[i].posX,discos[i].posY,discos[i].Width,discos[i].Height);
  }
}

function MousePos(e){
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(e.clientX - rect.left),
    y: Math.round(e.clientY - rect.top)
  };
}

function mouseDown(e){
  var mousePos = MousePos(e);
  if ((mousePos.x > tIzqX) && (mousePos.x < (tIzqX + tWidth)) && (mousePos.y < tBaseY)){
    var pos = torreIzq.length - 1;
    discoSelect.discNro = discos[pos].nro;
    discoSelect.oX = discos[pos].posX;
    discoSelect.oY = discos[pos].posY;
    torreIzq.splice(pos,1);
  }else if ((mousePos.x > tCenX) && (mousePos.x < (tCenX + tWidth)) && (mousePos.y < tBaseY)){
    var pos = torreCen.length - 1;
    discoSelect.discNro = discos[pos].nro;
    discoSelect.oX = discos[pos].posX;
    discoSelect.oY = discos[pos].posY;
    torreCen.splice(pos,1);
  }else if ((mousePos.x > tDerX) && (mousePos.x < (tDerX + tWidth)) && (mousePos.y < tBaseY)){
    var pos = torreDer.length - 1;
    discoSelect.discNro = discos[pos].nro;
    discoSelect.oX = discos[pos].posX;
    discoSelect.oY = discos[pos].posY;
    torreDer.splice(pos,1);
  }
}

function mouseMove(e){
  if (discoSelect.discNro != null){
    var mousePos = MousePos(e);
    var mX = discos[discos.length - discoSelect.discNro].Width / 2;
    var mY = discos[discos.length - discoSelect.discNro].Height / 2;
    discos[discos.length - discoSelect.discNro].posX = mousePos.x - mX;
    discos[discos.length - discoSelect.discNro].posY = mousePos.y - mY;
    refresh();
  }
}

function mouseUp(e){
  discoSelect.discNro = null;
}

// --------------------------------------------------------------- //
window.onload = torres;

var startBtm = document.getElementById('start');
startBtm.addEventListener("click", dibujarDiscos);

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
