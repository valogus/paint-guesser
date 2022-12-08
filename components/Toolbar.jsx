const React = require('react');

function Toolbar() {
    return (

        <div className="toolbar">
            <button className="toolbar-btn brush" />
            <button className="toolbar-btn rect" />
            <button className="toolbar-btn circle" />
            <button className="toolbar-btn eraser" />
            <button className="toolbar-btn line" />
            <input style={{ marginLeft: 10 }} type="color" className='inputcolor'/>
            <button className="start"> Начни игру! </button>
            <button className="toolbar-btn undo" />
            <button className="toolbar-btn redo" />
            <button className="toolbar-btn save" />

        </div>

    );
}

module.exports = Toolbar;
