const buttonmsg = document.querySelector('.buttonmsg');
const input = document.querySelector('.input');
const messageContainer = document.querySelector('[data-message]');
const btnName = document.querySelector('.btn-primary');
const userName = document.querySelector('.username');
const modal = document.querySelector('.modal');
const startGame = document.querySelector('.start');
const wordShow = document.querySelector('.word');
const toolbar = document.querySelector('.toolbar');
ws.onopen = () => {
    // console.log('connected');
    // ws.send('hi websocket!');
    buttonmsg.disabled = false;
};

ws.onclose = () => {
    console.log('disconnected');
};
// console.log(ws)
ws.onmessage = (event) => {
    // скрываем верхнюю панел в начале игры
    if(event.data === 'open')toolbar.style.display = 'flex'
    if (event.data !== 'open' && !event.data.includes('data:image/pn') && JSON.parse(event.data).close) {
        console.log('=====>', JSON.parse(event.data).close);
        console.log('this', userGlobal)
        if (userGlobal !== JSON.parse(event.data).close) toolbar.style.display = 'none';
    }
    // console.log('Message from server', event.data)
    if (!event.data.includes('data:image/pn')) {
        // console.log(event.data);
        if (event.data.includes('word')) {
            console.log('11111')
            this.word = JSON.parse(event.data).word;
            console.log(this.word);
            ctx.clearRect(0, 0, 600, 400);
        } else {
            const msg = JSON?.parse(event.data);
            // console.log(msg);
            // скрываем верно угаданные сообщения
            if (msg.input && msg?.input?.toLowerCase() !== this?.word?.toLowerCase()) messageContainer.innerHTML += `${msg.username}<li>${msg.input}</li>`;
            if (this.word && msg?.input?.toLowerCase() === this?.word?.toLowerCase()) messageContainer.innerHTML += `${msg.username}<li>+10 баллов</li>`;
        }
    } else {
        const img2 = new Image();
        img2.src = event.data;
        // console.log(img2)
        img2.onload = () => {
            ctx.drawImage(img2, 0, 0, 600, 400);
        };
        // console.log('Message from server', event.data)
    }
};
btnName.addEventListener('click', function () {
    // console.log(userName.value);
    this.userName = userName.value;
    // console.log(modal);
    userGlobal = userName.value
    if (userName.value) modal.style.display = 'none';
    startGame.addEventListener('click', (event) => {
        startGame.disabled = true;
        buttonmsg.disabled = true;
        const close = { close: this.userName };
        ws.send(JSON.stringify(close));
        const massive = ['яблоко', 'птица', 'кружка', ''];
        const word = { word: massive[0] };
        ws.send(JSON.stringify(word));
        wordShow.innerHTML = `Нарисуй слово:${massive[0]}`;
        let i = 1;
        const inter = setInterval(() => {
            const word2 = { word: massive[i] };
            ws.send(JSON.stringify(word2));
            wordShow.innerHTML = `Нарисуй слово:${massive[i++]}`;

            if (massive.length <= i) {
                wordShow.innerHTML = '';
                ws.send('open')
                startGame.disabled = false;
                buttonmsg.disabled = false;
                clearInterval(inter);
            }
        }, 5000);
        // console.log(inter);
        // console.log(wordShow.innerHTML);
    });
    buttonmsg.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(this.userName);
        const chat = { input: input.value, username: this.userName };
        ws.send(JSON.stringify(chat));
    });
});
