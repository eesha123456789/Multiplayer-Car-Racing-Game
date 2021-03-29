class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState'); // Keeps a cursor at this reference
        gameStateRef.on('value', function(data){
        gameState=data.val();
        
        }); // two params --> execute the values + print some errors
    }
    writeState(gState){
        database.ref('/').update({
            gameState:gState
        })
    }
    writeTime(sTime){
        database.ref('/').update({
            startTime:sTime
        })
    }
    async start(){
        if(gameState===0){
            player=new Player()
            var playerCountRef=await database.ref('playerCount').once('value')
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val()
                player.getCount()
            }
            form=new Form()
            form.display()
        }
        console.log(playerCount)
        car1=createSprite(100,200)
        car1.addImage(car1Img)
        car2=createSprite(300,200)
        car2.addImage(car2Img)
        cars=[car1,car2]
    }
    play(){
        form.hide()
        Player.getPlayerInfo();
        if(allplayers!==undefined){
            background(ground)
            image(trackImg, 0,-displayHeight*3,displayWidth,displayHeight*4)
           // var displayPosition=130
           var index=0
           var x=250
           var y=0 
            for(var plr in allplayers){
                index=index+1
                x=x+300
                y=displayHeight - allplayers[plr].distance
                cars[index - 1].x=x
                cars[index - 1].y=y

                if(index===player.index){
                    //cars[index - 1].shapeColor='red'
                    fill('lightblue')
                    ellipse(x,y,70,70)
                    camera.position.x=displayWidth/2
                    camera.position.y=cars[index - 1].y
                }
            }
        }
        if(player.distance===4150){
            gameState=2
        }
        if(keyIsDown(UP_ARROW) && player.index!==null)
        {
            player.distance=player.distance+50;
            player.update();
           // console.log(player.distance)
        }

  /*var response = await fetch('http://worldclockapi.com/api/json/pst/now') 

  var responseJSON = await response.json();

  var datetime=responseJSON.currentDateTime;
  console.log(datetime);
  var minute=datetime.slice(15,17);
  console.log(minute);*/
        drawSprites();
    }
    end(){
        console.log("game is over")

    }
}