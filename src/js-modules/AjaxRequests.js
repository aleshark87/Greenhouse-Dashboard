export function ajaxGetFeaturesTD(callback, href){
    $.ajax({
        url: 'http://localhost:8080/api/2/things/com.project.thesis:greenhouse01' + href,
        type: 'GET',
        headers: {
            'accept': 'application/td+json',
            'Authorization': 'Basic ZGl0dG86ZGl0dG8='
        },
        success: callback,
        error: function (error) {
            
        }
      });
}

export function ajaxRequest(uri, type, headers){
    return $.ajax({
        url: uri,
        type: type,
        headers: headers,
      });
}