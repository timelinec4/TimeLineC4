var customerKey = "dj0yJmk9N3dmTWhTcHhhQnNOJmQ9WVdrOWVYZE1XbEkyTXpJbWNHbzlNVEUwT0RnMU9EYzJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD05Nw--";
var customerSecret = "af18881eb9de3a9a679ecb5768acd551d9edcf41";
getRequestToken = function( url, callbackUrl)
{
	var url_ = getURL(url, customerKey, customerSecret, "ijkl", "mnop", callbackUrl);
	var signedValue = getSha1_signature("GET", url, customerKey, customerSecret, "ijkl", "mnop", callbackUrl);
	url_ += "&oauth_signature="+signedValue;	
	$.ajax
	  ({
	    type: "GET",
	    url: url_,
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

getRequestToken("https://api.login.yahoo.com/oauth/v2/get_request_token", "http://my.yahoo.com:8080/SampleRest/index.html");

function getSha1_signature(httpMethod_, url_, consumerkey_, consumerSecret_, oauth_token_, tokenSecret_, callback_ ) {
	var url = getEncodedURL(url_, consumerkey_, consumerSecret_, oauth_token_, tokenSecret_, callback_);	
	msg = "GET&" + url;
	alert(msg);
    var hash = CryptoJS.SHA1(msg);
    return hash;
}


function encode( unencoded) {
	return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");	
}
function decode(encoded) {	
	return decodeURIComponent(encoded.replace(/\+/g,  " "));
}

function getEncodedURL(url_, consumerkey_, consumerSecret_, oauth_token_, tokenSecret_, callback_) {
	var msg = encode(url_);
	msg +=  "?"+encode("oauth_consumer_key=" + consumerkey_) +
			"&"+encode("oauth_nonce=fh8A8Mlv1ln") +
			"&"+encode("oauth_signature_method=HMAC-SHA1") +
			"&"+encode("oauth_timestamp=" + Math.floor((new Date().getTime())/1000)) + 
			//"&oauth_token=" + oauth_token_ +
			"&"+encode("oauth_version=1.0") + 
			"&"+encode("oauth_callback="+callback_) + 
			"&"+encode("callback=?");
	return msg;	
}
function getURL(url_, consumerkey_, consumerSecret_, oauth_token_, tokenSecret_, callback_) {
	var msg = url_;
	msg +=  "?oauth_consumer_key=" + consumerkey_ +
			"&oauth_nonce=fh8A8Mlv1ln" +
			"&oauth_signature_method=HMAC-SHA1" +
			"&oauth_timestamp=" + Math.floor((new Date().getTime())/1000) + 
			//"&oauth_token=" + oauth_token_ +
			"&oauth_version=1.0" + 
			"&oauth_callback="+callback_ + 
			"&callback=?";
	return msg;	
}
function getoauth_signature(httpMethod_, url_, consumerkey_, consumerSecret_, oauth_token_, tokenSecret_) {
	
	var params = [];
	params.push(["name","value"]);
	
	params.push(["oauth_nonce","vma2IUhtIKU"]);
	params.push(["oauth_signature_method","HMAC-SHA1"]);
	params.push(["oauth_timestamp",Math.floor((new Date().getTime())/1000)]);
	if( oauth_token_.length > 0 )
		params.push(["oauth_token",oauth_token_]);	
	params.push(["oauth_version","1.0"]);

    var accessor = { consumerSecret: consumerSecret_};
    var message = { method: httpMethod_
                  , action: url_
                  , parameters: params
                  };
    OAuth.SignatureMethod.sign(message, accessor);
    return OAuth.getParameter(message.parameters, "oauth_signature");
}
