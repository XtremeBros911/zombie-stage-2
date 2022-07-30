var bg, bgImg;
var zombie, zombieImg;
var hunter, hunterImg;
var hunterShooting;
var zombieGroup;
var bullet = 100;
var bulletGroup;
var gameState = "start"
var heart1Img, heart2Img, heart3Img;
var heart1, heart2, heart3;
var life = 3;



function preload(){
    bgImg=loadImage("bg.jpeg");
    zombieImg = loadImage("zombie.png");
    hunterImg = loadImage("shooter_2.png");
    hunterShooting = loadImage("shooter_3.png");
    heart1Img = loadImage("heart_1.png");
    heart2Img = loadImage("heart_2.png");
    heart3Img = loadImage("heart_3.png");
}

function setup(){

    createCanvas(windowWidth,windowHeight);
    
    bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
    bg.addImage(bgImg);
    bg.scale= 1.15

    heart1 = createSprite(displayWidth - 150, 40, 20, 20);
    heart1.visible = false;
    heart1.addImage("heart1", heart1Img);
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100 , 40, 20, 20);
    heart2.visible = false;
    heart2.addImage("heart2", heart2Img);
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth- 150, 40, 20, 20);
    heart3.visible = false;
    heart3.addImage("heart3", heart3Img);
    heart3.scale = 0.4

    hunter = createSprite(displayWidth - 1150, displayHeight- 300, 50, 50);
    hunter.addImage(hunterImg);
    hunter.scale = 0.5;

    //hunter.debug= true;
    hunter.setCollider("rectangle", 0,0,300,300);

    zombieGroup = new Group();
    bulletGroup = new Group();

}

function draw(){

    background(0); 

    if(gameState === "start"){

        if(life === 3){
            heart3.visible = true;
            heart2.visible = false;
            heart1.visible = false;
        }

        if(life === 2){
            heart3.visible = false;
            heart2.visible = true;
            heart1.visible = false;
        }

        if(life === 1){
            heart3.visible = false;
            heart2.visible = false;
            heart1.visible = true;
        }

        if(life === 0){
            gameState = "lost"
        }

       // if(score === 100){
       //     gameState = "won" 
       // }

        if(keyDown("UP_ARROW")){
            hunter.y = hunter.y - 30;
        } 
    
        if(keyDown("DOWN_ARROW")){
            hunter.y = hunter.y + 30;
        }
    
        if(keyWentDown("space")){
            hunter.addImage(hunterShooting)
            bullet = createSprite(displayWidth - 1150, hunter.y - 30,20,10);
            bullet.velocityX = 15;
            bulletGroup.add(bullet);
    
            hunter.depth = bullet.depth;
            hunter.depth += 2;
            bullet = bullet - 1
        }
    
        else if(keyWentUp("space")){
            hunter.addImage(hunterImg)
        }
    
        if(bullet === 0){
            gameState= "bullet";
        }
    


        if(zombieGroup.isTouching(hunter)){
    
            for(var i = 0; i < zombieGroup.length; i++){
               if(zombieGroup[i].isTouching(hunter)){
                zombieGroup[i].destroy();
                life = life - 1;
               }
            }
            
        }

        if(zombieGroup.isTouching(bulletGroup)){
    
            for(var i = 0; i < zombieGroup.length; i++){
                if(zombieGroup[i].isTouching(bulletGroup)){
                    zombieGroup[i].destroy();
                    bulletGroup.destroyEach();
                    
                }
            }

           
        }
    
    
        spawnZombie();

    }
    
    drawSprites();

    if(gameState === "lost"){
        heart3.visible = false;
        heart2.visible = false;
        heart1.visible = false;

        textSize(100);
        fill("red");
        text("Game Over - No lives left", 340,400);

        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        hunter.destroy();
    }
   

}   

function spawnZombie(){

    if(frameCount%100 === 0){

        zombie=createSprite(random(500,1100),random(100,500), 40, 40);
        zombie.addImage(zombieImg);
        zombie.scale = 0.2115
        zombie.velocityX = -3;
        zombie.lifetime = 400;

        //zombie.debug= true
        zombie.setCollider("rectangle", 0,0,400,400);

        zombieGroup.add(zombie);

    }

}
