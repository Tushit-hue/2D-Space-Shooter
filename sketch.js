var gameState;
var sound;
var textArea;
var earth , earthImg;
var cannon;
var cannonImg;
var ammo , ammoImg ; 
var edges ; 
var meteor , meteorL , meteorR;
var missile , missileImg;


function preload(){
    bg = loadImage("bg.jfif")
    sound = loadSound("bg.mp3")
    earthImg = loadImage("erth.png")
    cannonImg = loadImage("cannon.png")
    meteorL = loadImage("ml.png")
    meteorR = loadImage("mr.png")
    missileImg = loadImage("missile.png")

}
function setup(){
    var canvas = createCanvas(1000,730)
    gameState = 0


    missile = createSprite(500,570,20,20)
    missile.addImage(missileImg)
    missile.scale = 0.4
    missile.visible = false;



    earth = createSprite(400,750,100,200)
    earth.addImage(earthImg)
    earth.scale = 1.9;
    earth.setCollider("rectangle",0,-50,1000,10)

    cannon = createSprite(500,550,20,20)
    cannon.addImage(cannonImg)
 
    meteor = createSprite(random(100,900),-200,100,100);
 


    textArea = new Textt();
    sound.play(); 
    

}
function draw(){
   
    if(gameState===0){
        background(255)
        Form.header();
        textArea.display();

        if(keyCode===13){
            gameState +=1;
        }
    }


    if(gameState===1){

        missile.x = cannon.x;
        missile.y = 500
        if(sound.isPlaying()){
            sound.stop();
        }  
        background(bg)
        textArea.hide();

        if (keyDown('LEFT_ARROW')) {
            cannon.x -= 5;
            
            if(cannon.x <= 300){
                cannon.x -= 5;
                cannon.y += 3;
            }
            if (cannon.x>=580) {
                cannon.x -=5;
                cannon.y -=2
            }
            if (cannon.y>631) {
                cannon.y = 631;
            }

        }

        if (keyDown('RIGHT_ARROW')) {
            cannon.x += 5
            
            if(cannon.x <= 300){
                cannon.x += 5;
                cannon.y -= 3;
            }
            if (cannon.x>580) {
                cannon.x +=5;
                cannon.y +=3;
            }
            if(cannon.y>658){
                cannon.y  = 658
            }
        }


        if(frameCount%120===0){
            meteor = createSprite(random(100,900),-200,100,100);
            meteor.setCollider("circle",60,140,80)
            
            
            
            if(meteor.x<450){
                meteor.addImage(meteorL)
                meteor.setVelocity(random(6,11),11)
                meteor.scale = 0.4
            }else{
                meteor.addImage(meteorR)
                meteor.setVelocity(random(-6,-11),9)
                meteor.scale = 0.3
            }     
        }

        if (keyDown("space")) {
            missile.visible = true;
            missile.y -= 250
           
        }

        if(missile.collide(meteor)){
            meteor.destroy();
        }
        if(meteor.collide(earth)||meteor.collide(cannon)){
            gameState = 2
        }

        edges = createEdgeSprites();
        cannon.collide(edges);

       

        drawSprites();
        
        if(gameState==2){
            background(255)
            textSize(30)
            textFont("Consolas")
            fill("red")
            text("You Lost one more meteor shatered Earth",150,300)
            text("No more chances",350,370)

        }

    }
    
    
}
