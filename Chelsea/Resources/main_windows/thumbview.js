Titanium.include('../window_constants.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');

win.orientationModes = [
Titanium.UI.PORTRAIT
];

function convert(str)
{
  str = str.replace( "&amp;",/&/g);
  str = str.replace( "&gt;",/>/g);
  str = str.replace( "&lt;",/</g);
  str = str.replace( "&#034;","\"");
  str = str.replace( "&#039;","\'");
  str = str.replace( "&#034;","\"");
  str = str.replace( "&#039;","\'");
  return str;
}
var toolActInd = Titanium.UI.createActivityIndicator();

refreshButton.addEventListener('click',
function(e)
 {
    getPhotos();
});
//win.rightNavButton = refresh;
function getPhotos() {
   // Titanium.App.fireEvent('show_indicator');
 			toolActInd.message = 'Loading Photos...';
    		toolActInd.show();
    // create table view data object
    var data = [];
    var posts = [];

    var xhr = Ti.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.open("GET", pictureURL);

    xhr.onload = function()
    {

        try
        {
 //           Titanium.API.info(this.responseText)
            posts = JSON.parse(this.responseText);
            for (var c = 0; c < 16; c++) {
				//Dans Code
				//test scroll bar
				var title = posts[c].title;
				var date =  posts[c].date;
                var thumb = posts[c].thumb;
                var link = posts[c].link;
				//Looping through pictures - creating thumbnails
				var leftVar;var topVar;if(c<4){leftVar=c*77;topVar=35}else if(c==4){leftVar=1;topVar=125}else if(c==5){leftVar=77;topVar=125}else if(c==6){leftVar=154;topVar=125}else if(c==7){leftVar=231;topVar=125}else if(c==8){leftVar=1;topVar=205}else if(c==9){leftVar=77;topVar=205}else if(c==10){leftVar=154;topVar=205}else if(c==11){leftVar=231;topVar=205}else if(c==12){leftVar=1;topVar=285}else if(c==13){leftVar=77;topVar=285}else if(c==14){leftVar=154;topVar=285}else if(c==15){leftVar=231;topVar=285};
				
var thumbView = Ti.UI.createView({
	backgroundImage:thumb,
	//borderRadius:5,borderWidth:1,borderColor:'#fff',
	height: 75,
    width: 75,
	top:topVar,
	left:leftVar,
	zIndex:95
});
win.add(thumbView);



thumbView.addEventListener('click',
function()
 {
   // Ti.API.info('Source =  ' + c.source);
    var rowNum = posts[c].index;
	 Ti.API.info('rowNum = ' + rowNum);
        var URL = link;
		Ti.API.info('link =  ' + link);
     //   var title = posts[rowNum].title;
      //  var date = posts[rowNum].date;
        openPhoto(URL,title, date);
				Ti.API.info('URL + title + posts =  ' + URL + title + date);
});


/*var l1 = Ti.UI.createLabel({
	text:unescape(title),
                    left: leftVar,
                    width: 75,
                    top: 0,
                    height: 40,
                    textAlign: 'center',
                    color: '#ffffff',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
});
view1.add(l1);*/
				
				
				
				
				/*
				
				//Randys Code
                var bgcolor = (c % 2) == 0 ? tableColor1: tableColor2;
                var row = Ti.UI.createTableViewRow({
                    hasChild: false,
                    height: 'auto',
                    backgroundColor: bgcolor
                });
                var title = posts[c].title;
				var date =  posts[c].date;
                var thumb = posts[c].thumb;
                var link = posts[c].link;
                var post_view = Ti.UI.createView({
                    height: 'auto',
                    layout: 'absolute',
                    left: 1,
                    top: 0,
                    width: 159,
                    height: 160,
                });
                var av = Ti.UI.createImageView({
                    image: thumb,
                    left: 9,
                    top: 0,
                    height: 140,
                    width: 140
                });
                post_view.add(av);

                var titleLine = Ti.UI.createLabel({
                    text: unescape(title),
                    left: 10,
                    width: 140,
                    top: 140,
                    height: 40,
                    textAlign: 'center',
                    color: '#ffffff',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                });
                post_view.add(titleLine);
                row.add(post_view);
                if ((c + 1) < posts.length)
                {
                    c++;
                    var title = posts[c].title;
                    var thumb = posts[c].thumb;
                    var link = posts[c].link;
                    var post_view1 = Ti.UI.createView({
                        height: 'auto',
                        layout: 'absolute',
                        left: 160,
                        top: 0,
                        width: 160,
                        height: 160,
                    });
                    var av1 = Ti.UI.createImageView({
                        image: thumb,
                        left: 10,
                        top: 0,
                        height: 140,
                        width: 140
                    });
                    post_view1.add(av1);

                    var titleLine1 = Ti.UI.createLabel({
                        text: convert(title),
                        left: 10,
                        width: 140,
                        top: 140,
                        height: 40,
                        textAlign: 'center',
                        color: '#ffffff',
                        font: {
                            fontFamily: 'Trebuchet MS',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    });
                    post_view1.add(titleLine1);
                    row.add(post_view1);
                }
                row.className = 'thumbitem';
                data[c] = row;*/
            }
            // Create the tableView and add it to the window.
            //tableView.data = data;
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

/*refresh.addEventListener('click',
function(e)
 {

    getPhotos();

});*/

// set up a twitter screen name.
var tableView = Titanium.UI.createTableView({
    minRowHeight: 190,
    separatorColor: "#FB4B9E",
	top:30,
	bottom:90
});

//tableView.backgroundImage = '/assets/images/background.png';
Ti.UI.currentWindow.add(tableView);
/*
var border = Ti.UI.createView({
    backgroundColor: "#576c89",
    height: 2,
    bottom: 0
})

 var tableHeader = Ti.UI.createView({
    backgroundColor: "#e2e7ed",
    width: 320,
    height: 60
});

// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
    backgroundImage: "/assets/images/whiteArrow.png",
    width: 23,
    height: 60,
    bottom: 10,
    left: 20
});*/

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
/*
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
});*/
/*
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

tableView.headerPullView = tableHeader;


var pulling = false;*/
var reloading = false;

function beginReloading()
 {
    // just mock out the reload
    getPhotos();
}

function endReloading()
 {
    // simulate loading
    /*	for (var c=lastRow;c<lastRow+10;c++)
	{
		tableView.appendRow({title:"Row "+c});
	}
	lastRow += 10;

    // when you're done, just reset
    tableView.setContentInsets({
        top: 0
    },
    {
        animated: true
    });
    reloading = false;
    lastUpdatedLabel.text = "Last Updated: " + formatDate();
    statusLabel.text = "Pull down to refresh...";*/
  //  actInd.hide();
    //arrow.show();
}
/*
tableView.addEventListener('scroll',
function(e)
 {
    var offset = e.contentOffset.y;
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

*//*
function strtotime(str, now) {
    // Emlulates the PHP strtotime function in JavaScript
    // obtained from http://phpjs.org/functions/strtotime:554
    var i,
    match,
    s,
    strTmp = '',
    parse = '';
    strTmp = str;
    strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' ');
    // unecessary spaces
    strTmp = strTmp.replace(/[\t\r\n]/g, '');
    // unecessary chars
    if (strTmp == 'now') {
        return (new Date()).getTime() / 1000;
        // Return seconds, not milli-seconds
    } else if (!isNaN(parse = Date.parse(strTmp))) {
        return (parse / 1000);
    } else if (now) {
        now = new Date(now * 1000);
        // Accept PHP-style seconds
    } else {
        now = new Date();
    }
    strTmp = strTmp.toLowerCase();
    var __is =
    {
        day:
        {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        },
        mon:
        {
            'jan': 0,
            'feb': 1,
            'mar': 2,
            'apr': 3,
            'may': 4,
            'jun': 5,
            'jul': 6,
            'aug': 7,
            'sep': 8,
            'oct': 9,
            'nov': 10,
            'dec': 11
        }
    };
    var process = function(m) {
        var ago = (m[2] && m[2] == 'ago');
        var num = (num = m[0] == 'last' ? -1: 1) * (ago ? -1: 1);

        switch (m[0]) {
        case 'last':
        case 'next':
            switch (m[1].substring(0, 3)) {
            case 'yea':
                now.setFullYear(now.getFullYear() + num);
                break;
            case 'mon':
                now.setMonth(now.getMonth() + num);
                break;
            case 'wee':
                now.setDate(now.getDate() + (num * 7));
                break;
            case 'day':
                now.setDate(now.getDate() + num);
                break;
            case 'hou':
                now.setHours(now.getHours() + num);
                break;
            case 'min':
                now.setMinutes(now.getMinutes() + num);
                break;
            case 'sec':
                now.setSeconds(now.getSeconds() + num);
                break;
            default:
                var day;
                if (typeof(day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
                    var diff = day - now.getDay();
                    if (diff == 0) {
                        diff = 7 * num;
                    } else if (diff > 0) {
                        if (m[0] == 'last') {
                            diff -= 7;
                        }
                    } else {
                        if (m[0] == 'next') {
                            diff += 7;
                        }
                    }
                    now.setDate(now.getDate() + diff);
                }
            }
            break;
        default:
            if (/\d+/.test(m[0])) {
                num *= parseInt(m[0], 10);
                switch (m[1].substring(0, 3)) {
                case 'yea':
                    now.setFullYear(now.getFullYear() + num);
                    break;
                case 'mon':
                    now.setMonth(now.getMonth() + num);
                    break;
                case 'wee':
                    now.setDate(now.getDate() + (num * 7));
                    break;
                case 'day':
                    now.setDate(now.getDate() + num);
                    break;
                case 'hou':
                    now.setHours(now.getHours() + num);
                    break;
                case 'min':
                    now.setMinutes(now.getMinutes() + num);
                    break;
                case 'sec':
                    now.setSeconds(now.getSeconds() + num);
                    break;
                }
            } else {
                return false;
            }
            break;
        }
        return true;
    };
    match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match != null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        } else if (!match[3]) {
            match[2] += ':00';
        }
        s = match[1].split(/-/g);
        for (i in __is.mon) {
            if (__is.mon[i] == s[1] - 1) {
                s[1] = i;
            }
        }
        s[0] = parseInt(s[0], 10);
        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000: ''), 10);
    }

    var regex = '([+-]?\\d+\\s' +
    '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
    '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
    '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' +
    '|(last|next)\\s' +
    '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
    '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
    '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' +
    '(\\sago)?';
    match = strTmp.match(new RegExp(regex, 'gi'));
    // Brett: seems should be case insensitive per docs, so added 'i'
    if (match == null) {
        return false;
    }
    for (i = 0; i < match.length; i++) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }
    return (now.getTime() / 1000);
}*/
/*
// creates a 'pretty date' from a unix time stamp
function prettyDate(time) {
    var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date(time * 1000),
    diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);
    if (isNaN(day_diff) || day_diff < 0) {
        return '';
    }
    if (day_diff >= 31) {
        var date_year = date.getFullYear();
        var month_name = monthname[date.getMonth()];
        var date_month = date.getMonth() + 1;
        if (date_month < 10) {
            date_month = "0" + date_month;
        }
        var date_monthday = date.getDate();
        if (date_monthday < 10) {
            date_monthday = "0" + date_monthday;
        }
        return date_monthday + " " + month_name + " " + date_year;
    }
    return day_diff == 0 && (
    diff < 60 && "just now" ||
    diff < 120 && "1 minute ago" ||
    diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
    diff < 7200 && "1 hour ago" ||
    diff < 86400 && "about " + Math.floor(diff / 3600) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    day_diff < 31 && Math.ceil(day_diff / 7) + " week" + ((Math.ceil(day_diff / 7)) == 1 ? "": "s") + " ago";
}
function formatDate()
 {
    var date = new Date;
    var datestr = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    if (date.getHours() >= 12)
    {
        datestr += ' ' + (date.getHours() == 12 ? date.getHours() : date.getHours() - 12) + ':' + date.getMinutes() + ' PM';
    }
    else
    {
        datestr += ' ' + date.getHours() + ':' + date.getMinutes() + ' AM';
    }
    return datestr;
}*/

/*
function sendTweet() {

    alert("Sending Tweet");
    oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', [['status', 'hey @nicoleadams, how ya doin']], 'Twitter', 'Published.', 'Not published.');

    // if the client is not authorized, ask for authorization. the previous tweet will be sent automatically after authorization
    if (oAuthAdapter.isAuthorized() == false)
    {
        // this function will be called as soon as the application is authorized
        var receivePin = function() {
            // get the access token with the provided pin/oauth_verifier
            oAuthAdapter.getAccessToken('http://twitter.com/oauth/access_token');
            // save the access token
            oAuthAdapter.saveAccessToken('twitter');
        };

        // show the authorization UI and call back the receive PIN function
        oAuthAdapter.showAuthorizeUI('http://twitter.com/oauth/authorize?oauth_token=' +
        oAuthAdapter.getRequestToken('http://twitter.com/oauth/request_token', [['oauth_callback', 'oob']]),
        receivePin, PinFinder.twitter);
    }
}
*/


// Get the tweets for 'twitter_name'
getPhotos();


 var actInd = Titanium.UI.createActivityIndicator({
    top: 200,
    left: 140,
    width: 40,
    height: 40
});



function openPhoto(theURL, title, date) {

    var w = Titanium.UI.createWindow({
        backgroundColor: loadingBackground
    });
    w.addEventListener('singletap',
    function()
    {
        w.close({
        //    transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
    });

    w.orientationModes = [
    Titanium.UI.PORTRAIT,
    ];

	var titleView = Titanium.UI.createView({
		backgroundColor:'#000',
		left:0,
		width:320,
		height:'auto',
		bottom:-1000
		//opacity:0.7
	});
	
	var titleText = Titanium.UI.createLabel({
		height:'auto',
		bottom:0,
		left:20,
		right:20,
		color:'#fff',
		text:convert(title)+ " " + date.substr(5,2) + "/" + date.substr(8,2) + "/" + date.substr(0,4)
	});
	
	titleView.add(titleText);
    var imageView = Titanium.UI.createWebView();
    imageView.addEventListener('beforeload',
    function()
    {
     //   Titanium.App.fireEvent('show_indicator');
	  			toolActInd.message = 'Loading Photos...';
    		toolActInd.show();
    });


    //add event listener here that checks it see if you navigated off url and if so adds browser buttons
    imageView.addEventListener('load',
    function()
    {
      //  Titanium.App.fireEvent('hide_indicator');
	  toolActInd.hide();
	//	titleView.animate({bottom:0,duration:1000});
	});

    imageView.html = '<html><head><meta name=\"viewport\" content=\"width=device-width; initial-scale=1;\"><style>@media screen and (max-device-width: 480px){img{max-width:100%;height:auto;}}</style></head><body bgcolor=#000000><center><img src=\"' + theURL + '\" /></body></html>';
    w.add(imageView);
//	w.add(titleView);
    w.open({
        fullscreen: true,
       // transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    });

}
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

Titanium.UI.currentWindow.add(iads);*/

