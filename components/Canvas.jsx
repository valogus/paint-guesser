const React = require('react');
const { observer } = require('mobx-react-lite');
const { useEffect, useRef } = require('react');
const canvasState = require('../public/js/canvasState');

function Canvas() {
  return (
    <div className="canvas">
      <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Введите ваше имя</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input class='username'type='name'></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" >Введи свое имя</button>
      </div>
    </div>
  </div>
</div>
<div className="score"></div>
      <canvas id="canvas" />

      <div className="chat">
        <input name="message" type="text" className="input" />
        <br />
        <button name="sendButton" className="buttonmsg" type="click" disabled> Введите сообщение</button>
        <ul data-message=''></ul>
      </div>
    </div>

  );
}

module.exports = Canvas;
