
# Paint Guesser

This is a node.js application powered by WebSockets, ReactSSR, Canvas and Express.  You are given the ability to draw together with other users on the same screen. The app also has a built-in guessing game function for pictures that are puzzled by the game and drawn by one of the participants.

![Logo](https://i.ibb.co/dK1YdSq/2023-01-30-00-51-26.png)


## Features

- Draw in paint mode with other users.
- The application also includes a built-in chat room to communicate.
- Start the game with other users by pressing the start button. The one who starts the game draws the words that the system has puzzled.
![painter](https://i.ibb.co/279V4MK/game.gif)
- The rest of the participants try to guess the drawn words by writing them down in chat.
![guesser](https://i.ibb.co/Hhthsp8/guesser.gif)




## Run Locally

Clone the project

```bash
  git clone https://github.com/valogus/paint-guesser.git
```

Install dependencies

```bash
  npm install
```

Copy .env_example and create .env

Start the server
```bash
  npm start
```

