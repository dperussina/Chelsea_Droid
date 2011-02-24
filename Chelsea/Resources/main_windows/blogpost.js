Titanium.include('../window_constants.js');
var toolActInd = Titanium.UI.createActivityIndicator();
var webModalView;

var thumbPlayer = '<html><head><style type="text/css"> body { background-color: ' + backgroundColor + ';color: white;} </style></head><body style="margin:0"><br/><br/>';

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET",blogentryURL);
xhr.onload = function()
{
	try
	{
//		Titanium.API.info(this.responseText)
		var posts = eval(this.responseText);
//		Titanium.API.info(posts.length);		
		Titanium.API.info("number of rows: " + posts.length);
		count = posts.length;
		for (var c = 0; c < posts.length; c++) {
			thumbPlayer += '<center>' + posts[c].pubDate + '<br><H2><a href=\"' + posts[c].link + '\">' + posts[c].title + '</a></H2><br><img src=\"' + posts[c].picture + '\"> <br></center>' + posts[c].text +  '<br><br>'; 
		}
		
		thumbPlayer += '</body></html>';
		webModalView = Ti.UI.createWebView();
		webModalView.backgroundColor = backgroundColor;
		webModalView.scalesPageToFit = true;
		webModalView.html = thumbPlayer;
		win.add(webModalView);		
		win.addEventListener('focus' function()
		{
			webModalView.reload();
		})

	}
	catch(E)
	{
		alert(E);
	}
	
};
xhr.send();	


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

