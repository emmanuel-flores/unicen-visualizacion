var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ctx2 = canvas.getContext("2d");
var imageOrig = document.getElementById("original");
var width = 850;
var height = 550;
var r = 0;
var g = 0;
var b = 0;
var imageData;
var imageData2;

window.onload = function(){
  var input = document.getElementById('file-input');
  input.addEventListener('change', mostrarImagen);
}

function mostrarImagen(e){
  var image1 = new Image;
  image1.src = URL.createObjectURL(e.target.files[0]);
  imageOrig.src = image1.src;
  image1.onload = function(){
    ctx.drawImage(image1, 0, 0, width, height);
    ctx2.drawImage(image1, 0, 0, width, height);
    imageData = ctx.getImageData(0, 0, width, height);
    imageData2 = ctx2.getImageData(0, 0, width, height);
  }
}

function getRed(x, y){
	index = (x + y * imageData.width) * 4;
	return imageData.data[index+0];
}

function getGreen(x, y){
	index = (x + y * imageData.width) * 4;
	return imageData.data[index+1];
}

function getBlue(x, y){
	index = (x + y * imageData.width) * 4;
	return imageData.data[index+2];
}

function getPixel(x, y){
  r = getRed(x,y);
  g = getGreen(x,y);
  b = getBlue(x,y);
}

function setPixel(x, y, r, g, b, a){
	index = (x + y * imageData2.width) *4;
	imageData2.data[index+0] = r;
	imageData2.data[index+1] = g;
	imageData2.data[index+2] = b;
	imageData2.data[index+3] = a;
}

function blancoYnegro(){
	for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
			getPixel(x, y);
      var s = (r + g + b)/3;
			setPixel(x, y, s, s, s, 255);
		}
	}
	ctx2.putImageData(imageData2, 0, 0);
}

function binarizacion(){
  var limite = 100;
  for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
			getPixel(x, y);
			valor = (r + g + b)/3;
			if (valor < limite){
				setPixel(x, y, 0, 0, 0, 255);
			}else{
				setPixel(x, y, 255, 255, 255, 255);
			}
		}
	}
	ctx2.putImageData(imageData2, 0, 0);
}

function sepia(){
  for (var x = 0; x < width; x++){
  	for (var y = 0; y < height; y++){
  		getPixel(x, y);
      var luminosidad = (0.5 * r + 0.5 * g + 0.1 * b);
      r = Math.min(luminosidad + 40, 255);
      g = Math.min(luminosidad + 20, 255);
      b = Math.min(luminosidad, 255);
  		setPixel(x, y, r, g, b, 255);
  	}
	}
	ctx2.putImageData(imageData2, 0, 0);
}

function negativo(){
  for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
			getPixel(x, y);
			setPixel(x, y, 255 - r, 255 - g, 255 - b, 255);
		}
	}
	ctx2.putImageData(imageData2, 0, 0);
}

function saturacion(){
  var level = 2.9;
  var RW = 0.3086;
  var RG = 0.6084;
  var RB = 0.0820;
  var RW0 = (1 - level) * RW + level;
  var RW1 = (1 - level) * RW;
  var RW2 = (1 - level) * RW;
  var RG0 = (1 - level) * RG;
  var RG1 = (1 - level) * RG + level;
  var RG2 = (1 - level) * RG;
  var RB0 = (1 - level) * RB;
  var RB1 = (1 - level) * RB;
  var RB2 = (1 - level) * RB + level;
  for (var x = 0; x < width; x++){
    for (var y = 0; y < height; y++){
      getPixel(x, y);
      r = RW0*r + RG0*g + RB0*b;
      g = RW1*r + RG1*g + RB1*b;
      b = RW2*r + RG2*g + RB2*b;
      setPixel(x, y, r, g, b, 255);
    }
  }
  ctx2.putImageData(imageData2, 0, 0);
}

function original(){
  ctx2.putImageData(imageData, 0, 0);
}

function guardarImagen() {
  var link = window.document.createElement( 'a' );
  var url = canvas.toDataURL();
  var filename = 'image.png';
  link.setAttribute( 'href', url );
  link.setAttribute( 'download', filename );
  link.style.visibility = 'hidden';
  window.document.body.appendChild( link );
  link.click();
  window.document.body.removeChild( link );
};

var origBtm = document.getElementById('original');
origBtm.addEventListener("click", original);

var bynBtm = document.getElementById('byn');
bynBtm.addEventListener("click", blancoYnegro);

var binarBtm = document.getElementById('binar');
binarBtm.addEventListener("click", binarizacion);

var sepiaBtm = document.getElementById('sepia');
sepiaBtm.addEventListener("click", sepia);

var negBtm = document.getElementById('neg');
negBtm.addEventListener("click", negativo);

var saturBtm = document.getElementById('satur');
saturBtm.addEventListener("click", saturacion);

var saveBtm = document.getElementById('save');
saveBtm.addEventListener("click", guardarImagen);
