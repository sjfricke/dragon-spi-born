$(window).ready(run());

var renderer;
function run() {
    renderer = new Renderer();
    renderer.addContainer('fireplace', new PIXI.Point(0, 0));
    renderer.add('fire', resPath.fire, new PIXI.Point(40, 0), 'fireplace');
    renderer.add('firePlace', resPath.firePlace, new PIXI.Point(100, 0), 'fireplace');
    renderer.setPosByPercent('fire', new PIXI.Point(0.5, 0))
}
