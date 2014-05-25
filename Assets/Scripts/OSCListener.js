
private var UDPHost : String = "127.0.0.1";
private var listenerPort : int = 8000;
private var broadcastPort : int = 57131;
private var oscHandler : Osc;

private var eventName : String = "";
private var eventData : String = "";
private var counter : int = 0;
private var lowpassAlpha : float = 0.4f;

private var yawTemp : float ;
private var pitchTemp : float ;
private var rollTemp : float ;

// public var output_txt : GUIText;
//private var ArrowObj : GameObject;
public var yawInput : float;
public var pitchInput : float;
public var rollInput : float;
public var TargetObject : GameObject;

public var trainObject : gameManager;
private var cornerPosition : GetWagenPosition[];
private var isDown : int = 0;
private var currentLevel : int[] = [0, 0, 0, 0];
var offsetYThresholdArray:float[] ;
var yOffset : float[];
var threshold : float = 0.0f;
var chairState : int = 0;
var carState : int = 0;
var isCorrect : boolean = true;

public function Start ()
{	
	//trainObject = GetComponent("GameManager");
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(UDPHost, broadcastPort, listenerPort);
	oscHandler = GetComponent("Osc");
	oscHandler.init(udp);
			
	oscHandler.SetAddressHandler("/YPRValue", updateYPRValue);
	//oscHandler.SetAddressHandler("/counterTest", counterTest);
	//ArrowObj = GameObject.Find("Arrow");
	 offsetYThresholdArray = new Array(1.25,0.1,-1);
	 yOffset = new float[4];
	
}
Debug.Log("Running");

function Update () {
	//trainObject.
	cornerPosition = trainObject.dataArray;
	calculateState();
	isCorrect = checkState();
	if(!isCorrect){
		Debug.Log("ERRROR");
	}
	//Debug.Log(" P1:"+cornerPosition[0].positionOffset.y +" P2:"+cornerPosition[1].positionOffset.y+" P3:"+cornerPosition[2].positionOffset.y+" P4:"+cornerPosition[3].positionOffset.y );

	TargetObject.transform.eulerAngles = new Vector3(0,0,0);
    TargetObject.transform.Rotate(Vector3.up, yawInput);		
    TargetObject.transform.Rotate(Vector3.right, pitchInput);
    TargetObject.transform.Rotate(Vector3.forward, rollInput);
    //Debug.Log("Y: " + yawInput + " pitch: " + pitchInput + " roll: " + rollInput); 
}	

function OnGUI(){
//	GUI.color.a = 0.0f;
//	//GUI.color = Color.red;
//	GUI.backgroundColor = Color.clear;
//	if(!isCorrect){
//		
//		GUI.color.a = 1f;
//		GUI.Box(new Rect(0, 0,Screen.width, Screen.height), "HI ");
//	}
}

public function checkState() : boolean{
	if(chairState == carState) return true;
	return false;
}

public function updateYPRValue(oscMessage : OscMessage) : void
{	
	//Debug.Log("Update: " + oscMessage.Values[0] + " , " + oscMessage.Values[1] +","+oscMessage.Values[2]); 
	//pitch < 0 - >down
	//pitch > 0 - >up
	yawTemp = oscMessage.Values[0];
	pitchTemp = oscMessage.Values[1];
	rollTemp = oscMessage.Values[2];
	
	
	if(pitchTemp > threshold){
		//up
		chairState = 1;
	}else if(pitchTemp < -threshold){
		chairState = -1;
		//down
	}else{
		chairState = 0;
	}
	//Debug.Log("Y: " + yawTemp + " P: "+ pitchTemp + " R: " + rollTemp);
	
//	if((yawInput < 0 && yawTemp > 0 )||(yawInput > 0 && yawTemp < 0 )){
//		yawInput = yawTemp;
//	}else{
//		yawInput = yawTemp * lowpassAlpha + (yawInput * (1.0 - lowpassAlpha));		
//	}
//
//	if((pitchInput < 0 && pitchTemp > 0 )||(pitchInput > 0 && pitchTemp < 0 )){
//		pitchInput = pitchTemp;
//	}else{
//		pitchInput = pitchTemp * lowpassAlpha + (pitchInput * (1.0 - lowpassAlpha));		
//	}
//	
//	if((rollInput < 0 && rollTemp > 0 )||(rollInput > 0 && rollTemp < 0 )){
//		rollInput = rollTemp;
//	}else{
//		rollInput = rollTemp * lowpassAlpha + (rollInput * (1.0 - lowpassAlpha));		
//	}
	
	
	
/*
	yawInput = oscMessage.Values[0] ;
	pitchInput = oscMessage.Values[1] ;
	rollInput = oscMessage.Values[2] ;
*/

}

public function calculateState() : void{
	
	
	for(var i = 0; i < 4; i++){
		yOffset[i] = cornerPosition[i].positionOffset.y;
		
	} 
	checkThreshold();
	var leftLine : int = currentLevel[2] - currentLevel[0];
	var rightLine : int = currentLevel[3] - currentLevel[1];
	if(leftLine > 0 && rightLine > 0){
		//Debug.Log("DOWN!!!!");
		carState = -1;
	}else if(leftLine < 0 && rightLine < 0){
		//climb
		carState = 1;
		//Debug.Log("CLIMB~~~~~");
	}else{
		//claim
		carState = 0;
		//Debug.Log("---------------------");
	}
	//Debug.Log("0: " + yOffset[0] + ", 1: " + yOffset[1] + ", 2: " + yOffset[2] + ", 3: " + yOffset[3]);
	
	
}
  
function checkThreshold(){
	for(var j = 0; j < 4;j++){
		if(yOffset[j] > offsetYThresholdArray[0]){
			if(currentLevel[j] != 2){
				//Debug.Log(selfPlayerIndex+" level EXup 2");
				//playerAnimation.CrossFade("EXup",animationFadeDuration);
				currentLevel[j] = 2;
			}
		}
		else if(yOffset[j] > offsetYThresholdArray[1]){
			
			if(currentLevel[j] != 1){
				//Debug.Log(selfPlayerIndex+" level up 1");
				//playerAnimation.CrossFade("up",animationFadeDuration);
				currentLevel[j] = 1;
			}
		}
		else if(currentLevel[j] < offsetYThresholdArray[2]){
			
			if(currentLevel[j] != -1){
				//Debug.Log(selfPlayerIndex+" level down -1");
				//playerAnimation.CrossFade("down",animationFadeDuration);
				currentLevel[j] = -1;
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
			/*if((Mathf.Abs(positionOffsetData.x)+Mathf.Abs(positionOffsetData.z)) > 3){
				if(currentLevel[j] != 10){
					playerAnimation.CrossFade("shake",animationFadeDuration);
					currentLevel = 10;
				}
			}*/
			//else{
				if(currentLevel[j] != 0){
					//Debug.Log(selfPlayerIndex+" level idel 0");
					//playerAnimation.CrossFade("mid",animationFadeDuration);
					currentLevel[j] = 0;
				}
			//}
		}
		//Debug.Log(""+currentLevel[2]+", "+currentLevel[3] + ", "+currentLevel[0] + ", "+currentLevel[1]);
	}
}

public function updateText(oscMessage : OscMessage) : void
{	
	eventName = Osc.OscMsgTostr(oscMessage);
	eventData = oscMessage.Values[0];
} 

public function counterTest(oscMessage : OscMessage) : void
{	
	Osc.OscMsgTostr(oscMessage);
	counter = oscMessage.Values[0];
} 
