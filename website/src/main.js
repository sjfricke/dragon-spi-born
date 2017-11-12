$(window).ready(run());

var renderer;

function run() {
    renderer = new Renderer();
    renderer.doStuff();

    webSocket = new WebSocket('ws://' + location.host);

	webSocket.onmessage = wsOnMessage;
}
