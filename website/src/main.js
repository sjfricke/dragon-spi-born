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
            type: 'addTile',
            name: 'woodwall',
            path: resPath.woodWall,
            pt: new PIXI.Point(0, 0)
        },
        {
            type: 'add',
            name: 'fire',
            path: resPath.fire,
            pt: new PIXI.Point(0.9, 0.95),
        },
        {
            type: 'add',
            name: 'firePlace',
            path: resPath.firePlace,
            pt: new PIXI.Point(0.9, 1),
        },
        {
            type: 'add',
            name: 'couch',
            path: resPath.couch,
            pt: new PIXI.Point(0.25, 1),
            scale: 3
        },
        {
            type: 'add',
            name: 'speaker1',
            path: resPath.speaker,
            pt: new PIXI.Point(0.45, 1),
            scale: 2
        },
        {
            type: 'add',
            name: 'speaker2',
            path: resPath.speaker,
            pt: new PIXI.Point(0.05, 1),
            scale: 2
        },
        {
            type: 'addSpine',
            name: 'spineboy',
            path: 'res/json/spineboy.json',
            pt: new PIXI.Point(renderer.getW() / 2, renderer.getH())
        }
    ];

    // Load all app data async
    for (var i = 0; i < appData.length; i++) {
        renderer[appData[i].type](appData[i], loadedTex);
    }
}

function loadedTex() {
    // onload
    texLoaded++;
    if (texLoaded >= appData.length) run();
}

function run() {
    for (var i = 0; i < appData.length; i++) {
        renderer.displayLayerByID(appData[i].name);
    }
}