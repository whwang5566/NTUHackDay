using UnityEngine;
using System.Collections;

public class GlobalSync : MonoBehaviour {
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	[RPC]
	void serverSendCameraRotation(Quaternion cameraRotation){
		Debug.Log ("Receive Server data:"+cameraRotation);
	}

}
