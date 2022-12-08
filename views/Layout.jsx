const React = require('react');
const Canvas = require('../components/Canvas');
const SettingBar = require('../components/SettingBar');
const Toolbar = require('../components/Toolbar');

function Layout({ title, children }) {
  return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
          <link rel="stylesheet" href="/css/style.css" />
          <link rel="stylesheet" href="/css/toolbar.css" />
          <link rel="stylesheet" href="/css/canvas.css" />
          <script defer src="/js/canvas.js" />
          <script defer src="/js/client.js" />
          <title>{title || 'ReactSSR'}</title>

          {/* <link rel="stylesheet" href="https://unpkg.com/purecss@2.1.0/build/pure-min.css" integrity="sha384-yHIFVG6ClnONEA5yB5DJXfW2/KC173DIQrYoZMEtBvGzmf0PKiGyNEqe9N6BNDBH" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="/css/style.css"/>
        <script defer src="/js/application.js"></script> */}

        </head>
        <body>
        <div className="app">
          <Toolbar />
          <SettingBar />
          <Canvas />
        </div>
      </body>
    </html>
  );
}

module.exports = Layout;
