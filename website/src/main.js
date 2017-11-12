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
            name: 'switch',
            path: resPath.lightOff,
            pt: new PIXI.Point(0.7, 0.8),
            scale: 2
        },
        {           
            type: 'addSpritesheet',
            name: 'fireAnimated',
            path: resPath.fireAnimated,
            pt: new PIXI.Point(0.9, 0.975),
            count: 15
        },
        {
            type: 'add',
            name: 'firePlace',
            path: resPath.firePlace,
            pt: new PIXI.Point(0.9, 1)
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
            pt: new PIXI.Point(0.45, 1.5),
            scale: 2
        },
        {
            type: 'add',
            name: 'speaker2',
            path: resPath.speaker,
            pt: new PIXI.Point(0.05, 1.5),
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
    let lightSwitch = renderer.getElemByID('switch');
    lightSwitch.interactive = true;
    lightSwitch.pointerdown = function () {
        renderer.editorFilter.uniforms.mode = renderer.editorFilter.uniforms.mode ^ 0x1;
    }

    let speaker1 = renderer.getElemByID('speaker1');
    let speaker2 = renderer.getElemByID('speaker2');
    renderer.app.ticker.add(function (delta) {
        if (speaker1.position.y > window.outerHeight) {
            speaker1.position.y -= 0.000004 * speaker1.position.y * speaker1.position.y;
        }
        else speaker1.position.y = window.outerHeight;
        if (speaker2.position.y > window.outerHeight) {
            speaker2.position.y -= 0.000004 * speaker2.position.y * speaker2.position.y;
        }
        else speaker2.position.y = window.outerHeight;
    });
}