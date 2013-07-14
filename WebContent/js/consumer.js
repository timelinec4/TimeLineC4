var consumer = {};

consumer.yahoo =
{ consumerKey   : "dj0yJmk9N3dmTWhTcHhhQnNOJmQ9WVdrOWVYZE1XbEkyTXpJbWNHbzlNVEUwT0RnMU9EYzJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD05Nw--"
, consumerSecret: "af18881eb9de3a9a679ecb5768acd551d9edcf41"
, serviceProvider:
  { signatureMethod     : "HMAC-SHA1"
  , requestTokenURL     : "https://api.login.yahoo.com/oauth/v2/get_request_token"
  , userAuthorizationURL: "https://api.login.yahoo.com/oauth/v2/request_auth"
  , accessTokenURL      : "https://api.login.yahoo.com/oauth/v2/get_token"
  , echoURL             : "http://my.yahoo.com:8080/SampleRest/index.html"
  }
};

consumer.initializeForm =
function initializeForm(form, etc, usage) {
    var selector = etc.elements[0];
    var selection = selector.options[selector.selectedIndex].value;
    var selected = consumer[selection];
    if (selected != null) {
        consumer.setInputs(etc, { URL           : selected.serviceProvider[usage + "URL"]
                                , consumerSecret: selected.consumerSecret
                                , tokenSecret   : selected[usage + "Secret"]
                                });
        consumer.setInputs(form, { oauth_signature_method: selected.serviceProvider.signatureMethod
                                 , oauth_consumer_key    : selected.consumerKey
                                 , oauth_token           : selected[usage]
        						 , oauth_callback           : selected.serviceProvider.echoURL
                                 });
    }
    return true;
};

consumer.setInputs =
function setInputs(form, props) {
    for (p in props) {
        if (form[p] != null && props[p] != null) {
            form[p].value = props[p];
        }
    }
}

consumer.signForm =
function signForm(form, etc) {
    form.action = etc.URL.value;
    var accessor = { consumerSecret: etc.consumerSecret.value
                   , tokenSecret   : etc.tokenSecret.value};
    var message = { action: form.action
                  , method: form.method
                  , parameters: []
                  };
    for (var e = 0; e < form.elements.length; ++e) {
        var input = form.elements[e];
        if (input.name != null && input.name != "" && input.value != null
            && (!(input.type == "checkbox" || input.type == "radio") || input.checked))
        {
            message.parameters.push([input.name, input.value]);
        }
    }
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    //alert(outline("message", message));
    var parameterMap = OAuth.getParameterMap(message.parameters);
    for (var p in parameterMap) {
        if (p.substring(0, 6) == "oauth_"
         && form[p] != null && form[p].name != null && form[p].name != "")
        {
            form[p].value = parameterMap[p];
        }
    }
    return false;
};
