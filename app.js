'use strict';

// document.getElementById('btn').style.display = 'none';
var btn = document.getElementById('btn');
btn.style.display = 'none';
var displayChooser = document.getElementById('select-three');
displayChooser.style.display = 'block';
var displayChart = document.getElementById('show-chart');
displayChart.style.display = 'none';

//MANUALLY ENTERED ARRAY OF FILEPATHS----------------------------

var photoOfGizmos = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg' ];


//DECLARE VARIABLES-----------------------------------------------
var totalNumberOfClicks = [];
var gizmoNames = [];
Gizmos.allGizmos = [];
var threeRandomImages = [];
var eventCounter = 0;




//SAVE PERSISTANCE DATA -------------



//GENERATE RANDOM NUMBER BETWEEN TWO VALUES----------------------

function randomNumber(min, max) { //via doveloper.mozilla.org
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//SLICE NAME FROM FILEPATH----------------------------------------

for(var i = 0; i < photoOfGizmos.length; i++){
  var slcName = photoOfGizmos[i];
  slcName = slcName.slice(4, -4);
  gizmoNames.push(slcName);
};

//CONSTRUCTOR FUCTION ---------------------------------------------


function Gizmos(name, filepath){
  this.name = name;
  this.filepath = filepath;
  this.previouslyShown = false;
  this.timesSelected = 0;
  this.timesShown = 0;
  Gizmos.allGizmos.push(this);
};

// for(var j = 0; j < gizmoNames.length; j++){
//   new Gizmos(gizmoNames[j], photoOfGizmos[j]);
// }

//ADD PERSISTANCE-------------------------------------------------

if (localStorage.list) {
  Gizmos.allGizmos = JSON.parse(localStorage.list);
  console.log('get localStorage')
} else {
  for(var j = 0; j < gizmoNames.length; j++){
    new Gizmos(gizmoNames[j], photoOfGizmos[j]);
  }
}



//GENERATE AN ARRAY OF THREE IMAGES-----------------------------------


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

//RENDER THREE IMAGES-------------------------------------------------

var renderThreeImagesToDom = function(){
  for(var k = 0; k < 3; k++){
    var findLocation = document.getElementById('image' + k ); //accesses the html img tags with and changes id value with each loop
    // console.log(findLocation);
    var renderImage = threeRandomImages[k];
    // console.log(renderImage);
    findLocation.src = renderImage;
  }
};

//ON CLICK EVENT CODE -------------------------------------------------


var handleClick = function(e){
  var targetImage = e.target.attributes[1].value;
  // console.log(targetImage);
  for (var r = 0; r < photoOfGizmos.length; r++){ //increment timesSelected++
    if (targetImage === photoOfGizmos[r]){
      var clickCounter = Gizmos.allGizmos[r];
      clickCounter.timesSelected++;
    }
  }
  threeRandomImages.length = 0;
  eventCounter++;
  runProgram();
  if(eventCounter <= 23){
    document.getElementById('btn').style.display = 'none';
  }
  if (eventCounter > 23){ //set graph attributes to hide then toggle to show
    console.log('25 Clicks show graph');
    // document.getElementById('select-three').style.display = 'none';
    displayChooser.style.display = 'none';
    // document.getElementById('btn').style.display = 'block';
    btn.style.display = 'block';
    displayChart.style.display = 'block';
    totalNumberOfClicks.length = 0;
    numberOfClicksFunction();
    drawChart();
    eventCounter = 0;
    console.log(Gizmos.allGizmos);
    localStorage.list = JSON.stringify(Gizmos.allGizmos);
  }
};

var resumeChooser = function (){
  btn.style.display = 'none';
  displayChart.style.display = 'none';
  displayChooser.style.display = 'block';

};


var image0 = document.getElementById('image0');
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');

image0.addEventListener('click',handleClick);
image1.addEventListener('click',handleClick);
image2.addEventListener('click',handleClick);

//CHARTS.JS RENDER -----------------------------------------------------


var numberOfClicksFunction = function(){
  for(var t = 0; t < photoOfGizmos.length; t++){
    var getNumberOfClicks = Gizmos.allGizmos[t];
    // console.log('getNumberOfClicks', getNumberOfClicks);
    var numClicksBucket = getNumberOfClicks.timesSelected;
    // console.log('numClicksBucket', numClicksBucket);
    totalNumberOfClicks.push(numClicksBucket);
  }
  console.log('totalNumberOfClicks', totalNumberOfClicks);
};


//Chart Script----------------------------------------------------------------

function drawChart(){
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [{
        label: '# of Votes',
        data: totalNumberOfClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 119, 28, 0.2)',
          'rgba(255, 247, 28, 0.2)',
          'rgba(146, 255, 28, 0.2)',
          'rgba(28, 242, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 119, 28, 0.2)',
          'rgba(255, 247, 28, 0.2)',
          'rgba(146, 255, 28, 0.2)',
          'rgba(28, 242, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 119, 28, 1)',
          'rgba(255, 247, 28, 1)',
          'rgba(146, 255, 28, 1)',
          'rgba(28, 242, 255, 1)',
          'rgba(255 ,99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 247, 28, 1)',
          'rgba(146, 255, 28, 1)',
          'rgba(28, 242, 255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 119, 28, 1)'

        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}


//RUN ALL CODES---------------------------------------------------------
var runProgram = function(){
  generateThreeImageFunction();
  renderThreeImagesToDom();
  // console.log(Gizmos.allGizmos);
};

runProgram();

btn.addEventListener('click', resumeChooser);
