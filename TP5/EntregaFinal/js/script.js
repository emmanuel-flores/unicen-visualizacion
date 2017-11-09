const vistaGrilla = 1;
var mnoc = false;
var modVista = vistaGrilla;

// Modo Nocturno
$(".nocturno").on("click", function(){
  if (mnoc == false) {
    $("body").css("background-color", "#141d26");
    $("body").css("color", "#FFF");
    $(".navbar").css("background-color", "#243447");
    $("#buscar").css("background-color", "#182430");
    $("#buscar").css("border-color", "#141d26");
    $("#buscar").css("color", "#FFF");
    $("#buscarp").css("background-color", "#182430");
    $("#buscarp").css("border-color", "#141d26");
    $("#buscarp").css("color", "#FFF");
    mnoc = true;
    $(".nocturno").css("color", "#3A9CF2");
    $(".nocturno").css("font-weight", "bold");
    $(".like-f").css("background-color", "#243447");
  }
  else {
    $("body").css("background-color", "#e6ecf0");
    $("body").css("color", "#333");
    $(".navbar").css("background-color", "#FFF");
    $("#buscar").css("background-color", "#FFF");
    $("#buscar").css("border-color", "#ccc");
    $("#buscar").css("color", "#000");
    $("#buscarp").css("background-color", "#FFF");
    $("#buscarp").css("border-color", "#ccc");
    $("#buscarp").css("color", "#000");
    mnoc = false;
    $(".nocturno").css("color", "#777");
    $(".nocturno").css("font-weight", "normal");
    $(".like-f").css("background-color", "#FFF");
  }
})

$("#vista").on("click", function(){
  if (modVista == vistaGrilla){
    modVista = 2;
    $("#cont").addClass("desactivar");
    $("#vist2").removeClass("desactivar");
    $("#vista").addClass("glyphicon-th");
    $("#vista").removeClass("glyphicon-blackboard");
  }else if (modVista != vistaGrilla){
    modVista = vistaGrilla;
    $("#cont").removeClass("desactivar");
    $("#vist2").addClass("desactivar");
    $("#vista").addClass("glyphicon-blackboard");
    $("#vista").removeClass("glyphicon-th");
  }
});

$(document).keydown(function(e){
    if (e.keyCode === 13) {
      $(".presentacion").css("display", "none");
      $(".dentro").css("display", "block");
    }
});
