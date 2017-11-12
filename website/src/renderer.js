
class Renderer {
    constructor(parentNode) {
        parentNode = $(parentNode);
        if (!parentNode[0]) parentNode = $('body');
        if (parentNode[0] === undefined) {
            log('Renderer', 'Could not correctly initialize renderer.');
        }
        else {
            this.$container = parentNode;
            this.app = new PIXI.Application(window.outerWidth, window.outerHeight, { backgroundColor: 0x1099bb });
            this.$container.append(this.app.view);
            this.elems = {};
        }
    }

    doStuff() {
        var that = this;
        this.app.ticker.add(function (delta) {
            that.getElemByID('fireplace').rotation += 0.1 * delta;
        });
    }

    add(id, imgPath, pos, containerID) {
        if (typeof id !== 'string' || this.testID(id)) {
            log('Renderer', 'Could not add because ID (= %O) is already in use.', id);
            return;
        }
        if (typeof imgPath !== 'string') {
            log('Renderer', 'Could not add because imgPath (= %O) is not of a string.', imgPath);
            return;
        }
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not add because position (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        let container = this.getElemByID(containerID);
        if (container == null || !(container instanceof PIXI.Container)) {
            container = this.app.stage;
        }
        let sprite = PIXI.Sprite.fromImage(imgPath);
        this.elems[id] = sprite;
        sprite.position = pos;
        container.addChild(sprite);
    }

    addAt(id, imgPath, pos, layerNum, containerID) {
        if (typeof id !== 'string' || this.testID(id)) {
            log('Renderer', 'Could not add because ID (= %O) is already in use.', id);
            return;
        }
        if (typeof imgPath !== 'string') {
            log('Renderer', 'Could not add because imgPath (= %O) is not of a string.', imgPath);
            return;
        }
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not add because position (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        let container = this.getElemByID(containerID);
        if (container == null || !(container instanceof PIXI.Container)) {
            container = this.app.stage;
        }
        let sprite = PIXI.Sprite.fromImage(imgPath);
        this.elems[id] = sprite;
        sprite.position = pos;
        if (typeof layerNum !== 'number'
            || layerNum < 0 || layerNum >= container.children.length) {
            log('Renderer', 'Could not add because layerNum (= %O) is not within [0, %i].',
                layerNum, container.children.length - 1);
            return;
        }
        container.addChild(sprite);
    }

    addContainer(id, pos, containerID) {
        if (typeof id !== 'string' || this.testID(id)) {
            log('Renderer', 'Could not add because ID (= %O) is already in use.', id);
            return;
        }
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not add because position (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        let container = this.getElemByID(containerID);
        if (container == null || !(container instanceof PIXI.Container)) {
            container = this.app.stage;
        }
        let elem = new PIXI.Container();
        this.elems[id] = elem;
        elem.position = pos;
        container.addChild(elem);
    }

    addContainerAt(id, pos, layerNum, containerID) {
        if (typeof id !== 'string' || this.testID(id)) {
            log('Renderer', 'Could not add because ID (= %O) is already in use.', id);
            return;
        }
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not add because position (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        let container = this.getElemByID(containerID);
        if (container == null || !(container instanceof PIXI.Container)) {
            container = this.app.stage;
        }
        let elem = new PIXI.Container();
        this.elems[id] = elem;
        elem.position = pos;
        if (typeof layerNum !== 'number'
            || layerNum < 0 || layerNum >= container.children.length) {
            log('Renderer', 'Could not add because layerNum (= %O) is not within [0, %i].',
                layerNum, container.children.length - 1);
            return;
        }
        container.addChildAt(elem, layerNum);
    }

    testID(id) {
        return this.getElemByID(id) != null;
    }

    getElemByID(id) {
        if (typeof id !== 'string') {
            log('Renderer', 'Could not find element because ID (= %O) is not a string.', id);
            return null;
        }
        let found = this.elems[id];
        return (found !== undefined) ? found : null;
    }
}
