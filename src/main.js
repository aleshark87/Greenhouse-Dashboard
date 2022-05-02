import * as ThingDescription from './js-modules/ThingDescription.js'
import {setSSEFeatures} from './js-modules/EventsSSE.js';

await ThingDescription.init();
let featureProperties = await ThingDescription.retrieveFeaturesProperties();
//console.log(properties);
$(document).ready(function() {
  createStatusList();
  //setSSEFeatures();
});

function createStatusList(){
  for( let[featureName, value] of featureProperties){
    let liItem = '<li class="' + featureName + '">';
    let hItem = '<h4>' + featureName + '</h4>'
    liItem += hItem;
    let pItem = '<p id="' + featureName + 'Status">' + value + '</p>';
    liItem += pItem;
    liItem += '</li>'
    $('#status').append(liItem);
  }
}









