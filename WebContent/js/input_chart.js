(function() {
    YUI().use('charts', function (Y) 
    {     
    	 var styleDef = {
    		        axes:{
    		            values:{
    		                label:{
    		                    rotation:-45,
    		                    color:"white"
    		                }
    		            },
    		            date:{
    		                label:{
    		                    rotation:-45,
    		                    color: "white"
    		                }
    		            }
    		        },
    		        series:{
    		            international:{
    		                marker:{
    		                    fill:{
    		                        color:"#ff8888"
    		                    },
    		                    border:{
    		                        color:"#ff0000"
    		                    },
    		                    over:{
    		                        fill:{
    		                            color:"#ffffff"
    		                        },
    		                        border:{
    		                            color:"#fe0000"
    		                        },
    		                        width: 6,
    		                        height: 12
    		                    }
    		                },
    		                line:{
    		                    color:"#ff0000"
    		                }
    		            },
    		            photos:{
    		                line:{
    		                    color:"#999"
    		                },
    		                marker:
    		                {
    		                    fill:{
    		                        color:"#ddd"
    		                    },
    		                    border:{
    		                        color:"#999"
    		                    },
    		                    over: {
    		                        fill: {
    		                            color: "red"
    		                        },
    		                        border: {
    		                            color: "#000"
    		                        },
    		                        width: 2,
    		                        height: 12
    		                    }
    		                }
    		            },
    		            videos: {
    		                marker: {
    		                    over: {
    		                        fill: {
    		                            color: "#eee"
    		                        },
    		                        width: 2,
    		                        height: 12
    		                    }
    		                }
    		            }
    		        }
    		    };
    	 
    	 var myTooltip = {
    			    styles: { 
    			        backgroundColor: "#333",
    			        color: "#eee",
    			        borderColor: "#fff",
    			        textAlign: "center"
    			    },
    			    markerLabelFunction: function(categoryItem, valueItem, itemIndex, series, seriesIndex)
    			    {
    			        var msg = document.createElement("div"),
    			            underlinedTextBlock = document.createElement("span"),
    			            boldTextBlock = document.createElement("div");
    			        underlinedTextBlock.style.textDecoration = "underline";
    			        boldTextBlock.style.marginTop = "5px";
    			        boldTextBlock.style.fontWeight = "bold";
    			        underlinedTextBlock.appendChild(document.createTextNode(valueItem.displayName + " for " + 
    			                                        categoryItem.axis.get("labelFunction").apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")])));
    			        boldTextBlock.appendChild(document.createTextNode(valueItem.axis.get("labelFunction").apply(this, [valueItem.value, {prefix:"", decimalPlaces:0}])));   
    			        msg.appendChild(underlinedTextBlock);
    			        msg.appendChild(document.createElement("br"));
    			        msg.appendChild(boldTextBlock); 
    			        return msg; 
    			    }
    			};
    	 
        var myDataValues = [                           
            {date:"1/1/2010", miscellaneous:2000, expenses:3700, revenue:2200}, 
            {date:"2/1/2010", miscellaneous:50, expenses:9100, revenue:100}, 
            {date:"3/1/2010", miscellaneous:400, expenses:1100, revenue:1500}, 
            {date:"4/1/2010", miscellaneous:200, expenses:1900, revenue:2800}, 
            {date:"5/1/2010", miscellaneous:500, expenses:7000, revenue:2650},
            {date:"6/1/2010", miscellaneous:3000, expenses:4700, revenue:1200}, 
            {date:"7/1/2010", miscellaneous:6550, expenses:6500, revenue:1100}, 
            {date:"8/1/2010", miscellaneous:4005, expenses:2600, revenue:3500}, 
            {date:"9/1/2010", miscellaneous:1200, expenses:8900, revenue:3800}, 
            {date:"10/1/2010", miscellaneous:2000, expenses:1000, revenue:3650},
            {date:"11/1/2010", miscellaneous:2000, expenses:3700, revenue:2200}, 
            {date:"12/1/2010", miscellaneous:5000, expenses:3100, revenue:4100}
        ];
     
        getDates = function( year, month )
        {
        	var dates = "";
        	var numDays = daysInMonth(month, year);
        	for (var i=1; i<=numDays; i++)
      	  	{
            	dates += month+"/"+i+"/"+year + ":";
      	  	}
        	return dates;
        }                     
        
        function daysInMonth(month,year) 
        {
            return new Date(year, month, 0).getDate();
        }
        
        getPhotosCount = function( year, month )
        {
        	var photosCount = "";
        	var numDays = daysInMonth(month, year);
        	for (var i=1; i<=numDays; i++)
      	  	{
            	photosCount += Math.round(Math.random()*1000)+":";            	
      	  	}
        	
        	return photosCount;
        }
        
        getVideosCount = function( year, month )
        {
        	var videosCount = "";
        	var numDays = daysInMonth(month, year);
        	for (var i=1; i<=numDays; i++)
      	  	{
        		videosCount += Math.round(Math.random()*1000)+":";            	
      	  	}
        	
        	return videosCount;
        }
       
        var dates = getDates(2013, 2);
        
        getDataValues = function( year, month )
        {
        	var dates = getDates(year, month).split(":");
        	var photosCount = getPhotosCount(year, month).split(":");
        	var videosCount = getVideosCount(year, month).split(":");
        	var myDataValuesArry = [];
        	for(var i in dates) {
        		if( dates[i] && dates[i].length > 0 )
        		{
        			myDataValuesArry.push({ 
            	        date   : dates[i],
            	        photos  : photosCount[i],
            	        videos : videosCount[i] 
            	    });
        		}
        	    
        	}
        	return myDataValuesArry;
        }
        var result = getDataValues(2013,2);
        
        var mychart = new Y.Chart({
				dataProvider: getDataValues(2013,2), 
				render:"#mychart", 
				styles: styleDef, 
				categoryKey:"date",
				seriesKeys:["photos","videos"],
				tooltip:myTooltip
			});
    });
})();