const buttonmsg = document.querySelector('.buttonmsg');
const input = document.querySelector('.input');
const messageContainer = document.querySelector('[data-message]');
const btnName = document.querySelector('.btn-primary');
const userName = document.querySelector('.username');
const modal = document.querySelector('.modal');
const startGame = document.querySelector('.start');
const wordShow = document.querySelector('.word');
const toolbar = document.querySelector('.toolbar');
const scoreBar = document.querySelector('.score');
const formChat = document.querySelector('.formChat');
const scroll = document.querySelector('.list-group');
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
    // достаем верхнюю панель в конце игры и выводим лучшего игрока!
    if (event.data === 'open') {
        toolbar.style.display = 'flex';
        const scores = scoreBar.querySelectorAll('div');
        let bestPlayer = '';
        let bestScore = 0;
        scores.forEach((el) => {
            if (+el.querySelector('li').innerHTML > bestScore) {
                console.log(+el.querySelector('li').innerHTML);
                bestScore = +el.querySelector('li').innerHTML;
                bestPlayer = el.innerHTML;
            }
        });
        if (bestScore && bestPlayer) {
            messageContainer.insertAdjacentHTML('afterbegin', `Игра<li class="list-group-item">Победитель:${bestPlayer.slice(0, bestPlayer.indexOf('<li id='))}! Со счтеом:${bestScore}!</li>`);
        }
        // console.log(bestScore)
        // console.log(bestPlayer)
    } // скрываем верхнюю панел в начале игры
    if (event.data !== 'open' && !event.data.includes('data:image/pn') && JSON.parse(event.data).close) {
        console.log('=====>', JSON.parse(event.data).close);
        console.log('this', userGlobal);
        scoreBar.innerHTML = '';
        if (userGlobal !== JSON.parse(event.data).close) toolbar.style.display = 'none';
    }
    // console.log('Message from server', event.data)
    if (!event.data.includes('data:image/pn') && event.data !== 'open') {
        // console.log(event.data);
        if (event.data.includes('word')) {
            console.log('11111');
            this.word = JSON.parse(event.data).word;
            console.log(this.word);
            ctx.clearRect(0, 0, 600, 400);
        } else {
            const msg = JSON?.parse(event.data);
            // console.log(msg);
            // скрываем верно угаданные сообщения
            if (msg.input && msg?.input?.toLowerCase() !== this?.word?.toLowerCase()) messageContainer.insertAdjacentHTML('afterbegin', `${msg.username}<li class="list-group-item">${msg.input}</li>`);
            if (this.word && msg?.input?.toLowerCase() === this?.word?.toLowerCase()) {
                // заводим люйдей в таблицу счета ставим ограничение на добавление:
                if (!scoreBar.querySelector(`.${msg.username}`)) {
                    messageContainer.insertAdjacentHTML('afterbegin', `Игра<li class="list-group-item">${msg.username} угадал!</li>`);
                    scoreBar.innerHTML += `<div class =${msg.username}>${msg.username}<li id=${msg.input.toLowerCase()}>10</li></div>`;
                } else if (scoreBar.querySelector(`.${msg.username}`).querySelector('li').id !== msg.input.toLowerCase()) {
                    messageContainer.insertAdjacentHTML('afterbegin', `Игра<li class="list-group-item" >${msg.username} угадал!</li>`);
                    const score = +scoreBar.querySelector(`.${msg.username}`).querySelector('li').innerHTML;
                    scoreBar.querySelector(`.${msg.username}`).querySelector('li').innerHTML = `${score + 10}`;
                    scoreBar.querySelector(`.${msg.username}`).querySelector('li').id = msg.input.toLowerCase();
                }
            }
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
    userGlobal = userName.value;
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
                ws.send('open');
                startGame.disabled = false;
                buttonmsg.disabled = false;
                clearInterval(inter);
            }
        }, 5000);
        // console.log(inter);
        // console.log(wordShow.innerHTML);
    });
    formChat.addEventListener('submit', (e) => {
        e.preventDefault();

        // console.log(this.userName);
        const chat = { input: input.value, username: this.userName };
        formChat.querySelector('input').value = '';
        ws.send(JSON.stringify(chat));
    });
});
