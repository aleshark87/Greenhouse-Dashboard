import * as ThingDescription from './js-modules/ThingDescription.js'
import {setSSEFeatures} from './js-modules/EventsSSE.js';
import {createStatusList, createActionList} from './js-modules/InitPage.js'
import {openWebSocket} from './js-modules/WebSocket.js'

await ThingDescription.init();
let featureProperties = await ThingDescription.retrieveFeaturesProperties();
let sseFeaturesEP = ThingDescription.retrieveSSEPropertiesEndpoints();
let actionEP = ThingDescription.retrieveActionsEndpoints();

$(document).ready(function() {
  createStatusList(featureProperties);
  createActionList(actionEP);
  setSSEFeatures(sseFeaturesEP);
  openWebSocket();
});











