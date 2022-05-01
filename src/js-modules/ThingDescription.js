import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@5.0.3/dist/index-browser-esm.min.js';
import * as AjaxRequests from './AjaxRequests.js'

let thing;
let features;   
export let featuresEP;
export let thingEP;


export function resolveFeatures(source){
    let json = source;
    //console.log(json);
    const linkArray = JSONPath( { path: '$.links', json })[0];
    //0 is a "type" link
    for (var i = 1; i < linkArray.length; i++) {
        let json = linkArray[i];
        const href = JSONPath({
            path: '$.href',
            json
        });
        function myCallback(result) {
            this.features.push(result);
        }
        ajaxGetFeaturesTD(myCallback, href[0]);
    }
}
