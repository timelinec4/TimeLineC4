var customerKey = "dj0yJmk9N3dmTWhTcHhhQnNOJmQ9WVdrOWVYZE1XbEkyTXpJbWNHbzlNVEUwT0RnMU9EYzJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD05Nw--";
getRequestToken = function( url, callbackUrl)
{
	var reqUrl = url + "?oauth_nonce=89601180";
	reqUrl += "&oauth_timestamp="+Math.floor((new Date().getTime())/1000);
	reqUrl += "&oauth_consumer_key="+customerKey; 
	reqUrl += "&oauth_signature_method=HMAC-SHA1";
	reqUrl += "&oauth_version=1.0";
	reqUrl += "&oauth_callback="+callbackUrl;
	$.ajax
	  ({
	    type: "GET",
	    url: reqUrl,
	    dataType: 'json',		
	    success: function (data){
	        alert(data); 
	    },
	    error : function(jqXHR, textStatus, errorThrown) {
          alert("error");
      }
	});
}

getAccessToken = function( url )
{
	
}

getRequestToken("http://www.flickr.com/services/oauth/request_token", "http://my.yahoo.com:8080/SampleRest/index.html");