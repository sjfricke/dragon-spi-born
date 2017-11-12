$(window).ready(start());

var renderer;
var texLoaded = 0;
var appData;

function start() {
    setup();

    /*
    webSocket = new WebSocket('ws://' + location.host);
	webSocket.onmessage = wsOnMessage;*/
}

function setup() {
    renderer = new Renderer();

    appData = [
        {
            type: 'add',
            name: 'fire',
            path: resPath.fire,
            pt: new PIXI.Point(0.9, 1),
        },
        {
            type: 'add',
            name: 'firePlace',
            path: resPath.firePlace,
            pt: new PIXI.Point(0.9, 1),
        },
        {
            type: 'addSpine',
            name: 'spineboy',
            path: 'res/json/spineboy.json',
            pt: new PIXI.Point(renderer.getW() / 2, renderer.getH())
        },
        {
            type: 'add',
            name: 'couch',
            path: resPath.kitchen,
            pt: new PIXI.Point(0, 0)
        },
        {
            type: 'addTile',
            name: 'woodwall',
            path: resPath.woodWall,
            pt: new PIXI.Point(0, 0)
        }
    ];

    // Load all app data async
    for (var i = 0; i < appData.length; i++) {
        renderer[appData[i].type](
            appData[i].name,
            appData[i].path,
            appData[i].pt,
            loadedTex,
            appData[i].container);
    }
}

function loadedTex() {
    // onload
    texLoaded++;
    if (texLoaded >= appData.length) run();
}

function run() {
}