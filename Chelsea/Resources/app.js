Titanium.include('constants.js');
Titanium.include('../lib/geolocation.js');
Titanium.include('../lib/urbanAirDroid.js');




if (!Titanium.Network.online) {
  var a = Titanium.UI.createAlertDialog({ 
    title:'Network Connection Required',
    message: 'This app requires a connection to the Internet.  Check your network connection and try again.'
  });
	a.show();
}

//  PUSH NOTIFICATION


/*
Titanium.Network.registerForPushNotifications({
	types: [
		Titanium.Network.NOTIFICATION_TYPE_BADGE,
		Titanium.Network.NOTIFICATION_TYPE_ALERT,
		Titanium.Network.NOTIFICATION_TYPE_SOUND
	],
	success:function(e)
	{
		var deviceToken = e.deviceToken;
		label.text = "Device registered. Device token: \n\n"+deviceToken;
		Ti.API.info("Push notification device token is: "+deviceToken);
		Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
		Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
		alert('successfully registed for push');
		var deviceID = Titanium.Platform.id;
		var serverstring = 'http://svs-servers.com/ca/code/updateToken.php?celebrity=' + celebrity + '&id=' + escape(deviceID) + '&token=' + escape(deviceToken);
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("GET",serverstring);
		xhr.send();
	},
	error:function(e)
	{
//		alert('failed to register for push'+e.error);
		label.text = "Error during registration: "+e.error;
	},
	callback:function(e)
	{
		// called when a push notification is received.
//		alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
		alert(e.data.alert);
	}
});	
*/
var response1;
//var constants = [];
//this is the network request object
var xhr = Ti.Network.createHTTPClient();
    //use the xhr http client object to do an HTTP GET request to the URL
xhr.open("GET", menuDataURL);

xhr.onload = function()

 {

    try

    {
		Titanium.API.info(this.responseText)
		response1 = this.responseText;
		initapp();	
    }

    catch(E)

    {

        //if anything bad happens, show the error to the user and log it
        Titanium.API.debug(E);

        Titanium.UI.createAlertDialog({
            title: 'Error',
            message: E
        }).show();

    }


};

xhr.send();

function initapp() {
	eval(response1);
	Ti.App.constants = response1;	
	var tabGroup = Titanium.UI.createTabGroup();
	var windowArray=[];
	var tabsArray=[];
	var labelArray=[];
	Titanium.UI.barColor = barColor;
	var tabCount = constants.length;
	for(i=0;i<tabCount;i++)
	{
	
		windowArray[i] = Titanium.UI.createWindow({ 
		titleImage:titleImage, 
	    title:constants[i].title,
	    backgroundColor:backgroundColor
		});
		windowArray[i].barColor = barColor; 
		windowArray[i].titleImage = titleImage;
		windowArray[i].url = constants[i].url;
		windowArray[i].type = constants[i].type;
		/*if(constants[i].type == '1')
		{
			windowArray[i].fullscreen=true;
			windowArray[i].hideNavBar();
			windowArray[i].hideTabBar();
		}
		else
		{
			windowArray[i].fullscreen=false;
			windowArray[i].showNavBar();
			windowArray[i].showTabBar();
		}*/
		windowArray[i].dataSource = constants[i].dataSource;
		tabsArray[i] = Titanium.UI.createTab({  
	    icon:constants[i].tabIcon,
	    title:constants[i].title,
	    window:windowArray[i]
		});
		labelArray[i] = Titanium.UI.createLabel({
		color:fontColor,
		text:constants[i].title,
		font:{fontSize:fontSize,fontFamily:fontFamily},
		textAlign:'center',
		width:'auto'
		});
	//	windowArray[i].add(labelArray[i]);
		tabGroup.addTab(tabsArray[i]);  
	}
	tabGroup.setActiveTab(0); 
	//tabGroup.barColor = '#12FBE4';
	//tabGroup.titleImage = titleImage;
	// open tab group with a transition animation
	tabGroup.open({
	//	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});

	//
	//  CREATE CUSTOM LOADING INDICATOR
	//
	var indWin = null;
	var actInd = null;
	var showing = false;
	function showIndicator()
	{
		if(!showing)
		{
			showing = true;
			// window container
		/*	indWin = Titanium.UI.createWindow({
				height:150,
				width:150
			});

			// black view
			var indView = Titanium.UI.createView({
				height:150,
				width:150,
				backgroundColor:loadingBackground,
				borderRadius:10,
				opacity:0.8
			});
			indWin.add(indView);

			// loading indicator*/
			actInd = Titanium.UI.createActivityIndicator({
				//style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
				message:'Loading',
				height:150,
				width:150
			});


			// message
			var message = Titanium.UI.createLabel({
				text:'Loading',
				color:'#fff',
				width:'auto',
				height:'auto',
				font:{fontSize:20,fontWeight:'bold'},
				bottom:20
			});
		//	indWin.add(message);
		//	indWin.open();
			actInd.show();
		}
	};

	function hideIndicator()
	{
		if(showing)
		{
			showing = false;
			actInd.hide();
			indWin.close({opacity:0,duration:500});
		}
	};


	//
	// Add global event handlers to hide/show custom indicator
	//
	Titanium.App.addEventListener('show_indicator', function(e)
	{
		Ti.API.info("IN SHOW INDICATOR");
		showIndicator();
	});
	Titanium.App.addEventListener('hide_indicator', function(e)
	{
		Ti.API.info("IN HIDE INDICATOR");
		hideIndicator();
	});

	var deviceToken = Ti.Network.remoteDeviceUUID;
	var deviceID = Titanium.Platform.id;
	var serverstring = 'http://svs-servers.com/ca/code/updateToken.php?celebrity=' + celebrity + '&id=' + escape(deviceID) + '&token=' + escape(deviceToken);
	var xhr = Ti.Network.createHTTPClient();
	xhr.open("GET",serverstring);
	xhr.send();
}

	/*
//convert userId to string, for push notification alias. Integer does not work
var userId = Titanium.Platform.id;
var userIdStr=userId+'';

// PUSH NOTIFICATIONS STUFF WITH URBAN AIRSHIP
//Ti.include('urbanairship.js'); 

UrbanAirship.key='y2VoIi_zSoyKWYyhyCmVpw';
UrbanAirship.secret ='ao3jU6IIQUiuRoTJtPFCAw';
UrbanAirship.master_secret='ieF6Y-xEQfKPcqdHZv_hWw';
UrbanAirship.baseurl = 'https://go.urbanairship.com';

Titanium.API.info('ALIAS TO BE SENT TO URBAN AIRSHIP:' + userId);
Ti.Network.registerForPushNotifications({
    types: [
      Ti.Network.NOTIFICATION_TYPE_BADGE,
      Ti.Network.NOTIFICATION_TYPE_ALERT,
      Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e) {
     
      var deviceToken = e.deviceToken;
      Ti.API.info('successfully registered for apple device token with '+e.deviceToken);
      //var a = Ti.UI.createAlertDialog({ title:'New Message', message:e.deviceToken + '-' + userId}); 
      //a.show();
      var params = {
        tags: ['version'+Ti.App.getVersion()],
        alias:userIdStr
      };
      UrbanAirship.register(params, function(data) {
        Ti.API.debug("registerUrban success: " + JSON.stringify(data));
		var deviceToken = e.deviceToken;
		//label.text = "Device registered. Device token: \n\n"+deviceToken;
		Ti.API.info("Push notification device token is: "+deviceToken);
		Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
		Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
		//alert('successfully registed for push');
		var deviceID = Titanium.Platform.id;
		var serverstring = 'http://svs-servers.com/ca/code/updateToken.php?celebrity=' + celebrity + '&id=' + escape(deviceID) + '&token=' + escape(deviceToken);
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("GET",serverstring);
		xhr.send();
         //var a = Ti.UI.createAlertDialog({ title:'New Message', message:'registerUrban success:' + JSON.stringify(data)}); 
         //a.show();
      }, function(errorregistration) {
        
        var a = Ti.UI.createAlertDialog({ title:'New Message', message:'Could not register for Push Notifications' }); 
        a.show();
        //Ti.API.warn("Couldn't register for Urban Airship");
      });
    },
    error:function(e) {
      var a = Ti.UI.createAlertDialog({ title:'Push Notifications Error', message:'ERROR: '+e }); 
      a.show();	
      Ti.API.warn("push notifications are disabled: "+e);
    },
    callback:function(e) {
      //CALL BACK WITH FIRE EVENT TO CATCH IN ANOTHER WINDOW
      //Ti.UI.iPhone.appBadge=null;
      //Ti.API.debug("Incoming Message: " + e.data.alert);
      var a = Ti.UI.createAlertDialog({ title:'New Message', message:'You have a new message in your inbox :)' }); 
      a.show();
      //Ti.App.fireEvent('incomingMessage', e.data);
    }
  });  
  Ti.API.info('registered urban airship');

*/
