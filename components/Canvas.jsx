const React = require('react');
const { observer } = require('mobx-react-lite');
const { useEffect, useRef } = require('react');
const canvasState = require('../public/js/canvasState');

function Canvas() {
  return (
    <div className="canvas">
      <canvas id="canvas"  />
    </div>
  );
}

module.exports = Canvas;
