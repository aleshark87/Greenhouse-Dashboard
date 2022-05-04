import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@5.0.3/dist/index-browser-esm.min.js';
import {ajaxRequest} from './AjaxRequests.js'
import {parseTemplate} from 'https://cdn.skypack.dev/url-template'
import {standardHeader, standardHeaderTD, thing_id, uri_http_ditto} from './ConnectionParams.js';

let uri_things = uri_http_ditto + 'things/';
let thingTD;
let featuresTD = [];

async function retrieveThingTD(){
    let uri_thing = uri_things + thing_id;
    thingTD = await ajaxRequest(uri_thing, 'GET', standardHeaderTD);
}

async function retrieveFeaturesTD(){
    const linkArray = JSONPath({ path: '$.links' , json: thingTD })[0];
    //0 is a "type" link
    for (var i = 1; i < linkArray.length; i++) {
        let json = linkArray[i];
        const featureHref = JSONPath({ path: '$.href', json: json });
        let uri = uri_things + thing_id + featureHref;
        let featureTD = await ajaxRequest(uri, 'GET', standardHeaderTD);
        featuresTD.push(featureTD);
    }
}

export async function init(){
    await retrieveThingTD();
    await retrieveFeaturesTD();
}

export async function retrieveFeaturesProperties(){
    let featureProperties = new Map();
    const featuresReadEP = getFeaturesRead();
    for(let [featureName, uri] of featuresReadEP){
        let res = await ajaxRequest(uri, 'GET', standardHeader);
        featureProperties.set(featureName, res.value);
    }
    return featureProperties;
}

export function retrieveActionsEndpoints(){
    let actionEP = [];
    const thingBaseUri = JSONPath({ path: '$.base', json:thingTD });
    const actionsBaseUri = JSONPath({ path: '$.actions..forms[0].href', json:thingTD });
    const actionSize = JSONPath({ path: '$.length', json:actionsBaseUri });
    for(let i = 0; i < actionSize; i++){
        let path = '$[' + i + ']';
        let actionUri = JSONPath({ path: path, json:actionsBaseUri }).toString();
        const uri = explodeURIActions(thingBaseUri + actionUri);
        actionEP.push(uri);
    }
    return actionEP;
}

export function retrieveSSEPropertiesEndpoints(){
    let ssePropertiesEP = new Map();
    for(const featureTD of featuresTD){
        const featureName = JSONPath({ path: '$.id', json:featureTD }).toString().split('features/')[1];
        const featureBaseUri = JSONPath({ path: '$.base', json:featureTD });
        const hrefProperties = JSONPath({ path: '$.forms[4].href', json:featureTD });
        const uri = featureBaseUri + hrefProperties;
        ssePropertiesEP.set(featureName, uri);
    }
    return ssePropertiesEP;
}

function getFeaturesRead(){
    let featuresReadEP = new Map();
    for (const featureTD of featuresTD) {
        const featureName = JSONPath({ path: '$.id', json:featureTD }).toString().split('features/')[1];
        const featureBaseUri = JSONPath({ path: '$.base', json:featureTD });
        const hrefProperties = JSONPath({ path: '$.forms[0].href', json:featureTD });
        const uri = featureBaseUri + hrefProperties;
        const explodedURI = explodeURIFeatures(uri);
        featuresReadEP.set(featureName, explodedURI);
    }
    return featuresReadEP;
}

function explodeURIFeatures(uriToExplode){
    const uriTemplate = parseTemplate(uriToExplode);
    const explodedURI = uriTemplate.expand({
        channel: 'twin',
        timeout: 60
    });
    return explodedURI;
}

function explodeURIActions(uriToExplode){
    const uriTemplate = parseTemplate(uriToExplode);
    const explodedURI = uriTemplate.expand({
        'response-required': 'false',
        timeout: 0
    });
    return explodedURI;
}

