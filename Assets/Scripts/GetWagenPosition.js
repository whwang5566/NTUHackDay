#pragma strict

var positionOffset:Vector3;
var basePositionObject:GameObject;
var initialOffset:Vector3;
//var initialRotation:Vector3;

function Start () {
	if(basePositionObject != null) {
		initialOffset = transform.position - basePositionObject.transform.position;
		//initialRotation = basePositionObject.transform.parent.eulerAngles;
		//initialRotation = basePositionObject.transform.rotation;
	}
}

function Update () {
	//Debug.Log("center rotation:"+(basePositionObject.transform.parent.eulerAngles));
	//Debug.Log("center rotation:"+(basePositionObject.transform.parent.localEulerAngles));
	//Debug.Log("center rotation:"+basePositionObject.transform..parent.localRotation.eulerAngles);
	positionOffset = transform.position;
	//check
	if(basePositionObject != null) {
		positionOffset -= (basePositionObject.transform.position + initialOffset);
		//Debug.Log("Position Offset:"+positionOffset);
	}
}