Titanium.include('../window_constants.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];

var webview = Ti.UI.createWebView();
webview.addEventListener('beforeload', function()
{
  Titanium.App.fireEvent('show_indicator');
});

var home = Titanium.UI.createButton({
	title:'Back'
});

win.leftNavButton = home;

home.addEventListener('click', function(e)
{
	webview.goBack();
});


var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
win.rightNavButton = refresh;

refresh.addEventListener('click', function(e)
{

	webview.reload();

});


//add event listener here that checks it see if you navigated off url and if so adds browser buttons

webview.addEventListener('load', function()
{
	Titanium.App.fireEvent('hide_indicator');
});

webview.url = featuredURL;
win.add(webview);

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

