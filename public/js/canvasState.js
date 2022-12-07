const { makeAutoObservable } = require('mobx');

class CanvasState {
  canvas = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }
}
module.exports = new CanvasState();
