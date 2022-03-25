//aqui se crean las variables de path, boy, los tesoros y sus grupos
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //aqui se cargan las imagenes de boy, path, y los tesoros
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//crear el canvas y ajustar el tamaño de la ventana para que sea compatible con el dispositivo 
createCanvas(windowWidth, windowHeight);
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//crear sprite boy corriendo
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
 //aqui se crean los grupos de los tesoros 
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  //esto es lo que pasa cuando el juego inicia
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  //aqui se crean los bordes y el codigo para que boy colisione con ellos
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  if(path.y > 400 ){
    path.y = height/2;
  }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //aqui se configura lo que pasa cuando boy toca un tesoro
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      //esto es lo que pasa cuando el juego se acaba
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesoro: "+ treasureCollection,width-150,30);
  }

}

//aqui se crean los sprites de los tesoros, ubicaciones, imagenes, tamaño, velocidad, lifetime y su aparicion aleatoria
function createCash() {
  if (World.frameCount % 200 == 0) {
   //Modificar las posiciones del dinero 
    var cash = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
       // Modificar las posiciones de los diamantes 

    var diamonds = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de las joyas para hacerlas aparecer en el tamaño de pantaña disponible.

    var jwellery = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    //Modificar las prosiciones de la espada para hacerla aparecer en el tamaño de pantaña disponible. 

    var sword = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
