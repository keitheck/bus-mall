'use strict';

function randomNumber(min, max) { //via doveloper.mozilla.org
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var photoOfGizmos = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg' ];

var gizmoNames = [];

for(var i = 0; i < photoOfGizmos.length; i++){
  var slcName = photoOfGizmos[i];
  slcName = slcName.slice(4, -4);
  gizmoNames.push(slcName);
};

//CONSTRUCTOR FUCTION ---------------------------------------------
Gizmos.allGizmos = [];

function Gizmos(name, filepath){
  this.name = name;
  this.filepath = filepath;
  this.previouslyShown = false;
  this.timesSelected = 0;
  this.timesShown = 0;
  Gizmos.allGizmos.push(this);
};

for(var j = 0; j < gizmoNames.length; j++){
  new Gizmos(gizmoNames[j], photoOfGizmos[j]);
}

// //------------------------------------------------------------------
//THREE RANDOM IMAGES

// function threeImages() {
//   imageOne.src = Gizmos.allGizmos[randomNumber(0,photoOfGizmos.length + 1)].filepath;
//   imageTwo.src = Gizmos.allGizmos[randomNumber(0,photoOfGizmos.length + 1)].filepath;
//   imageThree.src = Gizmos.allGizmos[randomNumber(0,photoOfGizmos.length + 1)].filepath;
// }
// threeImages();

var container = document.getElementById('image-conatainer-' + (i+1));
container.innerHTML = '<img src="' + img[i].filepath + '">';
