Titanium.include('../window_constants.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
var toolActInd = Titanium.UI.createActivityIndicator();
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

function getVideos()
{

var thumbPlayer = '<html><head><meta name="viewport" content="width=device-width; initial-scale=1;"><style>@media screen and (max-device-width: 480px){img{max-width:100%;height:auto;}}body {font: 12pt Helvetica, sans-serif;}</style><script> function playMovie(theMovie) {Ti.App.fireEvent("playMovie", { data : theMovie } ); }</script></head><body style="margin:0" text=#ffffff><br/><br/><center>';

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET",videoURL);
xhr.onload = function()
{
	try
	{
		Titanium.API.info(this.responseText)
		var posts = eval(this.responseText);
		Titanium.API.info(posts.length);		
		Titanium.API.info("number of rows: " + posts.length);
		count = posts.length;
		for (var c = 0; c < posts.length; c++) {
			var URLString = posts[c].URL;
			var yt = URLString.indexOf('youtube.com');
			if(yt>=0)
			{
			thumbPlayer += '<embed id="yt" src="' + posts[c].URL + '" type="application/x-shockwave-flash" width="100%" ></embed><br><h2>' + posts[c].title +'</h2><br>';
			}
			else
			{
/*			var activeMovie = Titanium.Media.createVideoPlayer({
				contentURL: contentURL,
				backgroundColor:'#111',
				movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
			});
*/			
//			thumbPlayer += '<a href="' + posts[c].URL + '"><img width="100%" src="' + posts[c].image + '"></a><br><h1>' + posts[c].title +'</h1><br>';
			thumbPlayer += '<img width="100%" src="' + posts[c].image + '" onclick="javascript:playMovie(&quot;' + posts[c].URL +'&quot;)"><br><h2>' + posts[c].title +'</h2><br>';
			}
		}
		
		thumbPlayer += '</center></body></html>';
		webModalView = Ti.UI.createWebView();
		webModalView.backgroundColor = backgroundColor;
		webModalView.scalesPageToFit = true;
		webModalView.html = thumbPlayer;
		Titanium.API.info(thumbPlayer);
		win.add(webModalView);		
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

getVideos();

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
win.rightNavButton = refresh;

refresh.addEventListener('click', function(e)
{
	
 getVideos();
		
});


iads = Ti.UI.iOS.createAdView({
    width: 'auto',
    height: 'auto',
    bottom: -100,
    borderColor: '#000000',
    backgroundColor: '#000000'});
 
    t1 = Titanium.UI.createAnimation({bottom:0, duration:750});
 
    iads.addEventListener('load', function(){
        iads.animate(t1);
    });
 
    Titanium.UI.currentWindow.add(iads);


