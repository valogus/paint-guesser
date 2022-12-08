const express = require('express');

const route = express.Router();

const render = require('../lib/render');
const Index = require('../views/Index');

route.get('/', (req, res) => {
  res.redirect(`/${(+new Date()).toString(16)}`);
});
route.get('/:id', (req, res) => {
  render(Index, { title: 'Welcome to Express - ReactSSR' }, res);
});
module.exports = route;
