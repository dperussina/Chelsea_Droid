eval(Ti.App.constants);


//Android NavBar



/*
var console = { log: Ti.API.info };
var adUrl = "http://69.170.41.67/beta/AdMob.php";
var adWebView = null;
 
displayAd();
 
function displayAd() {
    var numLoads = 0;
    if (adWebView) {
        win.remove(adWebView);
    }
    adWebView = Ti.UI.createWebView({ url: adUrl, height: 36, bottom: 50, left: 0, right: 0 });
    win.add(adWebView);
    adWebView.addEventListener('load', function (evt) {
        numLoads++;
        if (numLoads > 1) {
            var url = evt.url.split('market://').join('http://');
            console.log("clicked ad " + url);
            //launch ad url in new browser window.
            Ti.Platform.openURL(url);
            //load a new ad.
            displayAd();
        }
    });
}
*/
//test scroll bar
/*
var leftImage = Ti.UI.createView({
	backgroundImage:'../assets/images/icon_arrow_left.png',
	height:30,
	width:30,
	top:0,
	left:5,
	zIndex:99,
	visible:false
});
win.add(leftImage);
var rightImage = Ti.UI.createView({
	backgroundImage:'../assets/images/icon_arrow_right.png',
	height:30,
	width:30,
	top:0,
	zIndex:99,
	right:5
});
win.add(rightImage);

//
// HORIZONTAL SCROLLING TABS
//
var scrollView = Titanium.UI.createScrollView({
	contentWidth:500,
	contentHeight:50,
	backgroundImage:'../assets/images/backgroundimage.png',
	top:0,
	height:50,
	width:230,
//	borderRadius:10,
	backgroundColor:'#717071',
	zIndex:99
});

scrollView.addEventListener('scroll', function(e)
{
	Ti.API.info('x ' + e.x + ' y ' + e.y);

	if (e.x > 50)
	{
		leftImage.show();
	}
	else
	{
		leftImage.hide();
	}
	if (e.x < 130)
	{
		rightImage.show();
	}
	else
	{
		rightImage.hide();
	}

});

win.add(scrollView);
//var icon1 =Ti.UI.createImageView({image:'/assets/icons/twitter.png'});
var view1 = Ti.UI.createView({
	backgroundImage:'/assets/icons/twitter.png',
	//borderRadius:5,borderWidth:1,borderColor:'#fff',
	width:30,
	height:30,
	left:10
});
scrollView.add(view1);
var l1 = Ti.UI.createLabel({
	text:'Twitter',
	font:{fontSize:10},
	color:'red',
	width:'auto',
	textAlign:'center',
	height:'auto'
});
view1.add(l1);*/
