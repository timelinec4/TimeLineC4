$(document).ready(function(){
	
	getFlickrPicsURL = function(start,end){
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20dates.lastupdate%2Cid%2Cfarm%2Cserver%2C%20secret%20from%20flickr.photos.info("+start+"%2C"+end+")%20where%20photo_id%20in%20(select%20id%20from%20flickr.photosets.photos%20where%20photoset_id%3D'72157624375645496'%20and%20api_key%3D%22a510130d797fe64c420970494e6a9a1a%22)%20and%20api_key%3D%22a510130d797fe64c420970494e6a9a1a%22%20order%20by%20flickr.photos.info.dates.lastupdate&format=json&callback=?"
		//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.info("+start+"%2C"+end+")%20where%20photo_id%20in%20(select%20id%20from%20flickr.photosets.photos%20where%20photoset_id%3D'72157612249760312'%20and%20api_key%3D%22a510130d797fe64c420970494e6a9a1a%22)%20and%20api_key%3D%22a510130d797fe64c420970494e6a9a1a%22%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";
		return url;
	};
	getYoutubeURL = function(start,end){
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20youtube.user.videos("+start+"%2C"+end+")%20where%20id%3D%22starplus%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";
		return url;
	};
	
	$.ajaxSetup({
		async: false
	});
	
	keys = function(obj)
	{
	    var keys = [];

	    for(var key in obj)
	    {
	        if(obj.hasOwnProperty(key))
	        {
	            keys.push(key);
	        }
	    }

	    return keys;
	}
	
	loadPicsCallback = function(data)
    {		
		dataArray = new Array();
		var picCount = data.query.count;
		
		var photos = "";
		if( data.query.results && data.query.results.photo)
			photos = data.query.results.photo;
    	console.log(picCount);    	
    	for(var i in photos )
    	{
			var timestamp = photos[i].dates.lastupdate;
			var newDate = new Date(timestamp * 1000);
			var dateStr = (newDate.getMonth()+1)+"/"+newDate.getDate()+"/"+newDate.getFullYear();
			var convDate = new Date(dateStr);
			var convTimeStamp = convDate.getTime();;
			
			if(dataArray[convTimeStamp]!=null)
				{
					photoUrl = 'http://farm' + photos[i].farm + '.static.flickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '_b.jpg';
					dataArray[convTimeStamp] = dataArray[convTimeStamp]+"#"+photoUrl;
					
				}
			else    				
				{
					photoUrl = 'http://farm' + photos[i].farm + '.static.flickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '_b.jpg#';
					dataArray[convTimeStamp] = photoUrl;
				}
    	}
    	
    	dataArray.sort();
    	var result = [];    	    	
    	var sorted_keys = keys(dataArray).sort();
    	for(var i in sorted_keys)
        {
    		var tmpDate = new Date(sorted_keys[i] * 1);
    		var dateStr = (tmpDate.getMonth()+1)+"/"+tmpDate.getDate()+"/"+tmpDate.getFullYear();
    		result.push({
                    date   : dateStr,
                    photos  : (dataArray[sorted_keys[i]].split("#").length-1)                    
                });
        }
    	refreshChart(result);
    	
    }
	
	getJSONData = function(url, callback)
	{
		$.ajax
		  ({
		    type: "GET",
		    url: url,
		    dataType: 'json',		
		    success: callback,
		    error : function(jqXHR, textStatus, errorThrown) {
	          alert("error");
	      }
		});		
	};	
	
	
});