var win = Titanium.UI.currentWindow;

var imageView = Titanium.UI.createImageView({
	height:480,
	width:320,
	top:0,
	left:0,
	backgroundColor:'#999'
});

win.add(imageView);

var popoverView;
var arrowDirection;

if (Titanium.Platform.osname == 'ipad')
{
	// photogallery displays in a popover on the ipad and we 
	// want to make it relative to our image with a left arrow
	arrowDirection = Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
	popoverView = imageView;
}

alert('Select a photo to merge with Jalen');

Titanium.Media.openPhotoGallery({

	success:function(event)
	{
		var cropRect = event.cropRect;
		var image = event.media;
		
		// set image view
		Ti.API.debug('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		{
			var ratio = 480/cropRect.height;
			imageView.width = cropRect.width * ratio;
			imageView.image = image;
		}
		else
		{
			
		}
		var jalenView = Titanium.UI.createImageView({
			height:480,
			width:320,
			top:0,
			left:0,
			backgroundColor:'transparent',
			url:'../assets/images/jalen1.png'
		});

		win.add(jalenView);
		var save = Titanium.UI.createButton({
			title:'Save'
		});
		win.rightNavButton = save;

		save.addEventListener('click', function(e)
		{
			Titanium.Media.saveToPhotoGallery(win.toImage());
			alert('Your photo has been saved to the gallery');	

		});
		
		
		var x=0;
		var y=0;		
		win.addEventListener('touchstart', function(e)
		{
		x = e.x;
		y = e.y;				
		});
		win.addEventListener('touchmove', function(e)
		{
		Ti.API.info('x ' + e.x);
		
		imageView.left += (e.x - x);
		imageView.top += (e.y - y);
		x = e.x;
		y = e.y;				
		});
		win.addEventListener('doubletap', function(e)
		{			
		Titanium.Media.saveToPhotoGallery(win.toImage());
		alert('Your photo has been saved to the gallery');	
		});
		
		Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
		
	},
	cancel:function()
	{

	},
	error:function(error)
	{
	},
	allowEditing:true,
	popoverView:popoverView,
	arrowDirection:arrowDirection,
	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
});
