(function() {
	var month = 2;
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
    	 
    	 Y.on("click", function(e) {
    	        console.log(($(".yui3-chart-tooltip").val()));
    	   }, ".yui3-seriesmarker");
    	 
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
					var date = categoryItem.axis.get("labelFunction").apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]);
			        underlinedTextBlock.appendChild(document.createTextNode(valueItem.displayName + " for " + date));
			        boldTextBlock.appendChild(document.createTextNode(valueItem.axis.get("labelFunction").apply(this, [valueItem.value, {prefix:"", decimalPlaces:0}])));   
			        msg.appendChild(underlinedTextBlock);
			        msg.appendChild(document.createElement("br"));
					var hiddenAttr = document.createElement("input");
					hiddenAttr.setAttribute('type','hidden');
					hiddenAttr.setAttribute('id','hiddenDate');
					hiddenAttr.setAttribute('value',date);
					
					msg.appendChild(hiddenAttr);
			        msg.appendChild(boldTextBlock); 
			        return msg; 
    			    }
    			};
    	         
     
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
         
        
        getJSONData(getFlickrPicsURL(1,20), loadPicsCallback );
        
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
        getDataValuesUsingMap = function( map )
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
        var result = getDataValues(2013,month);
        
        var mychart = new Y.Chart({
				dataProvider: getDataValues(2013,month),
				render:"#mychart", 
				styles: styleDef, 
				categoryKey:"date",
				seriesKeys:["photos","videos"],
				tooltip:myTooltip
			});
			
			
			 Y.on("click", function(e)  {
                 appendPix(document.getElementById("hiddenDate").value);

    	   }, ".yui3-seriesmarker");

			 
	    refreshChart = function( dataValues )
	    {
	    	document.getElementById("mychart").remove();
            var parent = document.getElementById("chartParent");

            var hiddenAttr = document.createElement("div");
            hiddenAttr.setAttribute("id","mychart");

            parent.appendChild(hiddenAttr);
            mychart = new Y.Chart({
                dataProvider: dataValues,
                render:"#mychart",
                styles: styleDef,
                categoryKey:"date",
                seriesKeys:["photos","videos"],
                tooltip:myTooltip
            });

            Y.on("click", function(e)  {
            	console.log(new Date(document.getElementById("hiddenDate").value).getTime());
            	var picURL = dataArray[new Date($("#hiddenDate").val()).getTime()];
            	var picURLArry = picURL.split("#");
                appendPix(picURLArry);

            }, ".yui3-seriesmarker");

	    }
        Y.on("click", function(e)  {

            if( start > 10 )
            {
            	start -= 20;
            	end -= 20;
            	refreshChart(getJSONData(getFlickrPicsURL(start,end), loadPicsCallback ));
            }

        }, "#prev");

        Y.on("click", function(e)  {

        	start += 20;
        	end += 20;
        	refreshChart(getJSONData(getFlickrPicsURL(start,end), loadPicsCallback ));

        }, "#next");

        appendPix = function( urls ){

          $('#centerdiv').empty();
            var imgstr = "<img src id=\"mainimg\">";
            $('#centerdiv').html(imgstr);
            
            if(urls.length>0 && urls.length==1)
            	{
    		if( urls[0] && urls[0].length > 0 ) 
    			$("#mainimg").attr("src",urls[0]);  
            	}
    		else
    		{
    			var ulElement = document.createElement("ul");
    			 ulElement.setAttribute("class","slides");
    			 
    			 document.getElementById('centerdiv').appendChild(ulElement);
    			 for(var i=0; i<urls.length; i++)
    			 {
    				if(urls[i] && urls[i].length>0)
    				{
    				
    					 var inpElement = document.createElement("input");
    					 inpElement.setAttribute("type","radio");
    					 inpElement.setAttribute("name","radio-btn");
    					 inpElement.setAttribute("id","img-"+(i+1));
    					 
    					 if(i==0) inpElement.setAttribute("checked","true");
    					 ulElement.appendChild(inpElement);
    					 
    					 var liElement = document.createElement("li");
    					 liElement.setAttribute("class","slide-container");
    					 ulElement.appendChild(liElement);
    					 
    					 var div1ele = document.createElement("div");
    					 div1ele.setAttribute("class","slide");
    					 liElement.appendChild(div1ele);
    					 
    					 var img1ele = document.createElement("img");
    					 img1ele.setAttribute("src",urls[i]);
    					 div1ele.appendChild(img1ele);
    					 
    					 var div2ele = document.createElement("div");
    					 div2ele.setAttribute("class","nav");
    					 liElement.appendChild(div2ele);
    					 
    					 var lab1ele = document.createElement("label");
    					 if(i==0)
    					 {
    						lab1ele.setAttribute("for","img-"+(urls.length));
    					 }
    					 else
    					 {
    						lab1ele.setAttribute("for","img-"+(i+1));
    					 }
    					 lab1ele.setAttribute("class","prev");
    					 lab1ele.setAttribute("value","&amp;#x2039;");
    					 div2ele.appendChild(lab1ele);
    					 
    					 var lab2ele = document.createElement("label");
    					 if(i==urls.length -1 )
    					 {
    						lab2ele.setAttribute("for","img-"+i);
    					 }
    					 else
    					 {
    						lab2ele.setAttribute("for","1");

    					 }
    					 lab2ele.setAttribute("class","next");
    					 lab2ele.setAttribute("value","&#x203a;");
    					 div2ele.appendChild(lab2ele);
    					 
    					
    					
    			    
    				}
    			 }
    			 
    			 var li2Element = document.createElement("li");
    					 li2Element.setAttribute("class","nav-dots");
    					 ulElement.appendChild(li2Element);
    					 
    			 for(var j=0; j<urls.length; j++)
    			 {
    					
    					var lab3ele = document.createElement("label");
    					lab3ele.setAttribute("for","img-"+(j+1));
    					lab3ele.setAttribute("class","nav-dot");
    					lab3ele.setAttribute("id","img-dot-"+(j+1));
    					ulElement.appendChild(lab3ele);
    			 }
    		}
        }
			
    });
})();