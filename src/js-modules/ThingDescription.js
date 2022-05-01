import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@5.0.3/dist/index-browser-esm.min.js';
import {ajaxRequest} from './AjaxRequests.js'
import {standardHeader, thing_id, uri_http_ditto} from './ConnectionParams.js';

let uri_things = uri_http_ditto + 'things/';
let thingTD;
let featuresTD = [];

async function retrieveThingTD(){
    let uri_thing = uri_things + thing_id;
    thingTD = await ajaxRequest(uri_thing, 'GET', standardHeader);
}

async function retrieveFeaturesTD(){
    const linkArray = JSONPath({ path: '$.links' , json: thingTD })[0];
    //0 is a "type" link
    for (var i = 1; i < linkArray.length; i++) {
        let json = linkArray[i];
        const featureHref = JSONPath({ path: '$.href', json: json });
        let uri = uri_things + thing_id + featureHref;
        let featureTD = await ajaxRequest(uri, 'GET', standardHeader);
        featuresTD.push(featureTD);
    }
}

export async function init(){
    await retrieveThingTD();
    await retrieveFeaturesTD();
}

export function getFeaturesObserve(){
    console.log(thingTD);
    console.log(featuresTD);
}

