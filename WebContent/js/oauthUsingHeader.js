$(document).ready(function() {
	var access_token="ya29.AHES6ZSboDoSWwpZBWe25j49Ge3ZYyzOydicCfUdNjAYDPuJn2kjkg";
	var api_key = "AIzaSyCs2IbX8hce1rnrk7ecK5HDi6dY1MnmyUM";
	$("#button1").click(function(){
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&fields=*&key='+api_key+'&access_token='+access_token+
            "&token_type=Bearer&expires_in=3600",
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
                console.log(JSON.stringify(data));                               
            }
        });
		});
    });
