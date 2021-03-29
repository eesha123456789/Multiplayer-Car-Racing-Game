var database, ball 
var playerCount=0
var distance=0
var car1,car2, cars
var car1Img, car2Img, car3Img, car4Img, groundImg, trackImg
//var pregame=0
//var play=1
//var end=2
var gameState=0;
var game, player, form, gState, allplayers, minute
function preload(){
    car1Img=loadImage('images/car1.png')
    car2Img=loadImage('images/car2.png')
    car3Img=loadImage('images/car3.png')
    car4Img=loadImage('images/car4.png')
    ground=loadImage('images/ground.png')
    trackImg=loadImage('images/track.jpg')
}
function setup(){
    createCanvas(displayWidth - 20,displayHeight - 30)
    database=firebase.database();
    game=new Game()
    game.getState();
    game.start();
}
function draw(){
    if(playerCount===2){
        game.writeState(1)
    }
    if(gameState===1){
        clear()
        getTime()
        game.play()
        game.writeTime(minute)

    }
    if(gameState===2){
        game.end();
    }
}
async function getTime(){
    var response = await fetch('http://worldclockapi.com/api/json/pst/now') 

    var responseJSON = await response.json();

    var datetime=responseJSON.currentDateTime;
   // console.log(datetime);
    minute=datetime.slice(14,16);
    //console.log(minutes);
}