const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var soldier;
var soldierimgWalkAnimation;
var ground1, ground2;
var ground1img,ground2img;
var terrorist1, terrorist2;
var terrorist1img, terrorist2img;
var life1, life2, life3, life4, life5;
var lifeimg;
var rules, rulesimg;
var gameState = 1;
var Play = 1;
var End = 0;
var beforeStart = 0;
var gameOver, gameOverimg;
var restart, restartimg;
var coin, bush, sign, signArrowimg;
var coinimg, bushimg, signimg, signARROWIMG;
var jump, jumpiconimg;
var obstacles, skeltonimg;
var obstaclesGroup;
var tilesGroup;
var Start, startImg;
var score;

// function for loading the images, animations and music for sprites
function preload(){
  backimg = loadImage("images/backimg.png");
  lifeimg = loadImage("images/Lifeimg1.png");
  rulesimg = loadImage("images/Rulesimg.png");
  jumpIconImg = loadImage("images/jumpIconImg.png");
  coinimg = loadImage("images/coinImg.png");
  gameOverimg =loadImage("images/GameOverimg.png");
  restartimg = loadImage("images/restarticonimg.png");
  obstacle1img = loadImage("tiles/1.png");
  obstacle2img = loadImage("tiles/2.png");
  skeltonimg = loadImage("images/skelton.png");
  signimg = loadImage("images/sign.png");
  signArrowimg = loadImage("images/signarrow.png");
  bushimg = loadImage("images/bush.png");
  startIconimg = loadImage("images/startIconImg.png");
  girlimg = loadImage("images/girlimg.png");
  trophyimg = loadImage("images/trophyGif.png")

  soldierWalkAnimation = loadAnimation("soldierWalkImages/Walk 1.png","soldierWalkImages/Walk 2.png",
                        "soldierWalkImages/Walk 3.png",
                        "soldierWalkImages/Walk 4.png",
                        "soldierWalkImages/Walk 5.png",
                        "soldierWalkImages/Walk 6.png", 
                        "soldierWalkImages/Walk 7.png",
                        "soldierWalkImages/Walk 8.png",
                        "soldierWalkImages/Walk 9.png",
                        "soldierWalkImages/Walk 10.png");

    soldierCollidedAnimation = loadAnimation("soldierDeadImages/Dead 1.png","soldierDeadImages/Dead 2.png",
                        "soldierDeadImages/Dead 2.png",
                        "soldierDeadImages/Dead 3.png",
                        "soldierDeadImages/Dead 4.png",
                        "soldierDeadImages/Dead 5.png", 
                        "soldierDeadImages/Dead 6.png",
                        "soldierDeadImages/Dead 7.png",
                        "soldierDeadImages/Dead 8.png",
                        "soldierDeadImages/Dead 9.png",
                        "soldierDeadImages/Dead 10.png");

    soldierJumpAnimation= loadAnimation("soldierJumpImages/Jump 1.png","soldierJumpImages/Jump 1.png",
                        "soldierJumpImages/Jump 2.png",
                        "soldierJumpImages/Jump 3.png",
                        "soldierJumpImages/Jump 4.png",
                        "soldierJumpImages/Jump 5.png", 
                        "soldierJumpImages/Jump 6.png",
                        "soldierJumpImages/Jump 7.png",
                        "soldierJumpImages/Jump 8.png",
                        "soldierJumpImages/Jump 9.png",
                        "soldierJumpImages/Jump 10.png");

   jumpsound = loadSound("sounds/jump.wav");
   loopSound = loadSound("sounds/spooky.wav");
   dieSound = loadSound("sounds/dieSound.wav");
}

  

// function for making sprites and bodies
function setup() {
  engine = Engine.create();
  world = engine.world;

  createCanvas(900,800);
  
  bg = createSprite(900,400,600,600);
  bg.addImage(backimg);
  bg.scale = 5;
  bg.velocityX = -4;
  bg.x = width/2;
  bg.visible = false;

  soldier = createSprite(100,710,50,50);
  soldier.addAnimation("soldier_Walking",soldierWalkAnimation);
  soldier.addAnimation("soldier_Collided",soldierCollidedAnimation);
  soldier.addAnimation("soldier_Jumping",soldierJumpAnimation);

  soldier.scale = 0.2;
  soldier.visible = false;

  life1 = createSprite(640,100,20,20);
  life1.addImage(lifeimg);
  life1.scale = 0.2;
  life1.visible = false;

  life2 = createSprite(720,100,20,20);
  life2.addImage(lifeimg);
  life2.scale = 0.2;
  life2.visible = false;

  life3 = createSprite(800,100,20,20);
  life3.addImage(lifeimg);
  life3.scale = 0.2;
  life3.visible = false;

  rules = createSprite(100,100,20,20);
  rules.addImage(rulesimg);
  rules.scale = 0.5;

  ground1 = createSprite(100,710,80,20);
  ground1.visible = false;

  /*invisibleGround = createSprite(380,475,65,20);
  invisibleGround.visible = true;
  invisibleGround.velocityX = -2;*/

  jumpIcon = createSprite(810,720,50,50);
  jumpIcon.addImage(jumpIconImg);
  jumpIcon.scale = 0.1;
  jumpIcon.visible = false;

  gameOver = createSprite(500,500,30,30);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 2;

  restart = createSprite(500,600,30,30);
  restart.addImage(restartimg);
  restart.scale = 0.1;

  startIcon = createSprite(600,500,30,30);
  startIcon.addImage(startIconimg);
  startIcon.scale = 0.2;
  startIcon.visible = true;

  girl = createSprite(800,650,50,50);
  girl.addImage(girlimg);
  girl.scale = 0.2;
  girl.visible = false;

  score = 0;

  tilesGroup = createGroup();
  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
  
  soldier.setCollider("rectangle",0,0,soldier.width,soldier.height);
  soldier.debug = true;
  
}

function draw() {
  
    background("white");
    
      if(bg.x < 300) {
        bg.x = 500
      }

      text(mouseX+','+ mouseY,mouseX,mouseY);
      Engine.update(engine);

      life=[life1,life2,life3]
   // making a condtition play which would have a lot of instructions when the game is in play state
      if(gameState === Play){
        life1.visible = true;
        life2.visible = true;
        life3.visible = true;
        jumpIcon.visible = true;
        soldier.visible = true; 
        rules.visible = true;
        startIcon.visible = false;
        ground1.visible = false;
        bg.visible = true;
        gameOver.visible = false;
        restart.visible = false;
      
        if(coinsGroup.isTouching(soldier)){
          score = score+1;
          coinsGroup.destroyEach();
        }

        // to make the soldier jump when space key and jumpIcon is pressed
        if(mousePressedOver(jumpIcon)){
          jumpsound.play();
          soldier.velocityY = -10;
          soldier.changeAnimation("soldier_Jumping",soldierJumpAnimation);
        }
      
        spawnTiles();
        spawnObstacles();
      
      }

        

       if(obstaclesGroup.isTouching(soldier)){
        dieSound.play();
        life = life-1;
        gameState = End;
       }

      else if (gameState === End) {
        
        gameOver.visible = true;
        restart.visible = true;
        jumpIcon.visible = false;
        life1.visible = false;
        life2.visible = false;
        life3.visible = false;
        rules.visible = false;
        
        bg.velocityX = 0;
        // the groups of obstacles,tiles and coins will not get destroy when state is End
        obstaclesGroup.setLifetimeEach(-1);
        tilesGroup.setLifetimeEach(-1);
        coinsGroup.setLifetimeEach(-1);
       
        obstaclesGroup.setVelocityXEach(0);
        tilesGroup.setVelocityXEach(0); 
        coinsGroup.setVelocityXEach(0); 

        //change the soldier animation
        soldier.changeAnimation("soldier_Collided", soldierCollidedAnimation);
        
        // calling restart function
       if(mousePressedOver(restart)) {
        reset();
        }
      }  
      // it will work only when state is not end and frameCount is 1200
      if(gameState != End && frameCount === 1200){
        girl.visible = true;;
        bg.velocityX = 0;
        soldier.velocityX = 6;

        obstaclesGroup.destroyEach();
        coinsGroup.destroyEach();
        tilesGroup.destroyEach();
      }
      // it will work only when state is not end and frameCount is 1120
      if(gameState != End && frameCount === 1320) {
        girl.visible = false;
        
        // create trophy sprite only when frameCount is 1120
        trophy = createSprite(450,500,500,500);
        trophy.addImage(trophyimg);
        trophy.scale = 0.5;
        soldier.velocityX = 0;
        
      }
      // giving the soldier gravity so that when space key is pressed the soldier will not go out of the canvas
      soldier.velocityY = soldier.velocityY+0.5;
    // so the ground1 will also move along with soldier
     ground1.x = soldier.x;
    
    // so that when space key is pressed and soldier will come down he will collide with the ground
     soldier.collide(ground1);

     drawSprites();

     if(mouseIsOver(rules)){
      fill("blue")
      textSize(28);
      text("RULES OF THE GAME",250,150);
  
      fill("black")
      textSize(20);
      text("✨You are the little Knight in this game and have to save the little girl who is ",
      100,180);
  
      fill("black")
      textSize(20);
      text("attacked by some aliens and be aware of the skeltons you will get in your way",100,200);
  
      fill("black")
      textSize(20);
      text("because the skeltons will make your one life out.",100,220);
  
      fill("black")
      textSize(20);
      text("✨You can't move left, right, up and down. You can only JUMP with the jump icon .",100,240);

      fill("black")
      textSize(20);
      text("✨You have total 3 lives .",100,260);
  
      fill("Green")
      textSize(25);
      text("BEST OF LUCK👍👍👍",250,340);
      
      obstaclesGroup.destroyEach();
      coinsGroup.destroyEach();
      tilesGroup.destroyEach();
    }
    fill("pink");
    textSize(20);
    text("Score: "+ score, 300,100);

    fill("red");
    textSize(15);
    text("JUMP", 790,760);



}



function reset(){
  gameState = Play;
  restart.visible = false;
  gameOver.viisible = false;
  obstaclesGroup.destroyEach();
  bg.velocityX = -5;
  tilesGroup.destroyEach();
  coinsGroup.destroyEach();
  soldier.changeAnimation("soldier_Walking",soldierWalkAnimation);
  score = 0;
 
 }
    

 function spawnTiles() {
    if(frameCount % 150 === 0){
    var tiles = createSprite(380,500,80,50);
    var coin = createSprite(380,420,10,5);
    tiles.addImage(obstacle2img);
    coin.addImage(coinimg);
    coin.scale = 0.2;
    tiles.velocityX = -2;
    coin.velocityX = -2;
 //generate random obstacles
    var rand = Math.round(random(10,60));
//assign scale and lifetime to the obstacle           
    tiles.scale = 0.5;
    tiles.lifetime = 150;
    coin.scale = 0.5;
    coin.lifetime = 150;
    tiles.lifetime = 150;
    // adding tiles to the group
    tilesGroup.add(tiles);
    coinsGroup.add(coin);
  }
 }

 function spawnObstacles() {
    if(frameCount % 200 === 0){
    var obstacles = createSprite(380,680,10,40);
    obstacles.addImage(skeltonimg);
    obstacles.velocityX = -2;
 //generate random obstacles
    var rand = Math.round(random(10,90));
//assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 150;
// adding obstacles to the group
    obstaclesGroup.add(obstacles);
  }
 }

