import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@5.0.3/dist/index-browser-esm.min.js';
import {ajaxRequest} from './AjaxRequests.js'
import {standardHeader} from './ConnectionParams.js';

let api_uri = 'http://localhost:8080/api/2/things/';
let thing_id = 'com.project.thesis:greenhouse01';
let thingTD;
let features;   
export let featuresEP;
export let thingEP;

export async function retrieveThingTD(){
    let uri = api_uri + thing_id;
    thingTD = await ajaxRequest(uri, 'GET', standardHeader);
}

export function resolveFeatures(){
    const linkArray = JSONPath({ path: '$.links', thingTD })[0];
    //0 is a "type" link
    for (var i = 1; i < linkArray.length; i++) {
        let json = linkArray[i];
        const href = JSONPath({ path: '$.href', json });
        console.log(href);
    }
}
