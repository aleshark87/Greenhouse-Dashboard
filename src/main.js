import * as ThingDescription from './js-modules/ThingDescription.js'
import {ajaxRequest} from './js-modules/AjaxRequests.js'

const thing_id = 'com.project.thesis:greenhouse01';
var source = new EventSource('http://localhost:8080/api/2/things/' + thing_id, { withCredentials: true });
source.onmessage = function (event) {
  console.log(event);
};

//await ThingDescription.init(thing_id);
//console.log(ThingDescription.getFeaturesTD());



