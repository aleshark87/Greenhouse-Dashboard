import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@5.0.3/dist/index-browser-esm.min.js';
import {ajaxRequest} from './AjaxRequests.js'
import {standardHeader} from './ConnectionParams.js';

let api_uri = 'http://localhost:8080/api/2/things/';
let thing_id;
let thingTD;
let featuresTD = [];   

async function retrieveThingTD(){
    let uri = api_uri + thing_id;
    thingTD = await ajaxRequest(uri, 'GET', standardHeader);
}

async function retrieveFeaturesTD(){
    const linkArray = JSONPath({ path: '$.links' , json: thingTD })[0];
    //0 is a "type" link
    for (var i = 1; i < linkArray.length; i++) {
        let json = linkArray[i];
        const featureHref = JSONPath({ path: '$.href', json: json });
        let uri = api_uri + thing_id + featureHref;
        let featureTD = await ajaxRequest(uri, 'GET', standardHeader);
        featuresTD.push(featureTD);
    }
}

export async function init(thingId){
    thing_id = thingId;
    await retrieveThingTD();
    await retrieveFeaturesTD();
}

export function getFeaturesTD(){
    return featuresTD;
}

