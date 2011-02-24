//this is the main app window
Titanium.include('../window_constants.js');
Titanium.include('../lib/string_time.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
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
    doYouTubeSearch(youtubesearch, '');
});

//this creates a spinning widget we can display while the user waits
var toolActInd = Titanium.UI.createActivityIndicator();

//this is the table we will load videos into
var tableview;

//and the data array for the table
var data = [];

//the window and webview for displaying youtube player (iOS only)
var webModal;

var webModalView;

//stores the current link being displayed in the web view
var currentLink;

//this is the network request object
var xhr = Ti.Network.createHTTPClient();

function playYouTube(vtitle, vguid)

 {

    if (Titanium.Platform.name == 'iPhone OS')

    {

        var ytVideoSrc = "http://www.youtube.com/v/" + vguid;
        Titanium.API.info(ytVideoSrc);
        var thumbPlayer = '<html><head><style type="text/css"> body { background-color: black;color: white;} </style></head><body style="margin:0"><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="100%" height="75%"></embed></center></body></html>';

        showHTMLContent(vtitle, 'http://www.youtube.com/watch?v=' + vguid, thumbPlayer);

    }

    else
    //on android
    {

        //this call to openURL hands off the link to the operating
        //system, and starts any player that supports youtube.com
        Titanium.Platform.openURL('http://www.youtube.com/watch?v=' + vguid);

    }

}

function showHTMLContent(wTitle, wUrl, wHTMLContent)

 {

    //store the link for later use
    currentLink = wUrl;

    //create the window to hold the web view
    webModal = Ti.UI.createWindow({});

    //set the orientation modes for basically any which way
    webModal.orientationModes = [

    Titanium.UI.PORTRAIT,

    Titanium.UI.LANDSCAPE_LEFT,

    Titanium.UI.LANDSCAPE_RIGHT

    ];

    //create the webview aka the embedded web browser (webkit/safari)
    webModalView = Ti.UI.createWebView();

    webModalView.scalesPageToFit = true;

    //add the web video to the modal window
    webModal.add(webModalView);

    //set the title of the window
    webModal.title = wTitle;

    //if you are using a tab UI in the app, this will open the window
    Titanium.UI.currentTab.open(webModal, {
        animated: true
    });

    //set the HTML to display to the markup passed into the function
    webModalView.html = wHTMLContent;

};

function doYouTubeSearch(channel, searchTerm)

 {
   Titanium.App.fireEvent('show_indicator');

    //first show a “loading” spinning indicator to the user
    toolActInd.message = 'Loading videos...';
/*
    win.setToolbar([toolActInd], {
        animated: true
    });
*/
    toolActInd.show();

    //create the YouTube API search URL from the function parameters
    //	var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?alt=rss&q=' + escape(searchTerm) + "&orderby=published&max-results=25&v=2";
    //	var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?q=audrina+patridge&max-results=25&v=2';
    //	var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?alt=rss&vq=Baseball+Hall+of+Fame&&max-results=50'
    Titanium.API.info("url: " + youtubeSearchUrl);


    //use the xhr http client object to do an HTTP GET request to the URL
    xhr.open("GET", youtubeSearchUrl);

    xhr.send();

}

xhr.onload = function()

 {

    try

    {

        //the doc object holds the response structure
        var doc;

        //check whether the data coming back is in XML format or not
        if (!this.responseXML)

        {

            //if not XML you have to convert it to XML
            doc = Titanium.XML.parseString(this.responseText).documentElement;

        }

        else

        {

            //if it is XML, then just set the doc variable
            doc = this.responseXML.documentElement;

        }

        //now we can easily get a list of items from teh results
        var items = doc.getElementsByTagName("item");

        //some simple variables for tracking the loop
        var x = 0;

        var c;

        //now just loop through the response array to see what videos we have
        for (c = 0; c < items.length; c++)

        {

            //get the current item
            var bgcolor = (c % 2) == 0 ? tableColor1: tableColor2;

            var item = items.item(c);

            //get the text for the video title tag using standard DOM XML calls
            var title = item.getElementsByTagName("title").item(0).text;

            //build up a summary string to display below the title
            var summary = "";

            if (item.getElementsByTagName("pubDate"))

            {

                summary = item.getElementsByTagName("pubDate").item(0).text;

            }

            //get the link to the youtube video
            var link = "";

            if (item.getElementsByTagName("link"))

            {

                link = item.getElementsByTagName("link").item(0).text;

            }

            //now here is where we perform a trick
            //we find the GUID code from within the link b/c we know the link format
            var guid = link.substring(link.indexOf("?v=") + 3);

            guid = guid.substring(0, guid.indexOf("&"));

            //now we can use that guid to load up a thumbnail image
            var thumbnail = "http://i.ytimg.com/vi/" + guid + "/2.jpg";

            //okay we have all the data we need for that item
            //now we need to create a row to add to the table in order to display it
            //create the row item and set the height to 80 pixels
            var row = Ti.UI.createTableViewRow({
                height: 80,
                backgroundColor: bgcolor
            });

            //set parameters for the row so we can get the youtube data out later
            row.url = link;

            row.guid = guid;

            row.videotitle = title;

            //create a label for displaying the title and add it to the row
            var labelTitle = Ti.UI.createLabel({

                text: title,

                left: 105,

                top: 10,

                height: 40,

                color: '#ffffff',

                font: {
                    fontSize: 16
                }

            });

            row.add(labelTitle);

            //create a label for the summary and add it to the row
            var labelSummary = Ti.UI.createLabel({

                text: summary,

                left: 105,

                top: 45,

                font: {
                    fontSize: 12
                },

                color: '#ffffff'


            });

            row.add(labelSummary);

            //create an image from the thumbnail, and add it to the row
            var img = Ti.UI.createImageView({

                url: thumbnail,

                left: 0,

                height: 80,

                width: 100

            });

            row.add(img);

            //add the row to the data array
            data[x++] = row;

        }

        //if tableview has been created, reset the data on the table
        //you can update data on the table multiple times
        if (tableview)

        {

            tableview.setData(data);

        }

        else

        {

            //if table has not been created, build it up with the data array
            tableview = Titanium.UI.createTableView({

                data: data,
              	separatorColor: "#FB4B9E",
				top:30,
				bottom:90

            });

            //add the table to the current window for display
            Titanium.UI.currentWindow.add(tableview);

            //add a ‘click’ listener so that when someone taps on a row
            //the video will be played using the function we defined earlier
            tableview.addEventListener('click',
            function(e)

            {

                playYouTube(e.row.videotitle, e.row.guid);

            });

        }
        Titanium.App.fireEvent('hide_indicator');
		endReloading();
    }

    catch(E)

    {

        //if anything bad happens, show the error to the user and log it
        Titanium.API.debug(E);

    //    Titanium.UI.createAlertDialog({
   //         title: 'YouTube',
   //         message: 'No videos were found for this search.'
     //   }).show();

    }

    //hide the spinning ‘loading’ widget
    toolActInd.hide();

    //win.setToolbar(null, {animated: true});

};
tableview = Titanium.UI.createTableView({

     separatorColor: "#FB4B9E",
	top:30,
	bottom:90

 });

 //add the table to the current window for display
 Titanium.UI.currentWindow.add(tableview);

 //add a ‘click’ listener so that when someone taps on a row
 //the video will be played using the function we defined earlier
 tableview.addEventListener('click',
 function(e)

 {

     playYouTube(e.row.videotitle, e.row.guid);

 });


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
tableview.headerPullView = tableHeader;
var pulling = false;
var reloading = false;

function beginReloading()
 {
	doYouTubeSearch(youtubesearch, '');
}

function endReloading()
 {
    tableview.setContentInsets({
        top: 0
    },
    {
        animated: true
    });
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
    if (pulling && !reloading && e.contentOffset <= -65.0)
    {
        reloading = true;
        pulling = false;
        arrow.hide();
        actInd.show();
        statusLabel.text = "Reloading...";
        tableview.setContentInsets({
            top: 60
        },
        {
            animated: true
        });
        arrow.transform = Ti.UI.create2DMatrix();
        beginReloading();
    }
});


doYouTubeSearch(youtubesearch, '');


