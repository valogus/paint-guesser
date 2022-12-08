const express = require('express');
const ws = require('ws');
// const aWss = ws.getWss(); 
const app = express();
require('@babel/register');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');

// импорт роутов
const indexRoutes = require('./routes/indexRoutes');

// вызов функции проверки соединения с базоый данных
dbCheck();

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// роутеры
app.use('/', indexRoutes);

const PORT = process.env.PORT || 3100;
const httpServer = app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});
const wsServer = new ws.WebSocketServer({
  server: httpServer,
});

// wsServer.on('connection', (client) => {
//   client.on('message', (data) => {
//     console.log('Message from client', data.toString());
//     const message = data.toString()
//     client.send(message)
//   });
// });
wsServer.on('connection', (currentClient) => {
  currentClient.on('message', (data) => {
    console.log(data)
    wsServer.clients.forEach((client) =>{
      const message = data.toString()
      client.send(message)
    })
    console.log('Message from client', data.toString());

  });
});

