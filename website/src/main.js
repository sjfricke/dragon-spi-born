$(window).ready(run());

var renderer;
function run() {
    renderer = new Renderer();
    renderer.addContainer('fireplace', new PIXI.Point(200, 200));
    renderer.add('fire', resPath.fire, new PIXI.Point(100, 50), 'fireplace');
    renderer.add('firePlace', resPath.firePlace, new PIXI.Point(100, 50), 'fireplace');
    renderer.doStuff();
}
