var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

var balloon1;
var balloon1Img;

var obstacle1,obstacle2,obstacle3;
var obstacle1Img,obstacle2Img,obstacle3Img;
var obs1grp,obs2grp,obs3grp;
var obstaclesGroup;

var obstaclesGroup;
var rand;

var resetButton, resetButtonImg;
var gameOver, gameOverImg;

var level = 1;

function preload() {
    balloon1Img = loadImage("assets/MainCharacter.png");

    obstacle1Img = loadImage("assets/obstacle1.png");
    obstacle2Img = loadImage("assets/obstacle2.png");
    obstacle3Img = loadImage("assets/obstacle3.png");

    resetButtonImg = loadImage("assets/resetButton.png");
    gameOverImg = loadImage("assets/gameOver.png");
}
function setup() {
    createCanvas(500,800);
    engine = Engine.create();
    world = engine.world;

    balloon1 = createSprite(250,700,65,100);
    balloon1.addImage("pc",balloon1Img);
    balloon1.setCollider("circle",0,-15,45);
    balloon1.debug = true

    resetButton=createSprite(250,60)
    resetButton.addImage(resetButtonImg);
    resetButton.scale=0.5;

    gameOver=createSprite(250,400)
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.8;
    gameOver.visible = false;

   obs1grp = new Group();
   obs2grp = new Group();
   obs3grp = new Group();

}
function draw() {
    background(10, 128, 202);
    Engine.update(engine);

    fill("white")
    textSize(25);
    text("score:" + score,40,60);

    fill("white")
    textSize(25);
    text("level:" + level,400,60);

    if(gameState === PLAY){
        
    score=  score+ Math.round(frameCount/300);

    if (balloon1.x <= 0 || balloon1.x >= 500) {
        balloon1.x = 250;
    }

    spawnObstacles();
    handleKeyControls();

    if (obs1grp.isTouching(balloon1) || obs2grp.isTouching(balloon1) || obs3grp.isTouching(balloon1)) {
        gameState = END;
    }
 }
    else if (gameState === END) {
    results();
    if(mousePressedOver(resetButton)) {
        reset();
      }
    }   

    balloon1.display();
    levelUp();

    drawSprites();
}
function handleKeyControls() {
    if (keyDown(37)){
        balloon1.x -= 5;
    }
    if (keyDown(39)) {
        balloon1.x += 5;
    }

}
function spawnObstacles(){
    if (frameCount % 60 === 0){
     // var obstacle = createSprite(Math.round(random(1,500)),200,40,40);
      //obstacle.velocityY = 6;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle1=createSprite(Math.round(random(1,500)),200,40,40);
                 obstacle1.velocityY = 6;
                 obstacle1.addImage("triangle", obstacle1Img);
                 obstacle1.scale=0.5;
                 obs1grp.add(obstacle1);
                 obstacle1.lifetime = 300;
                 obstacle1.setCollider("circle",0,-15,90);
                 obstacle1.debug = true
                 break;
         case 2: obstacle2=createSprite(Math.round(random(1,500)),200,80,40);
                 obstacle2.velocityY = 6;
                 obstacle2.addImage("circle", obstacle2Img);
                 obstacle2.scale=0.3;
                 obs2grp.add(obstacle2);
                 obstacle2.lifetime = 300;
                 break;
         case 3: obstacle3=createSprite(Math.round(random(1,500)),200,10,80);
                 obstacle3.velocityY = 6;
                 obstacle3.addImage("octogon", obstacle3Img);
                 obstacle3.scale=0.7;
                 obs3grp.add(obstacle3);
                 obstacle3.lifetime = 300;
                 obstacle1.setCollider("circle",0,-15,90);
                 obstacle1.debug = true
                 break;
         default: break;
       }
      
       
      
       
    }
}

function spawnObstacles2(){
    console.log("level2 started")
    if (frameCount % 150 === 0){
     // var obstacle = createSprite(Math.round(random(1,500)),200,40,40);
      //obstacle.velocityY = 6;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle1=createSprite(Math.round(random(1,500)),200,40,40);
                 obstacle1.velocityY = 6;
                 obstacle1.addImage("triangle", obstacle1Img);
                 obstacle1.scale=0.5;
                 obs1grp.add(obstacle1);
                 obstacle1.lifetime = 300;
                 obstacle1.setCollider("circle",0,-15,90);
                 obstacle1.debug = true
                 break;
         case 2: obstacle2=createSprite(Math.round(random(1,500)),200,80,40);
                 obstacle2.velocityY = 6;
                 obstacle2.addImage("circle", obstacle2Img);
                 obstacle2.scale=0.3;
                 obs2grp.add(obstacle2);
                 obstacle2.lifetime = 300;
                 break;
         case 3: obstacle3=createSprite(Math.round(random(1,500)),200,10,80);
                 obstacle3.velocityY = 6;
                 obstacle3.addImage("octogon", obstacle3Img);
                 obstacle3.scale=0.7;
                 obs3grp.add(obstacle3);
                 obstacle3.lifetime = 300;
                 obstacle1.setCollider("circle",0,-15,90);
                 obstacle1.debug = true
                 break;
         default: break;
       }
      
       
      
       
    }
}
function results(){
    
    console.log("inside results");
    obs1grp.setVelocityYEach(0);
    obs2grp.setVelocityYEach(0);
    obs3grp.setVelocityYEach(0);
    
    obs1grp.setLifetimeEach(-1);
    obs2grp.setLifetimeEach(-1);
    obs3grp.setLifetimeEach(-1);

    gameover();    
}

function levelUp(){
//if score = 1000
    if (score === 200) {
        level = level + 1;
        console.log("level 2");

        fill("white");
        textSize(30);
        text("Level 2 Starting",150,400)
    }
    if (level === 2) {
        spawnObstacles2();
    }
}

function gameover() {
    console.log("inside gameover");
    gameOver.visible = true;
}

function reset() {
    gameState = PLAY;
    resetButton.visible = false;
    gameOver.visible = false;
  
    obs1grp.destroyEach();
    obs2grp.destroyEach();
    obs3grp.destroyEach();
  
    score = 0;
    level = 1;
}