export function createSocket(url) {
  const Socket = new WebSocket(url);
  return Socket;
}

export function onIncoming(evt) {
  if (evt.data) {
    return JSON.parse(evt.data);
  }
  return undefined;
}

export function sendNewMessage(Socket, msg) {
  let m = JSON.stringify(msg);
  Socket.send(m);
  return true;
}
