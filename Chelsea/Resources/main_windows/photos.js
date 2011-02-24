Titanium.include('../window_constants.js');

// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];

win.hideNavBar();

var scrollView = Titanium.UI.createScrollView({
	views:[],
	maxZoomScale:2.0,
	currentPage:0,
	backgroundColor:backgroundColor,
	pagingControlColor:backgroundColor
});
var count = 0;
var xhr = Ti.Network.createHTTPClient();
xhr.open("GET",pictureURL);
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
/*			if (Titanium.Platform.name == 'android') 
			{
				// iphone moved to a single image property - android needs to do the same
				var imageView = Titanium.UI.createImageView({
					url:posts[c].URL
				});

			}
			else
			{
				var imageView = Titanium.UI.createImageView({
					image:posts[c].URL
				});

			}
			*/
			var container = Titanium.UI.createView();
			var imageView = Titanium.UI.createWebView();
			imageView.addEventListener('beforeload', function()
			{
			  Titanium.App.fireEvent('show_indicator');
			});

			//add event listener here that checks it see if you navigated off url and if so adds browser buttons

			imageView.addEventListener('load', function()
			{
				Titanium.App.fireEvent('hide_indicator');
			});

			
			imageView.html = '<html><head><meta name=\"viewport\" content=\"width=device-width; initial-scale=1;\"><style>@media screen and (max-device-width: 480px){img{max-width:100%;height:auto;}}</style></head><body bgcolor=#a60191><center><H3>' + posts[c].title +'<br><img src=\"' + posts[c].URL + '\" /></body></html>';
			scrollView.addView(imageView); 
			
		}
		scrollView.show();
		scrollView.scrollToView(i);
		
	}
	catch(E)
	{
		alert(E);
	}
	
};
xhr.send();	


//var showing = false;
// win.hideTabBar();
// win.hideNavBar();

//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{

	// get orienation from event object
	var orientation = getOrientation(e.orientation);
});
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH,
});
win.rightNavButton = refresh;

refresh.addEventListener('click', function(e)
{
	
	while(scrollView.views.length >0)
		scrollView.removeView(scrollView.views[0]);
	xhr.open("GET",featuredURL);
	xhr.send();	
		
});

win.add(scrollView);

var i=0;
var activeView = scrollView.views[0];

scrollView.addEventListener('scroll', function(e)
{
    activeView = e.view  // the object handle to the view that is about to become visible
	i = e.currentPage;
});
/*
scrollView.addEventListener('click', function(e)
{
	if(showing)
	{
		
		win.hideTabBar();
		win.hideNavBar();
		showing = false;
		
	}
	else {
		
	    win.showTabBar();
		win.showNavBar();
		showing = true;
		
	}

});
*/