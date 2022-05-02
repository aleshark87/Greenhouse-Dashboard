import * as ThingDescription from './js-modules/ThingDescription.js'
import {setSSEFeatures} from './js-modules/EventsSSE.js';
import {createStatusList} from './js-modules/InitPage.js'

await ThingDescription.init();
let featureProperties = await ThingDescription.retrieveFeaturesProperties();
let sseFeaturesEP = ThingDescription.retrieveSSEPropertiesEndpoints();
let actionEP = ThingDescription.retrieveActionsEndpoints();
console.log(actionEP);

$(document).ready(function() {
  createStatusList(featureProperties);
  setSSEFeatures(sseFeaturesEP);
});









