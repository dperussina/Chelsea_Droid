Titanium.include('../window_constants.js');

var webModalView;

// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];

Ti.App.addEventListener('playMovie', function(passedData) 
{
	var activeMovie = Titanium.Media.createVideoPlayer({
		contentURL: passedData.data,
		backgroundColor:'#111',
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FIT
	});

	if (parseFloat(Titanium.Platform.version) >= 3.2)
	{
		win.add(activeMovie);
	}

	var windowClosed = false;

	activeMovie.addEventListener('complete',function()
	{
/*		if (!windowClosed)
		{
			Titanium.UI.createAlertDialog({title:'Movie', message:'Completed!'}).show();
		}
		*/
		win.remove(activeMovie);
	});

	activeMovie.play();

	win.addEventListener('close', function() 
	{
		if (!windowClosed)
		{
			windowClosed = true;
			activeMovie.stop();
		}
	});
});

function doSearch(theSearch)
{
	var win1 = Titanium.UI.createWindow({
	});
	win1.titleImage = titleImage;
	
	Titanium.UI.currentTab.open(win1,{animated:true});

var thumbPlayer = '<html><head><meta name="viewport" content="width=device-width; initial-scale=1;"><style>@media screen and (max-device-width: 480px){img{max-width:100%;height:auto;}}body {	font-family: verdana, arial; font-size: 13px; line-height: 17px;}</style><script> function playMovie(theMovie) {Ti.App.fireEvent("playMovie", { data : theMovie } ); }</script></head><body bgcolor=#733e0b style="margin:10px" text=#ffffff>';

var xhr = Ti.Network.createHTTPClient();
var theURL = searchURL + theSearch;
Titanium.API.info(theURL);		

xhr.open("GET",theURL);
xhr.onload = function()
{
	try
	{
//		Titanium.API.info(this.responseText)
//		var response = eval(this.responseText);
		var response = eval('('+this.responseText+')');
//		alert(response);
		var posts = response.posts;
		Titanium.API.info(posts.length);		
		Titanium.API.info("number of rows: " + posts.length);
		count = posts.length;
		for (var c = 0; c < posts.length; c++) {
			thumbPlayer += '<center><h2>' + posts[c].title + '</h2></center>';
			thumbPlayer += posts[c].content;
		}
		
		thumbPlayer += '</body></html>';
		webModalView = Ti.UI.createWebView();
		webModalView.backgroundColor = backgroundColor;
		webModalView.scalesPageToFit = true;
		webModalView.html = thumbPlayer;
		Titanium.API.info(thumbPlayer);
		win1.add(webModalView);		
	}
	catch(E)
	{
		alert(E);
	}
	  Titanium.App.fireEvent('hide_indicator');
	
};
xhr.send();
	
Titanium.App.fireEvent('show_indicator');


}


var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
win.rightNavButton = refresh;

refresh.addEventListener('click', function(e)
{
	
	doSearch(tf1.value);
		
});

var view = Titanium.UI.createImageView({
	url:searchbackground
});

var tf1 = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:60,
	left:10,
	width:250,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED

});


var searchButton = Titanium.UI.createButton({
	left:10,
	top:120,
	height:36,
	width:120, 
	backgroundImage:searchbutton
});

searchButton.addEventListener('click', function(e)
{
	tf1.blur();
	doSearch(tf1.value);

});

win.add(view);
win.add(tf1);
win.add(searchButton);



