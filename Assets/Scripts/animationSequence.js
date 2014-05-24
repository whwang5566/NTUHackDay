#pragma strict

var playerAnimation: Animation;
var animationNameSet: Array;
var currentAnimationIndex :int = 0;
//every animation time
var animationTime :float= 2.0f;
//var clockTime :float = 0;
var selfPlayerIndex:int;
var offsetYThresholdArray:float[] ;
var currentLevel:int = 0;
var animationFadeDuration:float = 1.0;
//var minYThreshold = -2;

var gameManager: gameManager;

//animations:["tPose","idle","run","sprint","walk","strafeLeft","strafeRight","crouch","crouchWalk","crouchRun","crouchStrafeLeft","crouchStrafeRight","jump"]

function Start () {
	//init
	var counter : int;
	
	//set all animations time and save name
	//playerAnimation.animation["ready"].wrapMode = WrapMode.Once;
	
	/*
	for (var states:AnimationState  in playerAnimation) {
		Debug.Log("States:"+states.name);
		//set not loop
		//states.wrapMode = WrapMode.Once;
    }
    */
    
     
    //animation set
    //animationNameSet = new Array("walk","jump","crouch");  
    
    /*
    var queueMode : QueueMode;
    for(counter = 0;counter<animationNameSet.length;counter++){
    	Debug.Log("Animation:"+animationNameSet[counter]);
    	
    	playerAnimation.CrossFadeQueued(animationNameSet[counter]);
    }
    */
    
    //start first animation
    //clockTime = animationTime;
    
    //threshold
    offsetYThresholdArray = new Array(1.25,0.1,-1);
}

function Update () {
	//check game start
	if(gameManager.gameStart){
		
		//check position y threshold and set animation
		checkThresholdAndSetAnimation();
		
		/*
		//check time
		clockTime += Time.deltaTime;
		
		//check end
		if(currentAnimationIndex >= animationNameSet.length){
			if(clockTime >= animationTime)
			{ 
				playerAnimation.CrossFade("idle");
			}
		}
		else
		{
			//if not play animation
			if(!playerAnimation.isPlaying) playerAnimation.CrossFade("idle",0.5f);
			//play next animation 
		    if(clockTime >= animationTime){
		    	clockTime = 0;
		    	playerAnimation.CrossFade(animationNameSet[currentAnimationIndex]);
		    	Debug.Log("Play Animation:"+animationNameSet[currentAnimationIndex]);
		    	currentAnimationIndex++;
		    }
	    }
	    */
	    
    }
    
}

function checkThresholdAndSetAnimation(){
	if(selfPlayerIndex<1) return;
	//get data from game manger
	var positionOffsetData:Vector3 = gameManager.dataArray[selfPlayerIndex-1].positionOffset;
	
	if(positionOffsetData!=null){
		//check threshold
		if(positionOffsetData.y > offsetYThresholdArray[0]){
			
			if(currentLevel != 2){
				Debug.Log(selfPlayerIndex+" level EXup 2");
				playerAnimation.CrossFade("EXup",animationFadeDuration);
				currentLevel = 2;
			}
		}
		else if(positionOffsetData.y > offsetYThresholdArray[1]){
			
			if(currentLevel != 1){
				Debug.Log(selfPlayerIndex+" level up 1");
				playerAnimation.CrossFade("up",animationFadeDuration);
				currentLevel = 1;
			}
		}
		else if(positionOffsetData.y < offsetYThresholdArray[2]){
			
			if(currentLevel != -1){
				Debug.Log(selfPlayerIndex+" level down -1");
				playerAnimation.CrossFade("down",animationFadeDuration);
				currentLevel = -1;
			}
		}
		/*
		else if(positionOffsetData.y < offsetYThresholdArray[2]){
			//Debug.Log(selfPlayerIndex+" level doen -1");
			if(currentLevel != 0){
				playerAnimation.CrossFade("mid");
				currentLevel = 0;
			}
		}
		*/
		else{
			
			// mid
			
			//if(playerAnimation.curren)
			//playerAnimation.CrossFadeQueued("ready");
			
			//shake
			if((Mathf.Abs(positionOffsetData.x)+Mathf.Abs(positionOffsetData.z)) > 3){
				if(currentLevel != 10){
					playerAnimation.CrossFade("shake",animationFadeDuration);
					currentLevel = 10;
				}
			}
			else{
				if(currentLevel != 0){
					Debug.Log(selfPlayerIndex+" level idel 0");
					playerAnimation.CrossFade("mid",animationFadeDuration);
					currentLevel = 0;
				}
			}
			
		}
	}
}