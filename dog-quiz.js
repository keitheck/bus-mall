'use strict';

Dog.dogList = [];

function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
  this.legs = 4;
  this.isAGoodDog = true;
  this.says = function(bark) {
    console.log(bark);
  };
  Dog.dogList.push(this);
}

new Dog('Parker','English Shepherd');
new Dog('Demi','Border Collie');
Dog.dogList[0].says('woof');
Dog.dogList[1].legs = 3;
