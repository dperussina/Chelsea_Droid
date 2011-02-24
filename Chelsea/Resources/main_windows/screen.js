Titanium.include('../window_constants.js');

// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
];
win.backgroundImage = win.dataSource;
win.addEventListener('click', function(e){
	win.close();	
});