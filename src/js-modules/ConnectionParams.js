export const thing_id = 'com.project.thesis:greenhouse01';

export const uri_http_ditto = 'http://localhost:8080/api/2/';

/*
* Header for Basic Authorization with Ditto API (ditto:ditto) and for retrieving ThingDescriptions
*/
export const standardHeaderTD = {
    'accept': 'application/td+json',
    'Authorization': 'Basic ZGl0dG86ZGl0dG8='
};

/*
* Header for Basic Authorization with Ditto API (ditto:ditto) and for retrieving JSON
*/
export const standardHeader = {
    'accept': 'application/json',
    'Authorization': 'Basic ZGl0dG86ZGl0dG8='
};