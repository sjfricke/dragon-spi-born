// global WebSocket pointer
var webSocket;

// decides what do when message arrives
function wsOnMessage(event) {

  console.dir(event);
 // Message looks like => { "type" : 1, "value" : 0 }
  var message = JSON.parse(event.data);

  switch(parseInt(message.type)) {
    case 0:
        if (message.value == 0) { 
          // Run lights off animation
          log("TEST", "Run Lights off");
        } else if (message.value == 1) { 
          // Run lights on animation
          log("TEST", "Run Lights on");
        }
      break;
    default:
  	  warn("WebSocket", "No case for data: %0", message);
  }
}

function wsTurnLightsOn() {
    webSocket.send("0:0");
}

function wsTurnLightsOff() {
    webSocket.send("0:1");
}

// for testing to callback echo ws
function startLightOnAnimation() {
    webSocket.send('{"type":0,"value":0}');
}

function startLightOffAnimation() {
    webSocket.send('{"type":0,"value":1}');
}