Titanium.include('../window_constants.js');
Ti.include('../lib/oauth_adapter.js');


//create the search bar
 var search = Titanium.UI.createSearchBar({
	 barColor:barColor,
     showCancel:true,
     height:43,
     top:0,
   autocorrect:false
 });

 //to allow the keyboard to appear when the search bar is clicked.
 search.addEventListener('focus',function(e){
   search.focus();
 });

 //cancel button in the search bar
 search.addEventListener('cancel',function(e){
   search.blur();
   search.value="";
 });

 //allow searching
 search.addEventListener('return',function(e){
   search.blur();
 });


function getMembers() {

    Titanium.App.fireEvent('show_indicator');

    // create table view data object
    var data = [];
	var index=[];
	var temp_index=[];

	var firstLetter;
	var oldFirstLetter;

    var xhr = Ti.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.open("GET", "http://svs-servers.com/ca/code/bbhof/themembers.json");

    xhr.onload = function()
    {

        try
        {
            var members = eval(this.responseText);

            for (var c = 0; c < members.length; c++) {

                var name = members[c].name;
                var team = members[c].team;
                var position = members[c].position;
                var year = members[c].year;
                var thumb = members[c].thumb;
                var URL = members[c].URL;
                var bgcolor = (c % 2) == 0 ? tableColor1: tableColor2;
				firstLetter = name.substr(0,1);
				if( temp_index.indexOf( firstLetter) == -1 ) {

				   temp_index.push(firstLetter);
				   index.push( {  title: firstLetter, index:c}  );

				}

				    if (c == 0) {
				      oldFirstLetter = firstLetter;
				      Ti.API.info(oldFirstLetter);
				    }
				    else {
				      if (firstLetter == oldFirstLetter) {
				        oldFirstLetter = null;
				      }
				      else {
				        oldFirstLetter = firstLetter;
				      }
				    }

                var row = Ti.UI.createTableViewRow({
                    hasChild: false,
                    height: 'auto',
                    backgroundColor: bgcolor
                });
 				row.selectedBackgroundColor = '#fff';
				row.height = 70;
				row.className = 'datarow';
				row.clickName = 'row';
/*               var post_view = Ti.UI.createView({
                    height: 'auto',
                    layout: 'absolute',
                    left: 5,
                    top: 5,
                    bottom: 5,
                    right: 5,
                });
*/
                var av = Ti.UI.createImageView({
                    image: thumb,
                    left: 0,
                    top: 10,
                    height: 48,
                    width: 48,
					clickName:'thumb'
                });
                // Add the avatar image to the view
                row.add(av);
                var user_label = Ti.UI.createLabel({
                    text: name,
                    left: 54,
                    width: 200,
                    top: 8,
                    height: 16,
                    textAlign: 'left',
                    color: '#eeeeee',
					clickName:'thumb',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                });
                row.add(user_label);

                var user_label1 = Ti.UI.createLabel({
                    text: position,
                    left: 54,
                    width: 120,
                    top: 28,
                    height: 16,
                    textAlign: 'left',
                    color: '#eeeeee',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                });
                row.add(user_label1);

                var user_label2 = Ti.UI.createLabel({
                    text: team,
                    left: 54,
                    width: 200,
                    top: 45,
                    height: 16,
                    textAlign: 'left',
                    color: '#eeeeee',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                });
                row.add(user_label2);

                var user_label3 = Ti.UI.createLabel({
                    text: 'Inducted:' + year,
                    left: 190,
                    width: 100,
                    top: 28,
                    height: 16,
                    textAlign: 'left',
                    color: '#eeeeee',
                    font: {
                        fontFamily: 'Trebuchet MS',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                });
                row.add(user_label3);

                row.hasChild = false;
				row.filter = name;
                row.URL = URL;
 //               row.add(post_view);
 //               row.className = 'memberitem';
				row.header = oldFirstLetter;
				oldFirstLetter = firstLetter;
                data[c] = row;

            }
            // Create the tableView and add it to the window.
            tableView.data = data;
			tableView.index = index;
        }
        catch(E)
        {
            alert(E);
        }
        Titanium.App.fireEvent('hide_indicator');
    };
    // Get the data
    xhr.send();
}

var tableView = Titanium.UI.createTableView({
    minRowHeight: 58,
    separatorColor: tableSeparatorColor,
	search:search,
	filterAttribute:'filter',
	searchHidden:true,
	backgroundColor:tableColor1,
	opacity:1.0
});
tableView.backgroundImage = '../images/background.png';
Ti.UI.currentWindow.add(tableView);

// add event listener to jump to url
getMembers();

tableView.addEventListener('click',
function(e)
 {
    Ti.API.info('table view row clicked - source ' + e.source);
    Ti.API.info('URL ' + e.rowData.URL);
	openBrowser(e.rowData.URL, e.rowData.filter)
 
})

function openBrowser(link, title)
 {
		
		var w1 = Titanium.UI.createWindow({
			url:'webinfo.js',
			title:title,
			backgroundColor:backgroundColor,
			barColor:barColor,
//			titleImage:titleImage,
			type:0,
			fullscreen:false,
			dataSource:link
		});
		Titanium.UI.currentTab.open(w1,{animated:true});
}





iads = Ti.UI.iOS.createAdView({
    width: 'auto',
    height: 'auto',
    bottom: -100,
    borderColor: '#000000',
    backgroundColor: '#000000'
});

t1 = Titanium.UI.createAnimation({
    bottom: 0,
    duration: 750
});

iads.addEventListener('load',
function() {
    iads.animate(t1);
});

Titanium.UI.currentWindow.add(iads);




