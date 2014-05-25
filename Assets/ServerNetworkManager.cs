using UnityEngine;
using System.Collections;

public class ServerNetworkManager : MonoBehaviour {
	public OVRCameraController cameraController;

	private const string typeName = "NTUHackGame";
	private const string gameName = "NTUHack";
	private GameObject globalSyncObject;
	public GameObject syncPrefab;
	private Quaternion syncRotation;

	private void StartServer()
	{
		Network.InitializeServer(4, 25000, !Network.HavePublicAddress());
		MasterServer.RegisterHost(typeName, gameName);
	}

	void OnServerInitialized()
	{
		Debug.Log("Server Initializied");
	}

	// Use this for initialization
	void Start () {
		StartServer ();
		//Network.Instantiate(syncPrefab, new Vector3(0f, 0f, 0f), Quaternion.identity, 0);
	}
	
	// Update is called once per frame
	void Update () {
		//Debug.Log ("Camera rotation:"+cameraController.transform.GetChild(0).rotation);
		Quaternion sendRotation = cameraController.transform.GetChild(0).rotation;
		networkView.RPC("receiveServerSendCameraRotation", RPCMode.Others, sendRotation);
		//if(globalSyncObject == null) globalSyncObject = GameObject.FindGameObjectWithTag ("SyncObject");
		//if(globalSyncObject!=null)	globalSyncObject.networkView.RPC ("serverSendCameraRotation",RPCMode.OthersBuffered,sendRotation);
	}

	void OnPlayerConnected(NetworkPlayer player){
		Debug.Log ("Client Connected");
		//Network.Instantiate(syncPrefab, new Vector3(0f, 0f, 0f), Quaternion.identity, 0);
	}

	[RPC]
	void receiveServerSendCameraRotation(Quaternion cameraRotation){
		Debug.Log ("Receive Server data:"+cameraRotation);
	}


}
