#pragma strict

var audioSound:AudioSource;

var onlyPlayOnce : boolean = true;

private var playedOnce : boolean = false;

function OnTriggerEnter (other : Collider) {
	Debug.Log("is Trigger!");
	if (playedOnce && onlyPlayOnce)
		return;
	Debug.Log("Play Sound!");
	audioSound.Play ();
	playedOnce = true;
}