Titanium.include('../window_constants.js');

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

//add event listener here that checks it see if you navigated off url and if so adds browser buttons

webview.addEventListener('load', function()
{
	Titanium.App.fireEvent('hide_indicator');
});
webview.url = imdbURL;

var bb2 = Titanium.UI.createButtonBar({
	labels:['Back', 'Reload', 'Forward'],
	backgroundColor:'#003'
});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
win.setToolbar([flexSpace,bb2,flexSpace]);
webview.addEventListener('load',function(e)
{
	Ti.API.debug("url = "+webview.url);
	Ti.API.debug("event url = "+e.url);
});
bb2.addEventListener('click',function(ce)
{
	if (ce.index == 0)
	{
		webview.goBack();
	}
	else if (ce.index == 1)
	{
		webview.reload();
	}
	else
	{
		webview.goForward();
	}
});

win.add(webview);