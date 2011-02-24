/**
 * @author Daniel_Perussina
 */
 

var console = { log: Ti.API.info };
var adUrl = "http://swtorvids.com/chelsea/AdMob.php";
var adWebView = null;
 
displayAd();
 
function displayAd() {
    var numLoads = 0;
    if (adWebView) {
        win.remove(adWebView);
    }
    adWebView = Ti.UI.createWebView({ backgroundColor: 'black',url: adUrl, height: 40, bottom: 50, left: 0, right: 0, zIndex:98 });
    win.add(adWebView);
	adWebView.addEventListener('click',function() {
    adWebView.size = {width:320,height:400};
	navBar.add(closeButton);
});
}
