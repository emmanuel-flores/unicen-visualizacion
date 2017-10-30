var personaje = document.getElementById('pj');
var background_1 = document.getElementById('bg1');
var background_2 = document.getElementById('bg2');
var background_3 = document.getElementById('bg3');
var divGameOver = document.getElementById('gameover');
var imgVidas = document.getElementById('vidas');
var game = document.getElementById('game').querySelectorAll("div");
const flechaUp = 38;
const flechaIzq = 37;
const addenemigo = '<div id="obstaculo" class="obstaculo"><div id="enemigo" class="enemigo"></div></div>';
const addscore = '<span id="puntos" class="puntos">+200</span>';
var running = false;
var puntuacion = 0;
var cantVidas = 3;
var music = new Audio('sounds/sound.mp3');
music.volume = 0.1;
music.loop = true;

function cambiarAnimacion(element, actual, nueva) {
  element.classList.remove(actual);
  element.classList.add(nueva);
}

var setGame = setInterval(function() {
  if (running == true) {
    var obstaculos = $(".obstaculo");
    var enemigo = document.getElementById('enemigo');
    for (var i = 0; i < obstaculos.length; i++) {
      var posdelenemigo = $(obstaculos[i]).offset().left;
      var colision = $(".personaje").offset().left + $(".personaje").width();
      if (posdelenemigo < colision && personaje.classList.contains('correr') && !(enemigo.classList.contains('enemigomuerto'))) {
        if (cantVidas == 0){
          cambiarAnimacion(personaje,'correr','muerto');
          personaje.addEventListener("animationend", function() {
            for (var i = 0; i < game.length; i++) {
              game[i].style.animationPlayState = 'paused';
            }
            running = false;
            music.pause();
            divGameOver.style.display = 'block';
            document.getElementById('score').innerHTML = 'Score: '+puntuacion;
          });
        }else{
          cantVidas --;
          imgVidas.src = "imagenes/vidas_"+cantVidas+".png";
          cambiarAnimacion(personaje,'correr','vidamenos');
          personaje.addEventListener("animationend", function() {
            cambiarAnimacion(personaje,'vidamenos','rodar');
            personaje.addEventListener("animationend", function() {
              cambiarAnimacion(personaje,'rodar','correr');
            });
          });
        }
      }else if (posdelenemigo < colision && personaje.classList.contains('ataque') && !(enemigo.classList.contains('enemigomuerto'))) {
        cambiarAnimacion(enemigo,'enemigo','enemigomuerto');
        $(".cosas").append(addscore);
        document.getElementById('puntos').addEventListener("animationend", function() {
          $("span").remove(".puntos");
        });
        puntuacion += 200;
      }
    }
  }
}, 100);

var setScore = setInterval(function() {
  if (running == true){
    puntuacion ++;
    document.getElementById('pts').innerHTML = puntuacion;
  }
}, 50);

var agregarEnemigo = setInterval(function() {
  if (running == true){
    $(".cosas").append(addenemigo);
    document.getElementById('obstaculo').addEventListener("animationend", function() {
      $("div").remove(".enemigo, .obstaculo");
    });
  }
}, 2500);

function movimientos(e){
  if (e.keyCode === flechaUp && personaje.classList.contains('correr')){
    cambiarAnimacion(personaje,'correr','saltar');
    personaje.addEventListener("animationend", function() {
      cambiarAnimacion(personaje,'saltar','correr');
    });
  }else if (e.keyCode === flechaIzq && personaje.classList.contains('correr')){
    cambiarAnimacion(personaje,'correr','ataque');
    personaje.addEventListener("animationend", function() {
      cambiarAnimacion(personaje,'ataque','correr');
    });
  }
}

function empezar(){
  running = true;
  btmStart.style.display = 'none';
  background_1.classList.add('animacion_bg1');
  background_2.classList.add('animacion_bg2');
  background_3.classList.add('animacion_bg3');
  cambiarAnimacion(personaje,'quieto','correr');
  music.play();
}

// function reiniciar(){
//   puntuacion = 0;
//   cantVidas = 3;
//   for (var i = 0; i < game.length; i++) {
//     game[i].style.animationPlayState = 'running';
//   }
//   cambiarAnimacion(personaje,'muerto','correr');
//   running = true;
//   imgVidas.src = "imagenes/vidas_"+cantVidas+".png";
//   divGameOver.style.display = 'none';
//   music.play();
// }

document.addEventListener("keydown", movimientos);

var btmStart = document.getElementById('start');
btmStart.addEventListener("click", empezar);

// var btmRestart = document.getElementById('restart');
// btmRestart.addEventListener("click", reiniciar);
