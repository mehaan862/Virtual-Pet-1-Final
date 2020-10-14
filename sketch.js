//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage=loadImage("Dog.png");
  happyDogImage=loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  dog=createSprite(200,200);
  dog.addImage(dogImage);
  dog.scale=0.3;
}


function draw() {  
background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
 
  drawSprites();
  //add styles here
  if(foodS!==undefined){
  textSize(20);
  fill("black");
  text("FOOD LEFT: "+ foodS, 150,50);
  text("Press UP_ARROW to feed the dog!", 100,400);
  }
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').set({
    food:x
  })
  
}


