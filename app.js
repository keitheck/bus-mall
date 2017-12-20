'use strict';

//GENERATE RANDOM NUMBER BETWEEN TWO VALUES

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

//GENERATE AN ARRAY OF THREE IMAGES

var threeRandomImages = [];


var generateThreeImageFunction = function(){
  var indexArray = [];
  for(var m = 0; threeRandomImages.length < 3; m++){
    var index = randomNumber(0,20);
    indexArray.push(index);
    var getRandomGizmo = Gizmos.allGizmos[index];
    // console.log('getRandomGizmo', getRandomGizmo);

    if (getRandomGizmo.previouslyShown === false){
      var getImageFromGizmoArray = getRandomGizmo.filepath;
      // console.log('getImageFromGizmoArray', getImageFromGizmoArray);
      threeRandomImages.push(getImageFromGizmoArray);
      getRandomGizmo.previouslyShown = true;
      // console.log('change previously shown to true', getRandomGizmo);
      getRandomGizmo.timesShown++;
      // console.log('change timesShown +1', getRandomGizmo);
    }
  }
  //set all previouslyShown values to false except those just shown.
  for(var n = 0; n < 20; n++){
    var getGizmo = Gizmos.allGizmos[n];
    getGizmo.previouslyShown = false;
  }
  for(var q = 0; q < indexArray.length; q++){
    var setFalse = Gizmos.allGizmos[indexArray[q]];
    setFalse.previouslyShown = true;
  }
};

// generateThreeImageFunction(); //placed in function at bottom to call all together

console.log('Three Random Images Array', threeRandomImages);

// //------------------------------------------------------------------
//RENDER THREE IMAGES

// var testImage = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg'];  //test array used to test render image for loop

var renderThreeImagesToDom = function(){
  for(var k = 0; k < 3; k++){
    var findLocation = document.getElementById('image' + k ); //accesses the html img tags with and changes id value with each loop
    // console.log(findLocation);
    var renderImage = threeRandomImages[k];
    // console.log(renderImage);
    findLocation.src = renderImage;
  }
};


var runProgram = function(){
  generateThreeImageFunction();
  renderThreeImagesToDom();
  console.log(Gizmos.allGizmos);
};

runProgram();
