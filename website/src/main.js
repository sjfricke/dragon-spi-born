$(window).ready(start());

var renderer;
var texLoaded = 0;
var appData;
var playerMovingForward = false;
var playerMovingBackward = false;
var lightOnTexture, lightOffTexture;

function start() {
    setup();

    /*
    webSocket = new WebSocket('ws://' + location.host);
	webSocket.onmessage = wsOnMessage;*/
}

function setup() {
    renderer = new Renderer();

    (new PIXI.loaders.Loader())
        .add('lightOn', resPath.lightOn)
        .load(function (loader, res) {
            lightOnTexture = res.lightOn.texture;
        });

    appData = [
        {
            type: 'addTile',
            name: 'woodwall',
            path: resPath.woodWall,
            pt: new PIXI.Point(0, 0),
            scale: 0.5
        },
        {
            type: 'add',
            name: 'switch',
            path: resPath.lightOff,
            pt: new PIXI.Point(0.7, 0.8)
        },
        {           
            type: 'addSpritesheet',
            name: 'fireAnimated',
            path: resPath.fireAnimated,
            pt: new PIXI.Point(0.9, 0.975),
            count: 15,
            framePrefix : "fire",
            start: true,
            scale: 0.5
        },
        {
            type: 'add',
            name: 'firePlace',
            path: resPath.firePlace,
            pt: new PIXI.Point(0.9, 1),
            scale: 0.5
        },
        {
            type: 'add',
            name: 'couch',
            path: resPath.couch,
            pt: new PIXI.Point(0.25, 1),
            scale: 1.5
        },
        {
            type: 'addSpritesheet',
            name: 'speaker1',
            path: resPath.speakerAnimated,
            pt: new PIXI.Point(0.45, 1.5),
            count: 6,
            framePrefix : "speaker1",
            scale: 0.75,
            start : false
        },
        {
            type: 'addSpritesheet',
            name: 'speaker2',
            path: resPath.speakerAnimated,
            pt: new PIXI.Point(0.05, 1.5),
            count: 6,
            framePrefix : "speaker1",
            scale: 0.75,
            start : false
        },	
        {
            type: 'addSpine',
            name: 'spineboy',
            path: 'res/json/spineboy.json',
            pt: new PIXI.Point(renderer.getW() / 2, renderer.getH()),
            scale: 0.5
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

	// need to set start to know how far to bring back down in future
	speaker1StartY =  renderer.getElemByID('speaker1').position.y;
	speaker2StartY =  renderer.getElemByID('speaker2').position.y;


    for (var i = 0; i < appData.length; i++) {
        renderer.displayLayerByID(appData[i].name);
    }
    let lightSwitch = renderer.getElemByID('switch');
    lightSwitch.interactive = true;
    lightSwitch.pointerdown = function () {
        renderer.editorFilter.uniforms.mode = renderer.editorFilter.uniforms.mode ^ 0x1;
        if (renderer.editorFilter.uniforms.mode == 0) {
            lightOnTexture = lightSwitch.texture;
            lightSwitch.texture = lightOffTexture;
        }
        else {
            lightOffTexture = lightSwitch.texture;
            lightSwitch.texture = lightOnTexture;
        }
    }
    
    let player = renderer.getElemByID('spineboy');
    player.interactive = true;
    player.pointerdown = function () {
        if (playerMovingForward == true || playerMovingBackward == true) {
            // Currently performing action, so cannot stop
            return;
        }
        playerMovingForward = true;
        player.state.addAnimation(0, 'walk', true, 0);
    }

    renderer.app.ticker.add(function (delta) {

        if (playerMovingForward) {
            player.position.x += 2 * delta;
            if (Math.abs(player.position.x - lightSwitch.position.x) < 20) {
                playerMovingForward = false;
                player.scale.x = -player.scale.x;
                playerMovingBackward = true;
                lightSwitch.pointerdown();
            }
        }
        if (playerMovingBackward) {
            player.position.x -= 2 * delta;
            if (player.position.x < 150) {
                playerMovingBackward = false;
                player.scale.x = -player.scale.x;
                player.state.addAnimation(0, 'walk', false, 0);
            }
        }
    });
}