export function setSSEFeatures(sseFeaturesEP){
    for(let [featureName, endpoint] of sseFeaturesEP){
        console.log(endpoint);
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
    // SSE for messages doesn't work.
    /*
    console.log('Setting messages SSE');
    new EventSource('http://localhost:8080/api/2/things/com.project.thesis:greenhouse01/outbox/messages/high-temperature/', {withCredentials: true}).onmessage =
    function (event){
        if(event.data != ''){
            console.log(event);
        }
        //console.log(event);
        //$('#eventParagraph').text(event);
    }*/
}