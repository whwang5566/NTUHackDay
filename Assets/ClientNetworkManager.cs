using UnityEngine;
using System.Collections;

public class ClientNetworkManager : MonoBehaviour {

	private const string typeName = "NTUHackGame";
	private const string gameName = "NTUHack";

	private HostData[] hostList;

	private bool isRefreshingHostList = false;
	private bool isConnected = false;
	//public GameObject gameManager;

	private void RefreshHostList()
	{
		MasterServer.RequestHostList(typeName);
	}
	
	void OnMasterServerEvent(MasterServerEvent msEvent)
	{
		if (msEvent == MasterServerEvent.HostListReceived)
			hostList = MasterServer.PollHostList();
	}

	private void JoinServer(HostData hostData)
	{
		Network.Connect(hostData);
	}
	
	void OnConnectedToServer()
	{
		Debug.Log("Server Joined");
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		/*
		if(isConnected == false){

			if (isRefreshingHostList && MasterServer.PollHostList().Length > 0)
			{
				isRefreshingHostList = false;
				hostList = MasterServer.PollHostList();
			}

			if (hostList != null)
			{
				for (int i = 0; i < hostList.Length; i++)
				{
					//join server
					JoinServer(hostList[i]);
				}
			}
			RefreshHostList();
		}
		*/
	}


}
