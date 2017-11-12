
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
            this.app.stage.interactive = true;
        }
    }

    doStuff() {
        // load spine data
        PIXI.loader
            .add('spineboy', 'res/json/spineboy.json')
            .load(onAssetsLoaded);

        var that = this;
        function onAssetsLoaded(loader, res) {
            // create a spine boy
            var spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);

            // set the position
            spineBoy.x = that.app.renderer.width / 2;
            spineBoy.y = that.app.renderer.height;

            spineBoy.scale.set(1.5);

            // set up the mixes!
            spineBoy.stateData.setMix('walk', 'jump', 0.2);
            spineBoy.stateData.setMix('jump', 'walk', 0.4);

            // play animation
            spineBoy.state.setAnimation(0, 'walk', true);

            that.app.stage.on('pointerdown', function () {
                spineBoy.state.setAnimation(0, 'jump', false);
                spineBoy.state.addAnimation(0, 'walk', true, 0);
            });
            that.app.stage.on('pointermove', function (e) {
                spineBoy.state.addAnimation(0, 'walk', true, 0);
                spineBoy.x = (spineBoy.x + 5) % 1650;
            });
        }
    }

    addSpine(id, jsonPath, pos, onload, containerID, scale) {
        if (typeof id !== 'string' || this.testID(id)) {
            log('Renderer', 'Could not add because ID (= %O) is already in use.', id);
            return;
        }
        if (typeof jsonPath !== 'string') {
            log('Renderer', 'Could not add because jsonPath (= %O) is not of a string.', jsonPath);
            return;
        }
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not add because position (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        var container = this.getElemByID(containerID);
        if (container == null || !(container instanceof PIXI.Container)) {
            container = this.app.stage;
        }
        PIXI.loader
            .add(id, jsonPath)
            .load(onAssetsLoaded);

        var that = this;
        function onAssetsLoaded(loader, res) {
            that.elems[id] = new PIXI.spine.Spine(res[id].spineData);

            that.elems[id].x = pos.x;
            that.elems[id].y = pos.y;

            if (scale !== undefined && typeof scale === 'number' && scale > 0) {
                that.elems[id].scale.x = scale;
                that.elems[id].scale.y = scale;
            }
            if (typeof onload === 'function') {
                onload(id, that.elems[id]);
            }
        }
    }

    add(id, imgPath, pos, onload, containerID, scale) {
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
        let loader = new PIXI.loaders.Loader();
        loader.add(id, imgPath);
        var that = this;
        loader.load((loader, res) => {
            that.elems[id] = new PIXI.Sprite(res[id].texture);
            that.elems[id].anchor.x = 0.5;
            that.elems[id].anchor.y = 1;
            that.elems[id].position.x = pos.x * window.outerWidth;
            that.elems[id].position.y = pos.y * window.outerHeight;
            if (scale !== undefined && typeof scale === 'number' && scale > 0) {
                that.elems[id].scale.x = scale;
                that.elems[id].scale.y = scale;
            }
            if (typeof onload === 'function') {
                onload(id, that.elems[id]);
            }
        });
    }

    addAt(id, imgPath, pos, onload, layerNum, containerID) {
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
        let loader = new PIXI.loaders.Loader();
        loader.add(id, imgPath);
        var that = this;
        loader.load((loader, res) => {
            that.elems[id] = new PIXI.mesh.Plane(res[id].texture);
            that.elems[id].position = pos;
            if (typeof layerNum !== 'number'
                || layerNum < 0 || layerNum >= container.children.length) {
                log('Renderer', 'Could not add because layerNum (= %O) is not within [0, %i].',
                    layerNum, container.children.length - 1);
                return;
            }
            if (typeof onload === 'function') {
                onload(id, that.elems[id]);
            }
        });
    }

    addTile(id, imgPath, pos, onload, containerID) {
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
        let loader = new PIXI.loaders.Loader();
        loader.add(id, imgPath);
        var that = this;
        loader.load((loader, res) => {
            that.elems[id] = new PIXI.extras.TilingSprite(
                res[id].texture,
                that.app.renderer.width,
                that.app.renderer.height
            );
            if (typeof onload === 'function') {
                onload(id, that.elems[id]);
            }
        });
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
    }

    testID(id) {
        return this.getElemByID(id) != null;
    }

    getElemByID(id) {
        if (typeof id !== 'string') {
            return null;
        }
        let found = this.elems[id];
        return (found !== undefined) ? found : null;
    }

    getW() {
        return this.app.renderer.width;
    }

    getH() {
        return this.app.renderer.height;
    }

    setPos(id, pos) {
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not set position because pos (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        let elem = this.getElemByID(id);
        if (elem == null) {
            log('Renderer', 'Could not set position because no element with ID (= %O) was found.', id);
            return;
        }
        elem.position = pos;
    }

    setPosByPercent(id, pos) {
        if (!(pos instanceof PIXI.Point)) {
            log('Renderer', 'Could not set position because pos (= %O) is not of type PIXI.Point.', pos);
            return;
        }
        let elem = this.getElemByID(id);
        if (elem == null) {
            log('Renderer', 'Could not set position because no element with ID (= %O) was found.', id);
            return;
        }
        let w = elem.parent.width, h = elem.parent.height;
        elem.x = pos.x * w;
        elem.y = pos.y * h;
    }

    displayLayerByID(id) {
        let layer = this.getElemByID(id);
        if (layer == null) {
            log('Renderer', 'Could not display layer because  ID (= %O) was not found.', id);
            return;
        }
        this.app.stage.addChild(layer);
    }
}
