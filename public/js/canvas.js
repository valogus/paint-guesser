const ws = new WebSocket(window.location.href.replace(/http/i, 'ws'));
const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');
const brush = document.querySelector('.brush');
const eraser = document.querySelector('.eraser');
const rect = document.querySelector('.rect');
const circle = document.querySelector('.circle')
const x = 50;
const width = 600;
const height = 400;
canv.width = 600;
canv.height = 400;
canv.offsetWidth = 0;
canv.offsetHeight = 0;
// ctx.fillStyle = 'magenta'; // указываем цвет квадрата
// ctx.fillRect(50, 50, 300, 200); //квадарат

// ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2); // круг
// ctx.fill();
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(25, 100);
// ctx.lineTo(75, 100);
// ctx.lineTo(50, 50);
// ctx.stroke()
//  кружок
// canv.addEventListener('mousedown', (e) => {
//     ctx.beginPath();
//     console.log(e.clientX, e.clientY)
//     ctx.arc(e.clientX-205, e.clientY-173, 30, 0, Math.PI * 2);
//     ctx.fill();
// });
let isMouseDown = false;
// кисть
const brushdown = (e) => {
    const inputcolor = document.querySelector('.inputcolor').value;
    ctx.strokeStyle = inputcolor;
    ctx.fillStyle = inputcolor;
    ctx.lineWidth = 4 * 2;
    isMouseDown = true;
};
const brushmove = (e) => {
    // console.log(e.offsetX, e.offsetY);
    if (isMouseDown) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        // console.log(e.clientX, e.clientY)
        ctx.arc(e.offsetX, e.offsetY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
};
brush.addEventListener('click', () => {
    canv.addEventListener('mousedown', brushdown);
    canv.addEventListener('mouseup', (e) => {
        isMouseDown = false;
        ctx.beginPath();
    });

    canv.addEventListener('mousemove', brushmove);
});
// стерка
const erasedown = (e) => {
    isMouseDown = true;
    ctx.lineWidth = 20 * 2;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
};
const erasemove = (e) => {
    if (isMouseDown) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        // console.log(e.clientX, e.clientY)
        ctx.arc(e.offsetX, e.offsetY, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
};
eraser.addEventListener('click', () => {
    canv.addEventListener('mousedown', erasedown);
    canv.addEventListener('mouseup', (e) => {
        isMouseDown = false;
        ctx.beginPath();
    });
    canv.addEventListener('mousemove', erasemove);
});
// квадрат
function squaremove(e) {
    // console.log('this.startX', this.startX, this.statY);
    if (isMouseDown) {
        const inputcolor = document.querySelector('.inputcolor').value;
        ctx.strokeStyle = inputcolor;
        ctx.fillStyle = inputcolor;
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            ctx.clearRect(0, 0, 600, 400);
            ctx.drawImage(img, 0, 0, 600, 400);
            ctx.beginPath();
            ctx.rect(this.startX, this.startY, e.offsetX - this.startX, e.offsetY - this.startY);
            ctx.fill();
            ctx.stroke();
        };
    }
}
function squaredown(e) {
    isMouseDown = true;

    ctx.moveTo(e.offsetX, e.offsetY);
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    //   console.log(canv.toDataURL());
    this.saved = canv.toDataURL();
    //   console.log('this.saved', this.saved);
}
rect.addEventListener('click', (e) => {
    canv.addEventListener('mousedown', squaredown);
    canv.addEventListener('mouseup', (event) => {
        isMouseDown = false;
        ctx.beginPath();
    });

    canv.addEventListener('mousemove', squaremove);
});
// круг
function circlemove(e) {
    // console.log('this.startX', this.startX, this.statY);
    if (isMouseDown) {
        const inputcolor = document.querySelector('.inputcolor').value;
        ctx.strokeStyle = inputcolor;
        ctx.fillStyle = inputcolor;
        const img = new Image();
        img.src = this.saved;
        img.onload =  async function () {
                let r = Math.sqrt((e.offsetX - this.startX)**2 + (e.offsetY - this.startY)**2)
                ctx.clearRect(0, 0, 600, 400);
                ctx.drawImage(img, 0, 0, 600, 400)
                ctx.beginPath()
                ctx.arc(this.startX, this.startY, r, 0, 2*Math.PI)
                ctx.fill()
                ctx.stroke()
            }.bind(this)
        };
    }
function circledown(e) {
    isMouseDown = true;

    // ctx.moveTo(e.offsetX, e.offsetY);
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    //   console.log(canv.toDataURL());
    this.saved = canv.toDataURL();
    //   console.log('this.saved', this.saved);
}
circle.addEventListener('click', (e) => {
    canv.addEventListener('mousedown', circledown);
    canv.addEventListener('mouseup', (event) => {
        isMouseDown = false;
        ctx.beginPath();
    });

    canv.addEventListener('mousemove', circlemove);
});

// удаляем листнеры, а то чего им висеть
let sendingImg;
window.addEventListener('click', (event) => {
    console.log('----->', event.target.className);
    if (event.target.className !== 'start btn btn-warning') {sendingImg = canv.toDataURL();
    //   console.log('sendingImg', sendingImg);
    ws.send(sendingImg);}
    // const data ={
    //     x: mouseX,
    //     y: mouseY
    // }

    if (event.target.className.includes('toolbar-btn') && !event.target.className.includes('rect')) {
        canv.removeEventListener('mousemove', squaremove, false);
        canv.removeEventListener('mousedown', squaredown, false);
    }
    if (event.target.className.includes('toolbar-btn') && !event.target.className.includes('erase')) {
        canv.removeEventListener('mousemove', erasemove, false);
        canv.removeEventListener('mousedown', erasedown, false);
    }
    if (event.target.className.includes('toolbar-btn') && !event.target.className.includes('brush')) {
        canv.removeEventListener('mousemove', brushmove, false);
        canv.removeEventListener('mousedown', brushdown, false);
    }
    if (event.target.className.includes('toolbar-btn') && !event.target.className.includes('circle')) {
        canv.removeEventListener('mousemove', circlemove, false);
        canv.removeEventListener('mousedown', circledown, false);
    }
});

// ws.onopen = () => {

//     // console.log(sendingImg )

//     ws.send(sendingImg)
// };
