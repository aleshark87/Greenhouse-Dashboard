export function setSSEFeatures(){
    var sse_event_uri = 'http://localhost:8080/api/2/things/com.project.thesis:greenhouse01/features/temperature/properties/value/';
    new EventSource(sse_event_uri, { withCredentials: true }).onmessage = 
    function (event) {
        if(event.data != ''){
            $('#temperatureStatus').text(event.data);
        }
    };
    var sse_event_uri = 'http://localhost:8080/api/2/things/com.project.thesis:greenhouse01/features/humidity/properties/value/';
    new EventSource(sse_event_uri, { withCredentials: true }).onmessage = 
    function (event) {
        if(event.data != ''){
            $('#humidityStatus').text(event.data);
        }
    };
    var sse_event_uri = 'http://localhost:8080/api/2/things/com.project.thesis:greenhouse01/features/brightness/properties/value/';
    new EventSource(sse_event_uri, { withCredentials: true }).onmessage = 
    function (event) {
        if(event.data != ''){
            $('#brightnessStatus').text(event.data);
        }
    };
}