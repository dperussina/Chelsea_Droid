Titanium.include('../window_constants.js');
Titanium.include('../lib/admob.js');
Titanium.include('../lib/navigation.js');
// initialize to all modes
// initialize to all modes
win.orientationModes = [
Titanium.UI.PORTRAIT
];

// create table view
var tableViewOptions = {
		data:moredata,
		rowHeight:50,
		backgroundColor:"transparent",
		backgroundImage:"../assets/images/backgroundimage.png",
		backgroundSelectedImage:"../assets/images/backgroundimage.png",
		backgroundFocusedImage:"../assets/images/backgroundimage.png",
		separatorColor:"transparent",
		top:30,
		bottom:90
	};


var tableview = Titanium.UI.createTableView(tableViewOptions);

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.url)
	{
		
		
		var w1 = Titanium.UI.createWindow({
			url:e.rowData.url,
			title:e.rowData.title,
			backgroundColor:backgroundColor,
			barColor:barColor,
//			titleImage:titleImage,
			type:e.rowData.type
			
		});
/*		if(e.rowData.type == '1')
		{
			w1.fullscreen=true;
			w1.hideNavBar();
			w1.hideTabBar();
		}
		else
		{
			w1.fullscreen=false;
			w1.showNavBar();
			w1.showTabBar();
		}*/
		w1.dataSource = e.rowData.dataSource;
		Titanium.UI.currentTab.open(w1,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);
