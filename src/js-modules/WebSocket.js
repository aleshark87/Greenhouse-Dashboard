let eventsAck = false;

export function openWebSocket() {
    console.log('Opening WebSocket connection');
    try {
      let wsUri = 'ws://ditto:ditto@localhost:8080/ws/2';
      let ws = new WebSocket(wsUri);
      ws.onopen = function() {
        ws.onmessage = onMessage;
        ws.onerror = onMessage;
        ws.onclose = onClose;
        //ws.send('START-SEND-EVENTS');
        ws.send('START-SEND-MESSAGES');
        //ws.send('START-SEND-LIVE-EVENTS');
        //ws.send('START-SEND-LIVE-COMMANDS');
      };
    } catch (error) {
      console.log(error);
    }
  };
  
  function onClose() {
    console.log('CLOSE: WebSocket was closed');
  };
  
  function onMessage(message) {
    if(message.data == 'START-SEND-MESSAGES:ACK'){
      eventsAck = true;
      console.log('WebSocket Up And Running.');
    }
    if(eventsAck == true && message.data != 'START-SEND-MESSAGES:ACK'){
      let json = JSON.parse(message.data);
      //TODO with Thing Description
      if(json.path == '/outbox/messages/high-temperature'){
        $('#eventParagraph').text(JSON.stringify(json.value));
      }
      
    }
  };