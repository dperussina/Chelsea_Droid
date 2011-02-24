Ti.include('oauth_adapter.js');
var oAuthAdapter = new OAuthAdapter(
        'U72MXwAEPIfbsQuBbA2FuOWUSYo06vkwRfRgEQOvs',
        'WLLDTuuKs3j5P20fQeIthw',
        'HMAC-SHA1');
	 // create a new OAuthAdapter instance by passing by your consumer data and signature method

	 // load the access token for the service (if previously saved)
	 oAuthAdapter.loadAccessToken('twitter');

	 // consume a service API - in this case the status update by Twitter
	 oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', ['status','Hey @ziodave, I managed to use the #oauth adapter for @titanium consuming @twitterapi'],'Twitter','Tweet published.','Tweet not published.');

	 // if the client is not authorized, ask for authorization. the previous tweet will be sent automatically after authorization
	 if (oAuthAdapter.isAuthorized() == false)
	 {
		 // this function will be called as soon as the application is authorized
	     var receivePin = function() {
			 // get the access token with the provided pin/oauth_verifier
	         oAuthAdapter.getAccessToken('https://api.twitter.com/oauth/access_token');
			 // save the access token
	         oAuthAdapter.saveAccessToken('twitter');
	     };

		 // show the authorization UI and call back the receive PIN function
	     oAuthAdapter.showAuthorizeUI('https://api.twitter.com/oauth/authorize?' + oAuthAdapter.getRequestToken('https://api.twitter.com/oauth/request_token'), receivePin);
	 }
