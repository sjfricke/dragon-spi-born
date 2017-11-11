
class Renderer {
    constructor(parentNode) {
        parentNode = $(parentNode);
        if (!parentNode[0]) parentNode = $('body');
        if (parentNode[0] === undefined) {
            log('Renderer', 'Could not correctly initialize renderer.');
        }
        else {
            this.$container = parentNode;
            this.app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
            this.$container.append(this.app.view);
        }
    }

    doStuff() {
        // create a new Sprite from an image path
        var bunny = PIXI.Sprite.fromImage('res/img/logo.png')

        // center the sprite's anchor point
        bunny.anchor.set(0.5);

        // move the sprite to the center of the screen
        bunny.x = this.app.renderer.width / 2;
        bunny.y = this.app.renderer.height / 2;

        this.app.stage.addChild(bunny);

        // Listen for animate update
        this.app.ticker.add(function (delta) {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent tranformation
            bunny.rotation += 0.1 * delta;
        });
    }
}
