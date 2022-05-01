import * as ThingDescription from './js-modules/ThingDescription.js'
import {ajaxRequest} from './js-modules/AjaxRequests.js'


let source;
let uri =  'http://localhost:8080/api/2/things/com.project.thesis:greenhouse01';
let header = {
    'accept': 'application/td+json',
    'Authorization': 'Basic ZGl0dG86ZGl0dG8='
};
source = await ajaxRequest(uri, 'GET', header);
console.log(source);
//ThingDescription.resolveFeatures(source);



