sound="";
leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
scoreleftWrist=0;
scorerightWrist=0;
function preload()
{
    sound=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
   if(results.length>0)
   {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("Left Wrist X: "+leftWristX
        +" Left Wrist Y: "+leftWristY
        +" Right Wrist X: "+rightWristX
        +" Right Wrist Y: "+rightWristY);
        console.log("Confidence of left wrist: "+scoreleftWrist);
        console.log("Confidence of right wrist: "+scorerightWrist);
   }
}

function modelLoaded()
{
    console.log('Pose Net is initialized');
}

function draw()
{
    image(video,0,0,600,500);   
    if(scoreleftWrist>0.2)
    {
    fill("red");
    stroke("black");
    circle(leftWristX,leftWristY,30);
    NumberLeftWristY=Number(leftWristY);
    remove_decimal=floor(NumberLeftWristY);
    volume=remove_decimal/500;
    exact_volume=1-volume;
    
    document.getElementById("volume").innerHTML="Volume: "+exact_volume;
    sound.setVolume(exact_volume);
    }


    if(scorerightWrist>0.2)
    {
    fill("red");
    stroke("black");
    circle(rightWristX,rightWristY,30);
    if(rightWristY>0 && rightWristY<100)
    {
        document.getElementById("speed").innerHTML="Speed: 2.5x";
        sound.rate(2.5);      
    }

    if(rightWristY>=100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="Speed: 2.0x";
        sound.rate(2);      
    }

    if(rightWristY>=200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML="Speed: 1.5x";
        sound.rate(1.5);      
    }

    if(rightWristY>=300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML="Speed: 1.0x";
        sound.rate(1);      
    }

    if(rightWristY>=400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML="Speed: 0.5x";
        sound.rate(0.5);      
    }

    }
}

function play()
{
    sound.play();
    sound.setVolume(0.5);
    sound.rate(1);
}

