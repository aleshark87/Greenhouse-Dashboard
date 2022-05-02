export function setSSEFeatures(sseFeaturesEP){
    for(let [featureName, endpoint] of sseFeaturesEP){
        new EventSource(endpoint, {withCredentials: true }).onmessage =
        function (event) {
            if(event.data != ''){
                const element_id = '#' + featureName + 'Status';
                let symbol = '';
                switch(featureName){
                    case 'temperature': symbol = '°C';
                    break;
                    case 'humidity': symbol = '%';
                    break;
                    case 'brightness': symbol = "lux";
                    break;
                  }
                $(element_id).text((JSON.parse(event.data).value) + ' ' + symbol);
            }
        }
    }
}