var PLAY = 1
var END = 0
var gato;
var obst, obstImg, obstGroup;
var ground, groundImg, invisGround;
var cloudsGroup, cloudImage;
var score = 0;
var gamestate = PLAY
var gameover, gameoverImg;
function preload(){
  //fondo de windows, no encontreo otro
  groundImg = loadImage("images/floor.png")
  //planta
  obstImg = loadImage("images/plant.png")
  //mas nubes
  cloudImage = loadImage("images/cloud.png")
  //la imagen del gameover
  gameoverImg = loadImage("images/gameOver.png")
}

function setup() {
  createCanvas(1000,windowHeight)
  
  invisGround = createSprite(200,windowHeight-50,5000,10)
  
 
  
  gato = createSprite (50,200,50,50)
  gato.shapeColor = (0)
  gato.rotationSpeed = 1
  gato.velocityX = 4
  obstGroup = new Group();
  cloudsGroup = new Group();
  gameover = createSprite(500,windowHeight/2,50,50)
  gameover.addImage("gameover",gameoverImg)

  ground = createSprite(200,335,20,20)
  ground.addImage("woodfloor",groundImg)
  ground.scale = 1
  
}

function draw() {
  background(0)
  camera.position.x = gato.x + 450
  camera.position.y = displayHeight/2
  if(gamestate === PLAY){
    spawnObstacles();
    spawnClouds();
    score = score + Math.round(getFrameRate()/60);
    gameover.visible = false
    gato.velocityY = gato.velocityY + 0.8
    //pa que no se vaya
    gato.collide(invisGround);
    //pa que se haga un fondo infinito
    if(gato.x > 200){
      gato.x = -750
    }
    //pa saltar
    if (keyDown("space")&& gato.y > invisGround.y-50){
      gato.velocityY = -16
    }
    //pa acabar el juego
    if(obstGroup.isTouching(gato)){
      gamestate=END;
      
    }
    //???
    if(cloudsGroup.isTouching(gato)){
      gato.velocityY = -20
    }
  }else if(gamestate===END){
    gato.rotationSpeed = 0
    gato.velocityY = 0
    gato.velocityX
    gameover.visible = true 
      if(mousePressedOver(gameover)) {
      reset();
      }
  }
  drawSprites();

  //el score
  textSize(30)
  fill("black")
  text("Score: "+ score,displayWidth-175,30);
  
}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   obst = createSprite(displayWidth+300,invisGround.y-50,50,50);
   obst.addImage("obst",obstImg)
    obst.scale = 0.1;
    obst.lifetime = 800;
   //para hacerlo un poco mas facil
   obst.setCollider("rectangle",0,0,800,800)
    obstGroup.add(obst);
 }
}
function spawnClouds() {
 
  if (frameCount % 120 === 0) {
                                                          //!!!***aqui no funciona***!!!, no se como hacer que aparezcan 
    var cloud = createSprite(displayWidth+300,gato.Y + 20,40,10);
    cloud.y = Math.round(random(80,windowHeight/2+windowHeight/4));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.lifetime = 800;
    cloudsGroup.add(cloud);
    obst.velocityX = -5;
    //???
    cloud.rotationSpeed = 1
  }
}

function reset () {
  gamestate = PLAY;
  gameover.visible = false;
  obstGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  gato.rotationSpeed = 1
  gato.velocityX = 4
}