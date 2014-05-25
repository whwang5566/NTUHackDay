#pragma strict

var zug_01:GameObject;
//var zug_02:GameObject;
//var zug_03:GameObject;

var zug_01_anim:Animation;
//var zug_02_anim:Animation;
//var zug_03_anim:Animation;
var manager:gameManager;


function Awake()
{
    zug_01 = transform.Find("achterbahn_zug1").gameObject;     
//    zug_02 = transform.Find("achterbahn_zug2").gameObject;     
//    zug_03 = transform.Find("achterbahn_zug3").gameObject;    

    zug_01_anim = zug_01.GetComponent(Animation);
    //set animation speed
    for (var state : AnimationState in zug_01_anim) {
		state.speed = 1.4;
	}
//    zug_02_anim = zug_02.GetComponent(Animation);
//    zug_03_anim = zug_03.GetComponent(Animation);
}

function Start()
{
	/*
    zug_01_anim.Play("fahren_loop");    
    zug_02_anim.Play("init1");    
    zug_03_anim.Play("init2");  
    */

}

function Update()
{
	if (Input.GetKeyDown (KeyCode.Space)) {
		//get game manager
		var managerScript:gameManager = manager.GetComponent("gameManager");
		managerScript.startGame();
		
		//if( !zug_01_anim.IsPlaying("fahren_loop") )
		zug_01_anim.Play("fahren_loop");        
			
		//if( (!zug_02_anim.IsPlaying("init1")) && (!zug_02_anim.IsPlaying("fahren_loop")) )
		//zug_02_anim.Play("fahren_loop");        
			
		//if( (!zug_03_anim.IsPlaying("init2")) && (!zug_03_anim.IsPlaying("fahren_loop")) )
		//zug_03_anim.Play("fahren_loop");				
	}
}

