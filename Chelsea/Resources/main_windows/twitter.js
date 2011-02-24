Titanium.include('../window_constants.js');
Ti.include('../lib/oauth_adapter.js');
Titanium.include('../lib/string_time.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
// initialize to all modes
win.orientationModes = [
Titanium.UI.PORTRAIT
];

refreshButton.addEventListener('click',
function(e)
 {
    getTweets();
});
var toolActInd = Titanium.UI.createActivityIndicator();
function getTweets(screen_name) {

 //   Titanium.App.fireEvent('show_indicator');
 			toolActInd.message = 'Loading Tweets...';
    		toolActInd.show();
    // create table view data object
    var data = [];

    var xhr = Ti.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + screen_name);

    xhr.onload = function()
    {

        try
        {
            var tweets = eval('(' + this.responseText + ')');
			for (var c = 0; c < tweets.length; c++)
            /*for (var c = 0; c < tweets.length; c++)*/ {

                var tweet = tweets[c].text;
                var user = tweets[c].user.screen_name;
                var avatar = tweets[c].user.profile_image_url;
                var created_at = prettyDate(strtotime(tweets[c].created_at));
                var bgcolor = (c % 2) == 0 ? tableColor1: tableColor2;
                //				var bgcolor = '#000';
                var row = Ti.UI.createTableViewRow({
                    hasChild: false,
                    height: 'auto',
                    backgroundColor: bgcolor
                });
                //				var row = Ti.UI.createTableViewRow({hasChild:false,height:'auto',opacity:'0.0'});
                // Create a vertical layout view to hold all the info labels and images for each tweet
                var post_view = Ti.UI.createView({
                    height: 'auto',
                    layout: 'absolute',
                    left: 5,
                    top: 5,
                    bottom: 5,
                    right: 5,
                });
                /*
				var link = tweet.indexOf('http://');
				if(link>=0)
				{
					var htmltweet = tweet.substr(0,link) + '<a href="http://google.com" target="_blank">' + tweet.substr(link) + '</a>';
				}
				else
					var htmltweet = tweet;
					
				var tweet_text = Ti.UI.createWebView({
					left:44,
					top:10,
					bottom:2,
					height:'auto',
					html:'<html><body text=#ffffff bgColor=' + bgcolor + '><div style="line-height:95%">'+htmltweet+'</html>',
				});
*/
                var tweet_text = Ti.UI.createLabel({
                    text: tweet,
                    left: 54,
                    top: 20,
                    bottom: 2,
                    height: 'auto',
                    width: 236,
                    textAlign: 'left',
                    color: '#ffffff',
                    font: {
                        fontSize: 14
                    }
                });



                // Add the tweet to the view
                post_view.add(tweet_text);
                var av = Ti.UI.createImageView({
                    image: avatar,
                    left: 0,
                    top: 0,
                    height: 48,
                    width: 48
                });
                // Add the avatar image to the view
                post_view.add(av);

                var user_label = Ti.UI.createLabel({
                    text: "@" + user,
                    left: 54,
                    width: 120,
                    top: 0,
                    height: 16,
                    textAlign: 'left',
                    color: '#12FBE4',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 14,
                       // fontWeight: 'bold'
                    }
                });
                // Add the username to the view
                post_view.add(user_label);

                var date_label = Ti.UI.createLabel({
                    text: created_at,
                    right: 40,
                    top: 0,
                    height: 14,
                    textAlign: 'right',
                    width: 110,
                    color: '#eeeeee',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 12
                    }
                });
                // Add the date to the view
                post_view.add(date_label);

                var button = Ti.UI.createView({
                    backgroundImage: '../assets/images/commentButton.png',
                    top: 0,
                    right: 2,
                    width: 18,
                    clickName: 'button',
                    height: 20
                });

                post_view.add(button);

                // Add the vertical layout view to the row
                row.add(post_view);
                row.className = 'item' + c;
                data[c] = row;
            }
            // Create the tableView and add it to the window.
            tableView.data = data;
        }
        catch(E) {
            alert(E);
        }
      //  Titanium.App.fireEvent('hide_indicator');
		toolActInd.hide();
        endReloading();
    };
    // Get the data
    xhr.send();
	
}
var w;
var ta1;

function sendTweet(theTweet) {
    w = Titanium.UI.createWindow({
      //  backgroundColor: '#000000'
        	//	backgroundImage:'../assets/images/background.png'
    });

    var l = Titanium.UI.createLabel({
        text: 'Enter your tweet:',
        font: {
            fontSize: 20
        },
        color: '#000000',
        top: 5,
        left: 10,
        height: 'auto'
    });
    w.add(l);


    ta1 = Titanium.UI.createTextArea({
        value: theTweet,
        height: 120,
        width: 300,
        top: 30,
        font: {
            fontSize: 20,
            fontFamily: 'Marker Felt',
            fontWeight: 'bold'
        },
        color: '#888',
        textAlign: 'left',
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 5,
        suppressReturn: true

    });
    w.add(ta1);


    var b1 = Titanium.UI.createButton({
		backgroundImage:'../assets/images/signtwitter.png',
        height: 24,
        width: 151,
        top: 160
    });
    w.add(b1);
    var b2 = Titanium.UI.createButton({
        title: 'Cancel',
        height: 24,
        width: 151,
        top: 210
    });
    w.add(b2);

    w.addEventListener('open',
    function()
    {
        ta1.focus();
    });

    b1.addEventListener('click',
    function()
    {
        sendTheTweet(ta1.value);
        w.close();
    });
    b2.addEventListener('click',
    function()
    {
        w.close();
    });
    w.open({
        fullscreen: true,

    });

}

function sendTheTweet(theTweet) {

var oAuthAdapter = new OAuthAdapter(
        'Hh2n1PyTfNbZ5BCuGDGEIGF9l5TxKNuqKkb0ACD3OQ',
        'gIC8Q5qyht1y9AMg8b9Lw',
        'HMAC-SHA1');
	 Ti.API.info('oAuthAdapter Variable = ' + OAuthAdapter);
// load the access token for the service (if previously saved)
oAuthAdapter.loadAccessToken('twitter');
 Ti.API.info('oAuthAdapter.loadaccesstoken Variable = ' + oAuthAdapter.loadAccessToken);
oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', [['status', 'hey @ziodave, I successfully tested the #oauth adapter with #twitter and @appcelerator #titanium!']], 'Twitter', 'Published.', 'Not published.');

// if the client is not authorized, ask for authorization. the previous tweet will be sent automatically after authorization
if (oAuthAdapter.isAuthorized() == false)
 {
    // this function will be called as soon as the application is authorized
    var receivePin = function() {
	//	 Ti.API.info('receivePin = ' + receivePin);
        // get the access token with the provided pin/oauth_verifier
        oAuthAdapter.getAccessToken('http://twitter.com/oauth/access_token');
		//Ti.API.info('oAuthAdapter.getAccessToken = ' + oAuthAdapter.getAccessToken);
        // save the access token
        oAuthAdapter.saveAccessToken('twitter');
	//	Ti.API.info('oAuthAdapter.getAccessToken = ' + oAuthAdapter.getAccessToken);
    };

    // show the authorization UI and call back the receive PIN function
    oAuthAdapter.showAuthorizeUI('http://twitter.com/oauth/authorize?oauth_token=' +
        oAuthAdapter.getRequestToken('http://twitter.com/oauth/request_token', [['oauth_callback', 'oob']]),
        receivePin, PinFinder.twitter);
		Ti.API.info('oAuthAdapter.getAccessToken = ' + oAuthAdapter.getAccessToken);
		Ti.API.info('oauth_callback = ' + oauth_callback);
		Ti.API.info('oob = ' + oob);
		Ti.API.info('receivePin = ' + receivePin);
		Ti.API.info('PinFinder.twitter = ' + PinFinder.twitter);
		Ti.API.info('parameterMap[p] = ' + parameterMap[p]);
		Ti.API.info('pUrl= ' + pUrl);
		Ti.API.info('message + accessor = ' + message + accessor);
		Ti.API.info('oauth_token = ' + oauth_token);

		
		
		
		
}
}


/*
var refresh = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
});
win.rightNavButton = refresh;

refresh.addEventListener('click',
function(e)
 {

    getTweets(twitter_name);

});
*/
// set up a twitter screen name.
var tableView = Titanium.UI.createTableView({
    minRowHeight: 58,
	separatorColor: "#FB4B9E",
	top:30,
	bottom:90
});
//tableView.backgroundImage = '../images/bg2.jpg';
Ti.UI.currentWindow.add(tableView);


/*
var border = Ti.UI.createView({
    backgroundColor: "#576c89",
    height: 2,
    bottom: 0
});

var tableHeader = Ti.UI.createView({
    backgroundColor: "#e2e7ed",
    width: 320,
    height: 60
});

// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
    backgroundImage: "../assets/images/whiteArrow.png",
    width: 23,
    height: 60,
    bottom: 10,
    left: 20
});

var statusLabel = Ti.UI.createLabel({
    text: "Pull to reload",
    left: 55,
    width: 200,
    bottom: 30,
    height: "auto",
    color: "#576c89",
    textAlign: "center",
    font: {
        fontSize: 13,
        fontWeight: "bold"
    },
    shadowColor: "#999",
    shadowOffset: {
        x: 0,
        y: 1
    }
});
*/
var lastUpdatedLabel = Ti.UI.createLabel({
    text: "Last Updated: " + formatDate(),
    left: 55,
    width: 200,
    bottom: 15,
    height: "auto",
    color: "#576c89",
    textAlign: "center",
    font: {
        fontSize: 12
    },
    shadowColor: "#999",
    shadowOffset: {
        x: 0,
        y: 1
    }
});
var actInd = Titanium.UI.createActivityIndicator({
   /* left: 20,
    bottom: 13,
    width: 30,
    height: 30*/
	message:'Loading',
				height:150,
				width:150
});
/*


tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

tableView.headerPullView = tableHeader;


var pulling = false;*/
var reloading = false;

function beginReloading()
 {
    // just mock out the reload
    getTweets(twitter_name);
}

function endReloading()
 {
    // simulate loading
    /*	for (var c=lastRow;c<lastRow+10;c++)
	{
		tableView.appendRow({title:"Row "+c});
	}
	lastRow += 10;
*/
    // when you're done, just reset
    //tableView.setContentInsets({
 //       top: 0
 //   },
 //   {
     //   animated: true
    //});
    reloading = false;
    lastUpdatedLabel.text = "Last Updated: " + formatDate();
//    statusLabel.text = "Pull down to refresh...";
    actInd.hide();
 //   arrow.show();
}

function openBrowser(link)
 {
		toolActInd.hide();
    var bw = Titanium.UI.createWindow({
        navBarHidden: false,
        barColor: barColor,
 //       titleImage: titleImage1
    });
    var webview = Ti.UI.createWebView();
    webview.url = link;

  /*  var bb2 = Titanium.UI.createButtonBar({
        labels: ['Back', 'Reload', 'Forward'],
        backgroundColor: barColor
    });*/
  /*  var flexSpace = Titanium.UI.createButton({
    //    systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });*/
 //   bw.setToolbar([flexSpace, bb2, flexSpace]);
    webview.addEventListener('load',
    function(e)
    {
        Ti.API.debug("url = " + webview.url);
        Ti.API.debug("event url = " + e.url);
        //Titanium.App.fireEvent('hide_indicator');
		toolActInd.hide();
    });
  /*  bb2.addEventListener('click',
    function(ce)
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
    });*/
    bw.add(webview);
    var home = Titanium.UI.createButton({
        title: 'Twitter'
    });

    bw.leftNavButton = home;
    //win.leftNavButton = home;
    //home.hide();
    home.addEventListener('click',
    function(e)
    {

        bw.close({
          //  transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    });
    bw.open({
        fullscreen: false,
        modal: true,
      //  transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
    });
   // Titanium.App.fireEvent('show_indicator');

   toolActInd.hide();

}
function chooseIt(theTweet)
 {
    var start = theTweet.indexOf("http://");
    var subTweet = theTweet.substr(start);
    var end = subTweet.indexOf(" ");
    if (end <= 0)
    end = subTweet.length;
    var link = theTweet.substr(start, end);
    var cw = Titanium.UI.createWindow({
        backgroundColor: 'black',
        		//backgroundImage:'../assets/images/bg2.jpg'
    });

    Ti.API.info('start= ' + start);
    Ti.API.info('subTweet= ' + subTweet);
    Ti.API.info('end= ' + end);
    Ti.API.info('link= ' + link);

    var l = Titanium.UI.createLabel({
        text: 'What do you want to do?',
        font: {
            fontSize: 20
        },
        color: '#ffffff',
        top: 100,
        left: 50,
        height: 'auto'
    });
    cw.add(l);

    var b1 = Titanium.UI.createButton({
        title: 'Open the link',
        height: 40,
        width: 200,
        top: 160
    });
    cw.add(b1);

    var b2 = Titanium.UI.createButton({
        title: 'Post a tweet',
        height: 40,
        width: 200,
        top: 220
    });
    cw.add(b2);

    var b3 = Titanium.UI.createButton({
        title: 'Cancel',
        height: 40,
        width: 200,
        top: 280
    });
    cw.add(b3);

    b1.addEventListener('click',
    function()
    {
        openBrowser(link);
	//	toolActInd.message = 'Fetching Content...';
   		//toolActInd.show();
		cw.close();
    });
    b2.addEventListener('click',
    function()
    {
		sendTweet('RT ' + theTweet)
        cw.close();
    });
    b3.addEventListener('click',
    function()
    {
        cw.close({
        //    transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    });
    cw.open({
        fullscreen: true,
    //    transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
    });

}
/*
tableView.addEventListener('scroll',
function(e)
 {
    var offset = e.contentOffset;
    if (offset <= -65.0 && !pulling)
    {
        var t = Ti.UI.create2DMatrix();
        t = t.rotate( - 180);
        pulling = true;
        arrow.animate({
            transform: t,
            duration: 180
        });
        statusLabel.text = "Release to refresh...";
    }
    else if (pulling && offset > -65.0 && offset < 0)
    {
        pulling = false;
        var t = Ti.UI.create2DMatrix();
        arrow.animate({
            transform: t,
            duration: 180
        });
        statusLabel.text = "Pull down to refresh...";
    }
});

tableView.addEventListener('scrollEnd',
function(e)
 {
    if (pulling && !reloading && e.contentOffset.y <= -65.0)
    {
        reloading = true;
        pulling = false;
        arrow.hide();
        actInd.show();
        statusLabel.text = "Reloading...";
        tableView.setContentInsets({
            top: 60
        },
        {
            animated: true
        });
        arrow.transform = Ti.UI.create2DMatrix();
        beginReloading();
    }
});
*/
// Get the tweets for 'twitter_name'
getTweets(twitter_name);



tableView.addEventListener('click',
function(e)
 {
    Ti.API.info('table view row clicked - source ' + e.source);
    // use rowNum property on object to get row number
    var rowNum = e.index;
    //	if(e.source == 'button')
    if (e.source.text)
    {
        var link = e.source.text.indexOf('http://');
        if (link >= 0)
        {
            chooseIt(e.source.text)
        }
        else
        {
            sendTweet('RT ' + e.source.text);
        }
    }
    else
    sendTweet('@' + twitter_name);


});
/*

 iads = Ti.UI.iOS.createAdView({
    width: 'auto',
    height: 'auto',
    bottom: -100,
    borderColor: '#000000',
    backgroundColor: '#000000'
});
*/
t1 = Titanium.UI.createAnimation({
    bottom: 0,
    duration: 750
});
/*
iads.addEventListener('load',
function() {
    iads.animate(t1);
});

Titanium.UI.currentWindow.add(iads);
*/

