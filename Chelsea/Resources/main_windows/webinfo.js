Titanium.include('../window_constants.js');
/*
var refresh = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.REFRESH,
});
win.rightNavButton = refresh;

refresh.addEventListener('click',
function(e)
 {
    webview.reload();
});
*/
// initialize to all modes
win.orientationModes = [
Titanium.UI.PORTRAIT,
Titanium.UI.LANDSCAPE_LEFT,
Titanium.UI.LANDSCAPE_RIGHT,
];

var webview = Ti.UI.createWebView();
webview.backgroundColor = '#000000';
webview.addEventListener('beforeload',
function()
 {
    Titanium.App.fireEvent('show_indicator');
});

//add event listener here that checks it see if you navigated off url and if so adds browser buttons
webview.addEventListener('load',
function()
 {
    Titanium.App.fireEvent('hide_indicator');
});

webview.url = win.dataSource;

win.add(webview);