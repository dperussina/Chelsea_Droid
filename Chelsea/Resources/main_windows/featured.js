Titanium.include('../window_constants.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];


var scrollView = Titanium.UI.createScrollableView({
	views:[],
	maxZoomScale:2.0,
	currentPage:0,
	backgroundColor:backgroundColor,
	pagingControlColor:backgroundColor
});

var home = Titanium.UI.createButton({
	title:'Back'
});

win.leftNavButton = home;
//win.leftNavButton = home;
//home.hide();

home.addEventListener('click', function(e)
{
	var theWebView = scrollView.views[scrollView.currentPage];
	theWebView.goBack();
});
var actInd = Titanium.UI.createActivityIndicator({
	right:15,
	top:5,
	width:40,
	height:40
});

var count = 0;
var posts = [];
var xhr = Ti.Network.createHTTPClient();
xhr.open("GET",featuredURL);
xhr.onload = function()
{
	try
	{
		Titanium.API.info(this.responseText)
		posts = eval(this.responseText);
		Titanium.API.info(posts.length);		
		Titanium.API.info("number of rows: " + posts.length);
		count = posts.length;
		pageLabel.text = 'Feature ' + (i+1) + ' of '+ count;
		for (var c = 0; c < posts.length; c++) {
			var theView = Ti.UI.createWebView();
			theView.url = posts[c].URL;
			scrollView.addView(theView); 
			Ti.API.info(theView.url);
			theView.addEventListener('beforeload', function()
			{
			  Titanium.App.fireEvent('show_indicator');
			  actInd.show();	
			});
			
			//add event listener here that checks it see if you navigated off url and if so adds browser buttons
			
			theView.addEventListener('load', function()
			{
				Titanium.App.fireEvent('hide_indicator');
				actInd.hide();
/*				if(theView.canGoBack())
				{
					win.leftNavButton = home;
				}
				else
				{
					win.leftNavButton = null;
				} */
			});
			
		}
		scrollView.show();
		pageLabel.text = 'Feature ' + (i+1) + ' of '+ count;
		scrollView.scrollToView(i);
		
	}
	catch(E)
	{
		alert(E);
	}
	
};
xhr.send();	

var view1 = Ti.UI.createWebView();
view1.url = "http://google.com";
//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{

	// get orienation from event object
	var orientation = getOrientation(e.orientation);
});
/*
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
*/


win.add(scrollView);
win.rightNavButton = actInd;
var i=0;
var activeView = scrollView.views[0];

scrollView.addEventListener('scroll', function(e)
{
    activeView = e.view  // the object handle to the view that is about to become visible
	i = e.currentPage;
	pageLabel.text = 'Feature ' + (i+1) + ' of '+ count;
	
//	Titanium.API. ("scroll called - current index " + i + ' active view ' + activeView);
});
//scrollView.addEventListener('click', function(e)
//{
//	Ti.API.info('ScrollView received click event, source = ' + e.source);
//});
//scrollView.addEventListener('touchend', function(e)
//{
//	Ti.API.info('ScrollView received touchend event, source = ' + e.source);
//});

// add button to dynamically add a view
var add = Titanium.UI.createButton({
	title:'Add',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
add.addEventListener('click',function()
{
	var newView = Ti.UI.createView({
		backgroundColor:'purple'
	});
	var l = Ti.UI.createLabel({
		text:'View ' + (scrollView.views.length+1),
		color:'#fff',
		width:'auto',
		height:'auto'
	});
	newView.add(l);
	scrollView.addView(newView);
});

// jump button to dynamically change go directly to a page (non-animated)
var jump = Titanium.UI.createButton({
	title:'Jump',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
jump.addEventListener('click',function()
{
	i = (scrollView.currentPage + 1) % count;
	scrollView.currentPage = i;
});

// change button to dynamically change a view
var change = Titanium.UI.createButton({
	title:'Change',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
change.addEventListener('click',function()
{
	var newView = Ti.UI.createView({
		backgroundColor:'#ff9900'
	});
	var l = Ti.UI.createLabel({
		text:'View (Changed) ' + (i+1),
		color:'#fff',
		height:'auto',
		width:'auto'
	});
	newView.add(l);
	var ar = [];
	for (var x=0;x<scrollView.views.length;x++)
	{
		if (x==i)
		{
			Ti.API.info('SETTING TO NEW VIEW ' + x)
			ar[x] = newView
		}
		else
		{
			Ti.API.info('SETTING TO OLD VIEW ' + x)

			ar[x] = scrollView.views[x];
		}
	}
	scrollView.views = ar;
});

// move scroll view left
var left = Titanium.UI.createButton({
	image:'../assets/icons/icon_arrow_left.png'
});
left.addEventListener('click', function(e)
{
	if (i == 0) return;
	i--;
	pageLabel.text = 'Feature ' + (i+1) + ' of '+ count;
	scrollView.scrollToView(i);
});

// move scroll view right
var right = Titanium.UI.createButton({
	image:'../assets/icons/icon_arrow_right.png'
});
right.addEventListener('click', function(e)
{
	if (i == (count-1)) return;
	i++;
	scrollView.scrollToView(scrollView.views[i]);
	pageLabel.text = 'Feature ' + (i+1) + ' of '+ count;
});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});


var pageLabel = Ti.UI.createLabel({
	text:'Feature ' + (i+1) + ' of '+ count,
   	color:'#fff',
	width:'auto',
	height:'auto'
});

if (Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad')
{
	// set toolbar
//	win.setToolbar([flexSpace,left,change,add,jump,right,flexSpace]);
	win.setToolbar([flexSpace,left,flexSpace,pageLabel,flexSpace,right,flexSpace]);
}
else
{
	var toolbar = Titanium.UI.createView({
		bottom: 10,
		height: 50,
		backgroundColor: '#333333',
		borderRadius: 10,
		opacity: 0.3,
		left: 10,
		right: 10
	});

	var floater = Titanium.UI.createView({
		width:320,
		height: 'auto',
		opacity: 0
	});

	toolbar.add(floater);

	left.left = 10;
	left.width = 30;

	change.left = 50;
	change.width = 70;
	change.height = 35;

	add.left = 130;
	add.width = 70;
	add.height = 35;

	jump.left = 210;
	jump.width = 70;
	jump.height = 35;

	right.right = 10;
	right.width = 30;

	floater.add(left);
//	floater.add(change);
//	floater.add(add);
//	floater.add(jump);
	floater.add(right);
//	win.add(toolbar);
}

