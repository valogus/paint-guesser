const React = require('react');

function Toolbar() {
    return (
<div>
        <div className="toolbar">
            <button className="toolbar-btn brush" />
            <button className="toolbar-btn rect" />
            <button className="toolbar-btn circle" />
            <button className="toolbar-btn eraser" />
            <button className="toolbar-btn line" />
            <input style={{ marginLeft: 10 }} type="color" className='inputcolor form-control form-control-color'/>
            <button className="start btn btn-warning"> Начни игру! </button>
            <button className="toolbar-btn undo" />
            <button className="toolbar-btn redo" />
            <button className="toolbar-btn save" />

        </div>
        <div className="hidden"><div>Угадай нарисованное слово!</div></div>
  </div>
    );
}

module.exports = Toolbar;
