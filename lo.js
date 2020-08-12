function load_images(){
    enemy_image = new Image;
    enemy_image.src = "v1.png";

    player_image = new Image;
    player_image.src = "superhero.png";

    gem_image = new Image;
    gem_image.src = "gem.png";

}


function init(){
    canvas = document.getElementById("mycanvas");
    W = 700;
    H = 400;
    canvas.height = H;
    canvas.width = W;

    pen = canvas.getContext('2d');
    game_over  = false;
    e1 ={
        x : 200,
        y : 0,
        w : 60,
        h : 60,
        speed : 10
    };
    e2 ={
        x : 400,
        y : 0,
        w : 60,
        h : 60,
        speed : 10
    };
    e3 ={
        x : 500,
        y : 0,
        w : 60,
        h : 60,
        speed : 10
    };
    e4 ={
        x : 600,
        y : 0,
        w : 60,
        h : 60,
        speed : 10
    };
    enemy = [e1,e2,e3,e4];

    player ={
        x : 20,
        y : H/2,
        w : 60,
        h : 76,
        speed: 70,
        moving : false,
        health : 100
    };
    gem = {
        x : W-100,
        y : H/2,
        w : 60,
         h :60
    };
    //list
    canvas.addEventListener('mousedown',function(){
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){
        player.moving = false;
    });

}

function isoverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
         return true;
     }
     return false;
     

}

function draw(){
    pen.clearRect(0,0,W,H);
   // pen.fillStyle = "red";
//pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
pen.drawImage(player_image,player.x,player.y,player.w,player.h);
pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
for(let i=0;i<enemy.length;i++){
      pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h)
  }
  pen.fillStyle = "white";
  pen.fillText("score" +player.health,10,10);




}
function update(){

    if(player.moving==true){
        player.x += player.speed;
        player.health += 20;
    }
    if(isoverlap(player,gem)){
        alert("you won");
        game_over = true;

        return;
    }

    for(let i=0;i<enemy.length;i++){
        if(isoverlap(enemy[i],player)){
            player.health -=30;
            if(player.health < 0){
                console.log(player.health);
                game_over = true;
                alert("game over" +player.health);
            }
        }
    }
    
    for(let i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y >= H-enemy[i].h  || enemy[i].y <0){
             enemy[i].speed *= -1;
        }
    }
 
            
}

function gameloop(){
    if(game_over == true){
        clearInterval(f);
    }
    
    draw();
    update();
    

}
load_images();
init();
var f = setInterval(gameloop,100);