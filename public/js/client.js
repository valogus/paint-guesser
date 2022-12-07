const ws = new WebSocket(window.location.href.replace(/http/i, 'ws'));

ws.onopen = () => {
  console.log('connected');
};
