#pragma strict

var audioArray:AudioSource[];
var isPlaying = false;
var currentAudioIndex:int = 0;

function Start () {

}

function Update () {

}

function playScream(){
	if(checkAudioPlaying() == false){
	 	audioArray[currentAudioIndex].Play();
	 	currentAudioIndex = (currentAudioIndex+1)%audioArray.length;
	}
}

function checkAudioPlaying(){
	var count:int;
	var playing:boolean = false;
	for(count = 0;count<audioArray.length;count++){
		if(audioArray[count].isPlaying) playing = true;
	}
	
	return playing;
}