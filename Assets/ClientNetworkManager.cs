using UnityEngine;
using System.Collections;
using System.Threading;

public class ClientNetworkManager : MonoBehaviour {

	private const string typeName = "NTUHackGame";
	private const string gameName = "NTUHack";
		
	private bool isRefreshingHostList = false;
	private HostData[] hostList;
	private float startTime;

	//bool flagServer = false;
	//bool flagClient = false;
	public bool isConnected = false;
	static private int serverPort = 5566;
	private Quaternion syncRotation;
	public GameObject cameraObject;


	void Start(){
		startTime = Time.time;
	}

//	private void StartServer()
//	{
//		Network.InitializeServer(5, serverPort, !Network.HavePublicAddress());
//		MasterServer.RegisterHost(typeName, gameName);
//
//	}
	
//	void OnServerInitialized()
//	{
//		Debug.Log ("Server Initialized");
//	}
//	
	
	void Update()
	{
		
		//check wether the server is built or not 
		if (isConnected == false) {
			
			//if (isRefreshingHostList && MasterServer.PollHostList().Length > 0)
			//{
			RefreshHostList();
			hostList = MasterServer.PollHostList();
			
			//check server config exist or not ,if exist ,connect directly
			if (Time.time - startTime > 1.5f) {
				/*
				if (hostList.Length == 0) {
					StartServer ();
					//JoinServer(null);
					flagServer = true;
				} 
				*/
				//else {
					
					for (int i = 0; i < hostList.Length; i++) {
						if (hostList [i].gameName == gameName) {
							JoinServer (hostList[i]);
							//flagClient = true;
							isConnected = true;
							break;
						}
					}
				//}
			}
		}
		//isRefreshingHostList = false;
		
	}
	
	private void RefreshHostList()
	{
		//Debug.Log ("RefreshHostList");
		if (!isRefreshingHostList)
		{

			MasterServer.RequestHostList(typeName);
			hostList = MasterServer.PollHostList();
			//Debug.Log("hostList: "+hostList);
			
		}
	}
	
	
	private void JoinServer(HostData hostData)
	{
		Network.Connect(hostData);
		Debug.Log ("I connect to the server: " + hostData.gameName);
		
	}
	
	void OnConnectedToServer()
	{
		//isConnected = true;
		Debug.Log ("connected to server success.");

	}
	

	
	void OnDisconnectedFromServer(NetworkDisconnection info) {
		
	}
	
	void OnPlayerDisconnected(NetworkPlayer player)
	{

	} 
	
	void OnPlayerConnected(NetworkPlayer player){

	}

	[RPC]
	void receiveServerSendCameraRotation(Quaternion cameraRotation){
		Debug.Log ("Receive Server data:"+cameraRotation);
		if (cameraObject != null) {
			cameraObject.transform.rotation = cameraRotation;
		}
	}


}
