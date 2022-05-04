import { ajaxRequestData } from "./AjaxRequests.js";
import { headerPostMessage } from "./ConnectionParams.js";

export function createStatusList(featureProperties){
    for( let[featureName, value] of featureProperties){
      let liItem = '<li class="list-group-item text-center">';
      let hItem = '<h5>' + featureName + '</h5>'
      liItem += hItem;
      let symbol = '';
      switch(featureName){
        case 'temperature': symbol = '°C';
        break;
        case 'humidity': symbol = '%';
        break;
        case 'brightness': symbol = "lux";
        break;
      }
      let pItem = '<p id="' + featureName + 'Status">' + value + ' ' + symbol + '</p>';
      liItem += pItem;
      liItem += '</li>'
      $('#status').append(liItem);
    }
}

/*
* I can't create action page completely blind about what they do. 
*/
export function createActionList(actionEP){
  for(let action of actionEP){
    $('#switchOn').click(function(){
      let jsonData = '"ON"'
      ajaxRequestData(actionEP[0], 'POST', headerPostMessage,
      jsonData);
      console.log('request sent');
    });
    $('#switchOff').click(function(){
      let jsonData = '"OFF"'
      ajaxRequestData(actionEP[0], 'POST', headerPostMessage,
      jsonData);
      console.log('request sent');
    });
  }
}

export function createEventList(eventEP){

}