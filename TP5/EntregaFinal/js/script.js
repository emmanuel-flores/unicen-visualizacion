var grilla = document.getElementById('cont');
var lista = document.getElementById('lista');
var carrousel = document.getElementById('carrousel');
const vistaGrilla = 1;
var mnoc = false;
var modVista = vistaGrilla;
var imagenes = [];
var hashtag;
var animacion=1;
var pos = 0;
var flechaIzq = 37;
var flechaDer = 39;
var search;
// ---- API ----
var cb = new Codebird;
cb.setConsumerKey("4CJBqbebmf9IVwWBPG10qQD1q", "WL3dxEK9CEwqAeLzqfrI6L22rVCwBLKJahUnMocBVY2qStym25");
cb.setToken("133798046-DvVwEcndjz3fKvEbnsIl2drgWxT2HX9mIhb2Kt11", "BOTqVdG18y5ZLjNc9DRI9dgmN1K7f6Ew2ZHC4r3a2zyCf");
// cb.setProxy("https://cb-proxy.herokuapp.com/");

function buscahash(){
  var params = {
    q: search,
    result_type: "mixed",
    count: 100
  };
  imagenes = [];
  cb.__call(
    "search_tweets",
    params,
    function (reply) {
      console.log(reply.httpstatus);
      var tweets = reply.statuses;
      console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        if (tweets[i].extended_entities){
          if (tweets[i].extended_entities.media.length > 1) {
            for (var n = 0; n < tweets[i].extended_entities.media.length; n++) {
              if (tweets[i].extended_entities.media[n].type == "photo") {
                var imagen = {
                  url: tweets[i].extended_entities.media[n].media_url,
                  likes: tweets[i].favorite_count,
                  user: tweets[i].user.name,
                  text: tweets[i].text
                };
                imagenes.push(imagen);
              }
            }
          }else if (tweets[i].extended_entities.media[0].type == "photo") {
            var imagen = {
              url: tweets[i].extended_entities.media[0].media_url,
              likes: tweets[i].favorite_count,
              user: tweets[i].user.name,
              text: tweets[i].text
            };
            imagenes.push(imagen);
          }
        }
      }
      console.log(imagenes);
      cargarImagenesGrilla();
      cargarImagenes();
    },
    true // this parameter required
  );
}

// ---- Carga las imagenes en la pag ----
function cargarImagenes(){
  while (lista.hasChildNodes()) {
    lista.removeChild(lista.firstChild);
    carrousel.removeChild(carrousel.firstChild);
  }
  for (var i = 0; i < imagenes.length; i++) {
    var imgList = document.createElement('img');
    imgList.src = imagenes[i].url;
    imgList.id = i;
    imgList.className = (i == 0) ? "imagen-f imgSelect" : "imagen-f";
    var a = document.createElement('a');
    a.appendChild(imgList);
    lista.appendChild(a);
    var figure = document.createElement('figure');
    figure.className = (i == 0) ? "figureCar select" : "figureCar posterior";
    var divCar = document.createElement('div');
    divCar.className = "divCar";
    var imgCar = document.createElement('img');
    imgCar.src = imagenes[i].url;
    imgCar.className = "imgCar";
    var pCar = document.createElement('p');
    pCar.className = "likeCar";
    pCar.innerHTML = imagenes[i].likes;
    var spanCar = document.createElement('span');
    var cor = 1000 + i
    spanCar.className = "glyphicon glyphicon-heart "+ cor;
    pCar.appendChild(spanCar);
    divCar.appendChild(imgCar);
    divCar.appendChild(pCar);
    figure.appendChild(divCar);
    carrousel.appendChild(figure);
  }
  animaciones();
}

function cargarImagenesGrilla(){
  while (grilla.hasChildNodes()) {
    grilla.removeChild(grilla.firstChild);
  }
  for (var i = 0; i < imagenes.length; i++) {
    var div = document.createElement('div');
    div.className = "dimageng";
    var a = document.createElement('a');
    var img = document.createElement('img');
    img.src = imagenes[i].url;
    img.className = "imageng desvanecer";
    var h3 = document.createElement('h3');
    h3.innerHTML = imagenes[i].likes;
    var span = document.createElement('span');
    var cor = 1000 + i
    span.className = "glyphicon glyphicon-heart "+ cor;
    a.appendChild(img);
    h3.appendChild(span);
    div.appendChild(a);
    div.appendChild(h3);
    grilla.appendChild(div);
  }
  animaciones();
}

// ---- Modo Nocturno ----
$(".nocturno").on("click", function(){
  if (mnoc == false) {
    $("body").css("background-color", "#141d26");
    $("body").css("color", "#FFF");
    $(".navbar").css("background-color", "#243447");
    $(".buscar").css("background-color", "#182430");
    $(".buscar").css("border-color", "#141d26");
    $(".buscar").css("color", "#FFF");
    mnoc = true;
    $(".presentacion").css("background-image", "url(images/oscura.jpg)");
    $(".likeCar").css("background-color", "#243447");
    $(".dropdown-menu").css("background-color", "#243447");
    $(".dropdown-menu").css("color", "#FFF");
    $("li a").css("color", "#8EC5F7");
    $(".nocturno").css("font-weight", "bold");
    $(".nocturno").css("color", "#3A9CF2");
    $("#dropdownMenu1").css("color", "#FFF");
  }
  else {
    $("body").css("background-color", "#e6ecf0");
    $("body").css("color", "#333");
    $(".navbar").css("background-color", "#FFF");
    $(".buscar").css("background-color", "#FFF");
    $(".buscar").css("border-color", "#ccc");
    $(".buscar").css("color", "#000");
    mnoc = false;
    $(".presentacion").css("background-image", "url(images/clara.jpg)");
    $(".nocturno").css("color", "#333");
    $(".nocturno").css("font-weight", "normal");
    $(".likeCar").css("background-color", "#FFF");
    $(".dropdown-menu").css("background-color", "#FFF");
    $(".dropdown-menu").css("color", "#333");
    $("li a").css("color", "#333");
    $("#dropdownMenu1").css("color", "#777");
  }
})

// ---- Cambio de Vista ----
$("#vista").on("click", function(){
  if (modVista == vistaGrilla){
    modVista = 2;
    $("#cont").addClass("desactivar");
    $("#vist2").removeClass("desactivar");
    $("#vista").addClass("glyphicon-th");
    $("#vista").removeClass("glyphicon-blackboard");
    autoDesplazar();
  }else if (modVista != vistaGrilla){
    modVista = vistaGrilla;
    $("#cont").removeClass("desactivar");
    $("#vist2").addClass("desactivar");
    $("#vista").addClass("glyphicon-blackboard");
    $("#vista").removeClass("glyphicon-th");
  }
});

$("#desplazar").css("font-weight", "bold");
$("#desplazar").css("color", "#3A9CF2");

// ---- Apreta desplazar ----
document.getElementById('desplazar').addEventListener('click', function(){
  if (animacion == 2){
    $("#desplazar").css("font-weight", "bold");
    $("#desplazar").css("color", "#3A9CF2");
    $("#girar").css("font-weight", "normal");
    $("#girar").css("color", "#8EC5F7");
    animacion = 1;
    var aux = 0;
    var max = carrousel.childElementCount;
    for (var i = 0; i < max; i++) {
      if (carrousel.childNodes[i].hasClass(".girarAdelante")){
        carrousel.childNodes[i].classList.remove("girarAdelante");
        carrousel.childNodes[i].classList.add("select");
        aux = 1;
      }else if ((carrousel.childNodes[i].hasClass(".girarAtras")) && (aux == 0)) {
        carrousel.childNodes[i].classList.remove("girarAtras");
        carrousel.childNodes[i].classList.add("anterior");
      }else if ((carrousel.childNodes[i].hasClass(".girarAtras")) && (aux == 1)) {
        carrousel.childNodes[i].classList.remove("girarAtras");
        carrousel.childNodes[i].classList.add("posterior");
      }
    }
  }
});

// ---- Apreta girar ----
document.getElementById('girar').addEventListener('click', function(){
  if (animacion == 1){
    $("#girar").css("font-weight", "bold");
    $("#girar").css("color", "#3A9CF2");
    $("#desplazar").css("font-weight", "normal");
    $("#desplazar").css("color", "#8EC5F7");
    animacion = 2;
    var max = carrousel.childElementCount;
    for (var i = 0; i < max; i++) {
      carrousel.childNodes[i].classList.replace("select", "girarAdelante");
      carrousel.childNodes[i].classList.replace("anterior", "girarAtras");
      carrousel.childNodes[i].classList.replace("posterior", "girarAtras");
    }
  }
});

// ---- Transiciones ----
var mov = 0;
document.addEventListener("keydown", function(e){
  if (modVista != vistaGrilla) {
    if (e.keyCode === flechaDer) {
      if (carrousel.childElementCount > (pos+1)) {
        if (animacion === 1) {
          mov -= document.getElementById(pos).width + 1;
          lista.style.transform = 'translateX('+ mov + 'px)';
          carrousel.childNodes[pos].classList.remove('select');
          carrousel.childNodes[pos].classList.add('anterior');
          document.getElementById(pos).classList.remove('imgSelect');
          pos ++;
          carrousel.childNodes[pos].classList.remove('posterior');
          carrousel.childNodes[pos].classList.add('select');
          document.getElementById(pos).classList.add('imgSelect');
        }else if (animacion === 2) {
          mov -= document.getElementById(pos).width + 1;
          lista.style.transform = 'translateX('+ mov + 'px)';
          carrousel.childNodes[pos].classList.remove('girarAdelante');
          carrousel.childNodes[pos].classList.add('girarAtras');
          document.getElementById(pos).classList.remove('imgSelect');
          pos ++;
          carrousel.childNodes[pos-1].addEventListener("transitionend", function(){
            carrousel.childNodes[pos].classList.remove('girarAtras');
            carrousel.childNodes[pos].classList.add('girarAdelante');
          });
          document.getElementById(pos).classList.add('imgSelect');
        }
      }
    }else if (e.keyCode === flechaIzq) {
      if (pos > 0) {
        if (animacion === 1) {
          mov += document.getElementById(pos).width + 1;
          lista.style.transform = 'translateX('+ mov + 'px)';
          carrousel.childNodes[pos].classList.remove('select');
          carrousel.childNodes[pos].classList.add('posterior');
          document.getElementById(pos).classList.remove('imgSelect');
          pos --;
          carrousel.childNodes[pos].classList.remove('anterior');
          carrousel.childNodes[pos].classList.add('select');
          document.getElementById(pos).classList.add('imgSelect');
        }else if (animacion === 2) {
          mov += document.getElementById(pos).width + 1;
          lista.style.transform = 'translateX('+ mov + 'px)';
          carrousel.childNodes[pos].classList.remove('girarAdelante');
          carrousel.childNodes[pos].classList.add('girarAtras');
          document.getElementById(pos).classList.remove('imgSelect');
          pos --;
          carrousel.childNodes[pos+1].addEventListener("transitionend", function(){
            carrousel.childNodes[pos].classList.remove('girarAtras');
            carrousel.childNodes[pos].classList.add('girarAdelante');
          });
          document.getElementById(pos).classList.add('imgSelect');
        }
      }
    }
  }
});

// ---- Buscar ----
$(document).keydown(function(e){
 if (e.keyCode === 13) {
   if ($(".presentacion").css("display") == "block") {
     if ((document.getElementById('formulariop').buscp.value) == '') {
       alert("No cargo ningun #Hashtag para ser buscado");
     }
     else {
       search = document.getElementById('formulariop').buscp.value;
       var letra= search.substring(0, 1);
       if (letra != "#") {
         search = "#" + search;
       }
       $(".presentacion").css("display", "none");
       $(".dentro").css("display", "block");
       buscahash();
       $("#hash").text(search);
       e.preventDefault();
     }
   }
    else if ($(".dentro").css("display") == "block") {
      if ((document.getElementById('formulario').busc.value) == '') {
        alert("No cargo ningun #Hashtag para ser buscado");
      }
      else {
        search = document.getElementById('formulario').busc.value;
        var letra= search.substring(0, 1);
        if (letra != "#") {
          search = "#" + search;
        }
        $(".presentacion").css("display", "none");
        $(".dentro").css("display", "block");
        buscahash();
        $("#hash").text(search);
        e.preventDefault();
      }
    }
  }
});

// ---- Agregar animaciones a los likes ----
function animaciones(){
  for (var i = 0; i < imagenes.length; i++) {
    corazon = 1000 + i;
    var anima= Math.floor(Math.random()*3);
    if (anima == 0) {
      $("."+corazon).addClass("latir");
    }
    else if (anima == 1) {
      $("."+corazon).addClass("girar3d");
    }
    else if (anima == 2) {
      $("."+corazon).addClass("rotar");
    }
  }
}

// ---- Auto desplazamiento ----
function autoDesplazar(){
  var play = setInterval(function(){
    if (carrousel.childElementCount > (pos+1)) {
      if (animacion === 1) {
        mov -= document.getElementById(pos).width + 1;
        lista.style.transform = 'translateX('+ mov + 'px)';
        carrousel.childNodes[pos].classList.remove('select');
        carrousel.childNodes[pos].classList.add('anterior');
        document.getElementById(pos).classList.remove('imgSelect');
        pos ++;
        carrousel.childNodes[pos].classList.remove('posterior');
        carrousel.childNodes[pos].classList.add('select');
        document.getElementById(pos).classList.add('imgSelect');
      }else if (animacion === 2) {
        mov -= document.getElementById(pos).width + 1;
        lista.style.transform = 'translateX('+ mov + 'px)';
        carrousel.childNodes[pos].classList.remove('girarAdelante');
        carrousel.childNodes[pos].classList.add('girarAtras');
        document.getElementById(pos).classList.remove('imgSelect');
        pos ++;
        carrousel.childNodes[pos-1].addEventListener("transitionend", function(){
          carrousel.childNodes[pos].classList.remove('girarAtras');
          carrousel.childNodes[pos].classList.add('girarAdelante');
        });
        document.getElementById(pos).classList.add('imgSelect');
      }
    }
  }, 5000);
}
