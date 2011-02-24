Titanium.include('../window_constants.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
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
var toolActInd = Titanium.UI.createActivityIndicator();
// initialize to all modes
win.orientationModes = [
Titanium.UI.PORTRAIT
];
var webview = Ti.UI.createWebView();
webview.backgroundColor = '#ffffff';
webview.addEventListener('beforeload',
function()
 {
//    Titanium.App.fireEvent('show_indicator');
toolActInd.message = 'Loading Web Content...';
    		toolActInd.show();
});

//add event listener here that checks it see if you navigated off url and if so adds browser buttons
webview.addEventListener('load',
function()
 {
    //Titanium.App.fireEvent('hide_indicator');
	toolActInd.hide();
});

webview.url = win.dataSource;
/*var bb1 = Titanium.UI.createButtonBar({
	labels:['One', 'Two', 'Three'],
	
});

var control = Ti.UI.createView({top:50, height:40, width:'auto'});

var bb2 = Titanium.UI.createButtonBar({
    labels: ['Back', 'Reload', 'Forward'],
    backgroundColor: '#003',
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	backgroundColor:'#336699',
	top:50,
	height:25,
	width:200
});
win.add(control);
control.add(bb2);*/
/*
var refresh = Titanium.UI.createButton({
    title:'back'
})
 var back = Titanium.UI.createButton({
    image: '../assets/icons/leftarrow.png',
    	title:'back'
    //	systemButton:Titanium.UI.iPhone.SystemButton.REWIND
})
 var play = Titanium.UI.createButton({
    title:'play'
})
win.add(bb2);
bb2.add(play);
bb2.add(refresh);
bb2.add(back);
*/
//win.setToolbar([back,refresh,play]);
/*webview.addEventListener('load',
function(e)
 {
    Ti.API.debug("url = " + webview.url);
    Ti.API.debug("event url = " + e.url);
});

/*win.addEventListener('close',
function(e)
 {
    win.setToolbar(null);
});

back.addEventListener('click',
function(ce)
 {
    webview.goBack();
});
play.addEventListener('click',
function(ce)
 {
    webview.goForward();
});
*/
refreshButton.addEventListener('click',
function(e)
 {
     webview.reload();
});/*
refresh.addEventListener('click',
function(ce)
 {
    webview.reload();
});*/
/*
//
// Option Menu
//
menu = Titanium.UI.Android.OptionMenu.createMenu();
 
var removeAll = null;
 
removeAll = Titanium.UI.Android.OptionMenu.createMenuItem({title:'Remove All'});
removeAll.addEventListener('click', function()
{
// your code here .............
});
 
var tb1 = null;
 
tb1 = Titanium.UI.Android.OptionMenu.createMenuItem({title : 'Toolbar 1'});
tb1.addEventListener('click', function()
{
// your code for Toolb1 click here
});
 
var tb2 = null;
 
tb2 = Titanium.UI.Android.OptionMenu.createMenuItem({title : 'Toolbar 2'});
tb2.addEventListener('click', function()
{
// your code for toolbar 2 goes here
});
 
 
// button 3
var tb3 = null;
tb3 = Titanium.UI.Android.OptionMenu.createMenuItem({title : 'Toolbar 3'});
tb3.addEventListener('click',function()
{
// your code for toolbar 3 click goes here
});

 
menu.add(tb1);
menu.add(tb2);
menu.add(tb3);
menu.add(removeAll);
Titanium.UI.Android.OptionMenu.setMenu(menu); */
win.add(webview);

