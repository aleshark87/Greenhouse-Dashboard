export function ajaxRequest(uri, type, headers){
    return $.ajax({
        url: uri,
        type: type,
        headers: headers,
      });
}