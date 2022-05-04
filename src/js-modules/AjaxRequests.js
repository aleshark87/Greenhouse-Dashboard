export function ajaxRequest(uri, type, headers){
    return $.ajax({
        url: uri,
        type: type,
        headers: headers,
      });
}

export function ajaxRequestData(uri, type, headers, data){
  return $.ajax({
    url: uri,
    type: type,
    headers: headers,
    data: data
  });
}