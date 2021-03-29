var ball, database,position;

function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballposition = database.ref('Ball/Position'); // Keeps a cursor at this reference
    ballposition.on('value',readPosition,showError); // two params --> execute the values + print some errors
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('Ball/Position').set({
        'x':position.x + x,
        'y':position.y + y
    })
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
}

function readPosition(data) // all the values read are stored in 'data' variable
{
    position=data.val(); // all values inside 'data' variable is transferred to position variable
    console.log(position);
    ball.x=position.x;
    ball.y=position.y;
}

function showError()
{
    console.log("Error while reading from the database");
}