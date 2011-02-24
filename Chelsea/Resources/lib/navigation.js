/**
 * @author Daniel_Perussina
 */

//navBar for controls
var navBar = Ti.UI.createView({
	
backgroundImage:"../assets/images/TabBar.gif",
zIndex:98,
top:0,
height:30

});
//controls
             var closeButton = Ti.UI.createView({
                backgroundImage: '../assets/images/close.png',
                top: 3,
                right: 3,
                width: 26,
                clickName: 'Close Window',
                height: 25,
            });
				closeButton.addEventListener('click',function(){
					win.remove(adWebView);
					displayAd();
					navBar.remove(closeButton);
				});
             var refreshButton = Ti.UI.createView({
                backgroundImage: '../assets/images/refresh.png',
                top: 3,
                left: 3,
                width: 25,
                clickName: 'Refresh Window',
                height: 25,
            });
			/*	refreshButton.addEventListener('click',function(){
					win.remove(adWebView);
					displayAd();
					navBar.remove(closeButton);
				});*/
				

//title bar @ bottom
var titleBar = Ti.UI.createView({
	
backgroundImage:"../assets/images/TabBar.gif",
zIndex:98,
bottom:0,
height:50

});

var celebTitle =Ti.UI.createImageView({url:titleImage,height:32,width:'auto'});

//add to current window
Ti.UI.currentWindow.add(navBar);
Ti.UI.currentWindow.add(titleBar);

navBar.add(refreshButton);

titleBar.add(celebTitle);