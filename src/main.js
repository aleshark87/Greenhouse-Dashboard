import * as ThingDescription from './js-modules/ThingDescription.js'
import {setSSEFeatures} from './js-modules/EventsSSE.js';

//"http://localhost:8080/api/2/things/com.project.thesis:greenhouse01" thingBASE
//"http://localhost:8080/api/2/things/com.project.thesis:greenhouse01/features/temperature" featureBASE
//"/properties/value" propertyHREF

await ThingDescription.init();
ThingDescription.getFeaturesObserve();

$(document).ready(function() {
  setSSEFeatures();
});









