Titanium.include('../window_constants.js');
win.backgroundImage = '../assets/images/background.png';

// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];


var tableTitle;

function loadMenu()
{
	
	  Titanium.App.fireEvent('show_indicator');
	  var xhr = Ti.Network.createHTTPClient();
	  xhr.timeout = 1000000;	
	  xhr.open("GET","http://svs-servers.com/ca/code/getMenu.php?celebrity="+celebrity+'&menu_name='+win.dataSource);

		xhr.onload = function()
		{
			try
			{
				Titanium.API.info(this.responseText)
				var posts = eval(this.responseText);
				Titanium.API.info(posts.length);		
				Titanium.API.info("number of rows: " + posts.length);
				count = posts.length;
				for (var c = 0; c < posts.length; c++) {
					tableTitle = posts[c].title;
				}
			}
			catch(E){
				alert(E);
			}
		Titanium.App.fireEvent('hide_indicator');	
		loadTable();	
		};
						// Get the data
		xhr.send();	
}
		

var data=[];
function loadTable()
{
	
	  Titanium.App.fireEvent('show_indicator');
	  var xhr = Ti.Network.createHTTPClient();
	  xhr.timeout = 1000000;	
	  xhr.open("GET","http://svs-servers.com/ca/code/getMenuItems.php?celebrity="+celebrity+'&menu_name='+win.dataSource);

		xhr.onload = function()
		{
			try
			{
				Titanium.API.info(this.responseText)
				var posts = eval(this.responseText);
				Titanium.API.info(posts.length);		
				Titanium.API.info("number of rows: " + posts.length);
				count = posts.length;
				for (var c = 0; c < posts.length; c++) {
					var row = Ti.UI.createTableViewRow();
					row.backgroundImage = posts[c].background;
					row.windowtitle = posts[c].title;
					row.hasChild = true;
					row.height = 60;
					row.child = posts[c].child;
					row.data = posts[c].data;
					data[c]=row;
					
					var label2 = Ti.UI.createLabel({
						text: posts[c].title,
						color: '#ffffff',
						shadowColor:'#000000',
						textAlign:'left',
						shadowOffset:{x:0,y:1},
						font:{fontWeight:'bold',fontSize:18},
						bottom:22,
						height:'auto',
						left:45,
						right:20
					});
					if (Titanium.Platform.name == 'android') {
						label2.right = 30;
					}
					row.add(label2);
				}
			}
			catch(E){
				alert(E);
			}
			var headerView = Ti.UI.createView({
				height:50
			});

			var headerLabel = Ti.UI.createLabel({
				top:10,
				left:20,
				width:'auto',
				height:'auto',
				text:tableTitle,
				color:'white',
				shadowColor:'black',
				shadowOffset:{x:0,y:1},
				font:{fontWeight:'bold',fontSize:22}
			});

			headerView.add(headerLabel);			
		var tableview = Titanium.UI.createTableView({
			data:data,
			style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
			backgroundColor:'transparent',
//			headerView:headerView,
//			footerView:footerView,
			maxRowHeight:60,
			minRowHeight:60,
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
		});

		tableview.addEventListener('click',function(e)
		{
			var win = Titanium.UI.createWindow({
				url:e.rowData.child,
				title:e.rowData.windowtitle,
				dataSource:e.rowData.data
			});
			Titanium.UI.currentTab.open(win,{animated:true});
			
			
//			Ti.API.info("clicked on table view = "+e.source);
		});

		win.add(tableview);
		Titanium.App.fireEvent('hide_indicator');
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

		
		};
					// Get the data
	xhr.send();	
	}
	
loadMenu();


