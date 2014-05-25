#pragma strict
var dataArray:GetWagenPosition[];
var gameStart:boolean;
var backgroundAudio:AudioSource;
var soundManager:SoundManager;

//var screamSoundArray:AudioClip[];

function Start () {
	gameStart = false;
	if(backgroundAudio!=null) backgroundAudio.volume = 7;
}

function Update () {
//	if(dataArray.Length != 0){
//		Debug.Log(" P1:"+dataArray[0].positionOffset.y +" P2:"+dataArray[1].positionOffset.y+" P3:"+dataArray[2].positionOffset.y+" P4:"+dataArray[3].positionOffset.y );
//	}
	if(dataArray.length>=4){
		if((dataArray[0].positionOffset.y <-0.7) && (dataArray[1].positionOffset.y <-0.7) && (dataArray[2].positionOffset.y >0.7) && (dataArray[3].positionOffset.y >0.7)){
			soundManager.playScream();
		}
	}
}

function getGameStart(){
	return gameStart;
}

function startGame(){
	gameStart = true;
	if(backgroundAudio!=null) backgroundAudio.Play();
}
