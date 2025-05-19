const peer = new Peer(); // uses public PeerJS server

let conn;

peer.on('open', id => {
  document.getElementById('your-id').textContent = id;
});

peer.on('connection', connection => {
  conn = connection;
  setupConnection();
});

function connect() {
  const otherId = document.getElementById('connect-to-id').value;
  conn = peer.connect(otherId);
  setupConnection();
}

function setupConnection() {
  conn.on('open', () => {
    appendChat("Connected!");
  });

  conn.on('data', data => {
    appendChat("Peer: " + data);
  });
}

function send() {
  const msg = document.getElementById('msg').value;
  conn.send(msg);
  appendChat("You: " + msg);
}

function appendChat(text) {
  const chat = document.getElementById('chat');
  chat.value += text + "\n";
}
