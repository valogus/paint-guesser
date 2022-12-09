const React = require('react');
const { observer } = require('mobx-react-lite');
const { useEffect, useRef } = require('react');
const canvasState = require('../public/js/canvasState');

function Canvas() {
  return (
    <div className="canvas">
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Введите ваше имя</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <input className="username" type="name" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Введи свое имя</button>
            </div>
          </div>
        </div>
      </div>

      <div className="scoreForm mb-3 form-control"><p className="scoreName">Счет</p><div className="score" /></div>
      <canvas id="canvas" />

      <div className="chat mb-3 form-control">
        <form id="myform" className="formChat" type="submit">
          <input name="message" type="text" className="input" />
        </form>
        <br />
        <button form="myform" name="sendButton" className="buttonmsg btn btn-primary" type="submit" disabled> Введите сообщение</button>

        <ul className="list-group " data-message="" />
      </div>
    </div>

  );
}

module.exports = Canvas;
