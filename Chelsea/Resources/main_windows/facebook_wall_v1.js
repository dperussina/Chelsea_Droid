Titanium.include('../window_constants.js');
Titanium.include('../lib/string_time.js');

// initialize to all modes
win.orientationModes = [
Titanium.UI.PORTRAIT,
Titanium.UI.LANDSCAPE_LEFT,
Titanium.UI.LANDSCAPE_RIGHT,
];

var refresh = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.REFRESH,
});
//win.rightNavButton = refresh;

refresh.addEventListener('click',
function(e)
 {
    loadFacebook();
});


function loadFacebook() {
	Titanium.App.fireEvent('show_indicator');
    var data = [];
    var loader = Titanium.Network.createHTTPClient();
    loader.open("GET", facebookURL);
    loader.onload = function() {
        var receivedData = JSON.parse(this.responseText);
        var posts = receivedData.data;
        Titanium.API.info(posts.length);

        Titanium.API.info("mumber of rows: " + posts.length);
        for (var i = 0; i < posts.length; i++) {
            var bgcolor = (i % 2) == 0 ? tableColor1: tableColor2;
            var post_view = Titanium.UI.createView({
                height: 'auto',
                layout: 'absolute',
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            });
            var inside_view = Titanium.UI.createView({
                height: 'auto',
                layout: 'vertical',
                top: 20,
                right: 5,
                left: 54
            });
            var row = Ti.UI.createTableViewRow({
                hasChild: false,
                top: 0,
         		layout:'vertical',
               height: 'auto',
                backgroundColor: bgcolor
            });
            var avatar = 'http://graph.facebook.com/' + posts[i].from.id + '/picture'
            var message = posts[i].message;
            // The tweet message
            var name = posts[i].from.name;
            // The screen name of the user
            var created_at = posts[i].created_time;
			created_at = created_at.substr(0,created_at.length - 5);
            var link = posts[i].link;
            var picture = posts[i].picture;
            var icon = posts[i].icon;
//          var likes = posts[i].likes.count;
//          var comments = posts[i].comments.count;
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
                text: name,
                left: 54,
                width: 230,
                top: 0,
                //				bottom:2,
                height: 'auto',
                textAlign: 'left',
                color: tableTextColor,
                font: {
                    fontFamily: 'Trebuchet MS',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            });
            // Add the username to the view
            post_view.add(user_label);

             var button = Ti.UI.createView({
                backgroundImage: '../assets/images/commentButton.png',
                top: 0,
                right: 2,
                width: 18,
                clickName: 'button',
                height: 20
            });

            post_view.add(button);
            var message_text = Ti.UI.createLabel({
                text: message,
                left: 0,
                top: 0,
                height: 'auto',
                width: 236,
                textAlign: 'left',
                color: tableTextColor,
                font: {
                    fontSize: 14
                }
            });
            // Add the tweet to the view
            inside_view.add(message_text);
		   if(picture)
		{
           var av1 = Ti.UI.createImageView({
                image: picture,
                left:0,
                top: 10,
                height: 100,
                width: 'auto'
            });
            // Add the avatar image to the view
            inside_view.add(av1);
		}
           var date_label = Ti.UI.createLabel({
                text: created_at,
				top:5,
				right:30,
                height: 'auto',
                textAlign: 'right',
                color: tableTextColor,
                font: {
                    fontFamily: 'Trebuchet MS',
                    fontSize: 12
                }
            });
            // Add the date to the view
       			post_view.add(date_label);
          var like_text = Ti.UI.createLabel({
//                text: likes + ' likes  ' + comments + ' comments',
                left: 0,
                height: 'auto',
                width: 236,
                textAlign: 'left',
                color: tableTextColor,
                font: {
                    fontSize: 14
                }
            });
   			inside_view.add(like_text);
 			post_view.add(inside_view);
            // Add the vertical layout view to the row
            row.add(post_view);
            row.className = 'facebookitem' + i;
 //           row.description = description;
            data[i] = row;


        }

		tableview.data = data;
		Titanium.App.fireEvent('hide_indicator');
	    
    };
    loader.send();
}

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
    left: 20,
    bottom: 13,
    width: 30,
    height: 30
});

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

tableview = Titanium.UI.createTableView({
    minRowHeight: 50,
    rowHeight: 50,
    separatorColor: tableSeparatorColor
});
tableview.backgroundImage = '../images/background.png';
tableview.headerPullView = tableHeader;
Ti.UI.currentWindow.add(tableview);
tableview.addEventListener('click',
function(e)
{
    Ti.API.info('table view row clicked - source ' + e.source);
    Ti.API.info('text ' + e.source.text);
    Ti.API.info('description ' + e.source.description.text);
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
            sendTweet(e.source.text);
        }
    }
    else
    sendTweet(e.source.text);
});/*
iads = Ti.UI.iOS.createAdView({
    width: 'auto',
    height: 'auto',
    bottom: -100,
    borderColor: '#000000',
    backgroundColor: '#000000'
});*/
t1 = Titanium.UI.createAnimation({
    bottom: 0,
    duration: 750
});/*
iads.addEventListener('load',
function() {
    iads.animate(t1);
});

Titanium.UI.currentWindow.add(iads);*/


var pulling = false;
var reloading = false;

function beginReloading()
 {
    // just mock out the reload
    loadFacebook();
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
 //   tableView.setContentInsets({
 //       top: 0
 //   },
 //   {
 //       animated: true
 //   });
    reloading = false;
    lastUpdatedLabel.text = "Last Updated: " + formatDate();
    statusLabel.text = "Pull down to refresh...";
    actInd.hide();
    arrow.show();
}

tableview.addEventListener('scroll',
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

tableview.addEventListener('scrollEnd',
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



function openBrowser(link)
 {
    var bw = Titanium.UI.createWindow({
        navBarHidden: false,
        barColor: barColor
        //        titleImage: titleImage1
    });
    var webview = Ti.UI.createWebView();
    webview.url = link;

    var bb2 = Titanium.UI.createButtonBar({
        labels: ['Back', 'Reload', 'Forward'],
        backgroundColor: barColor
    });
    var flexSpace = Titanium.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    bw.setToolbar([flexSpace, bb2, flexSpace]);
    webview.addEventListener('load',
    function(e)
    {
        Ti.API.debug("url = " + webview.url);
        Ti.API.debug("event url = " + e.url);
        Titanium.App.fireEvent('hide_indicator');
    });
    bb2.addEventListener('click',
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
    });
    bw.add(webview);
    var home = Titanium.UI.createButton({
        title: 'Facebook'
    });

    bw.leftNavButton = home;
    //win.leftNavButton = home;
    //home.hide();
    home.addEventListener('click',
    function(e)
    {

        bw.close({
            transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    });
    bw.open({
        fullscreen: false,
        modal: true,
        transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
    });
    Titanium.App.fireEvent('show_indicator');

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
        backgroundColor: tableColor1
        //		backgroundImage:'../assets/images/background.png'
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
        title: 'Post to facebook',
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
        cw.close();
        openBrowser(link);
    });
    b2.addEventListener('click',
    function()
    {
        cw.close();
        sendTweet(theTweet)
    });
    b3.addEventListener('click',
    function()
    {
        cw.close({
            transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    });
    cw.open({
        fullscreen: true,
        transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
    });

}
function sendTweet(theTweet) {
    var data = {
        name: fbpostname,
        href: fbpostlink,
        caption: fbpostname,
        description: theTweet,
        media: [
        {
            type: "image",
            src: fbposticon,
            href: fbpostlink
        }
        ],
    };
    var facebookdata = {
        name: fbpostname,
        href: fbpostlink,
        caption: "",
        description: theTweet,
        media: [
        {
            type: "image",
            src: fbposticon,
            href: fbpostlink
        }
        ],
        properties:
        {
            "Homepage": {
                "text": fbpostname,
                "href": fbpostlink
            }
        }
    };

    w = Titanium.UI.createWindow({
        backgroundColor: tableColor1
    });

    var fbButton = Titanium.Facebook.createLoginButton({
        'style': 'wide',
        'apikey': '9f348c793c623fa93f01b50dc42c00da',
        'secret': '6c641d93541837a099e6575123e14092',
        bottom: 100
    });

    w.add(fbButton);

    var b1 = Ti.UI.createButton({
        title: 'Cancel',
        width: 200,
        height: 40,
        bottom: 70
    });

    w.add(b1);

    b1.addEventListener('click',
    function(e)
    {
        w.close();
    });

    w.open({
        fullscreen: true,
        transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
    });

    if (Titanium.Facebook.isLoggedIn() == false)
    {
        alert("You need to Login to Facebook");
    }
    else
    {
        Titanium.Facebook.publishStream("Set your status", data, null,
        function(r)
        {
            Titanium.API.info("received status response = " + JSON.stringify(r));
            if (r.success)
            {
                Ti.UI.createAlertDialog({
                    title: 'Facebook',
                    message: 'Your status was published'
                }).show();
                w.close();
            }
            else
            {
                w.close();
            }
        });
    }

    fbButton.addEventListener('login',
    function(e) {
        alert("logged in");

        Titanium.Facebook.publishStream("Set your status", data, null,
        function(r)
        {
            Titanium.API.info("received status response = " + JSON.stringify(r));
            if (r.success)
            {
                Ti.UI.createAlertDialog({
                    title: 'Facebook',
                    message: 'Your status was published'
                }).show();
                w.close();
            }
            else
            {
                //				Ti.UI.createAlertDialog({title:'Facebook', message:'Error ' + r.error}).show();
                w.close();

            }

        });

    });

}
loadFacebook();

