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