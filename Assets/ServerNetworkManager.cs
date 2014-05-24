using UnityEngine;
using System.Collections;

public class ServerNetworkManager : MonoBehaviour {

	private const string typeName = "NTUHackGame";
	private const string gameName = "NTUHack";
	
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
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
