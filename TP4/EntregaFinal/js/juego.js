var personaje = document.getElementById('pj');
var background_1 = document.getElementById('bg1');
var background_2 = document.getElementById('bg2');
var background_3 = document.getElementById('bg3');
const flechaDer = 39;
const flechaUp = 38;
const flechaIzq = 37;
const flechaDown = 40;
var music = new Audio('sounds/sound.mp3');
music.volume = 0.1;
music.loop = true;

function correr(e){
  if (e.keyCode === flechaDer) {
    var agregarEnemigo = setInterval(function() {
      var enemigo = '<div class="obstaculo"><div class="enemigo"></div></div>';
      $("#bg").append(enemigo);
    }, 3000)
    background_1.classList.add('animacion_bg1');
    background_2.classList.add('animacion_bg2');
    background_3.classList.add('animacion_bg3');
    personaje.classList.remove('quieto');
    personaje.classList.add('correr');
    music.play();
  }else if (e.keyCode === flechaUp && personaje.classList.contains('correr')) {
    personaje.classList.remove('correr');
    personaje.classList.add('saltar');
    personaje.addEventListener("animationend", function() {
      personaje.classList.remove('saltar');
      personaje.classList.add('correr');
    })
  }else if (e.keyCode === flechaIzq && personaje.classList.contains('correr')) {
    personaje.classList.remove('correr');
    personaje.classList.add('ataque');
    personaje.addEventListener("animationend", function() {
      personaje.classList.remove('ataque');
      personaje.classList.add('correr');
    })
  }else if (e.keyCode === flechaDown && personaje.classList.contains('correr')) {
    personaje.classList.remove('correr');
    personaje.classList.add('rodar');
    personaje.addEventListener("animationend", function() {
      personaje.classList.remove('rodar');
      personaje.classList.add('correr');
    })
  }
}

document.addEventListener("keydown", correr);

var gameOver = setInterval(function() {
  var obstaculos = $(".obstaculo");
  for (var i = 0; i < obstaculos.length; i++) {
    var leftdelenemigo = $(obstaculos[i]).offset().left;
    var colision = $(".personaje").offset().left + $(".personaje").width();
    if (leftdelenemigo < colision && personaje.classList.contains('correr')) {
      personaje.classList.remove('correr');
      personaje.classList.add('rodar');
      personaje.addEventListener("animationend", function() {
        personaje.classList.remove('rodar');
        personaje.classList.add('correr');
      })
    }
  }
}, 100);
