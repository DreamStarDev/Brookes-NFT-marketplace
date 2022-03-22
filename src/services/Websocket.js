class Websocket {
  appEndpoint;
  appCode;
  connection = null;
  type = null;
  constructor() {
    console.log("websocket constructor");
    this.appEndpoint = (process.env.REACT_APP_API_ENDPOINT || "").replace(
      "http",
      "ws"
    );
    this.token = null;
    window.addEventListener("beforeunload", this.beforeunload);
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.beforeunload();
      }
    }
  }

  beforeunload() {
    this.closeConnection();
  }

  setUserToken(token = null) {
    this.token = token;
    if (token === null && localStorage.getItem("brookes-token")) {
      this.token = localStorage.getItem("brookes-token");
    }
  }

  getConnection() {
    return this.connection;
  }

  setup() {
    console.log("websocket setup")
    if(this.connection?.readyState === 1){
      return;
    }
    this.setUserToken();
    let socketPath = `${this.appEndpoint}ws/notify?token=${this.token}`;
    console.log(socketPath);
    const chatSocket = new WebSocket(socketPath);
    this.connection = chatSocket;
    chatSocket.onmessage = (evt) => this.onMessage(evt);
    chatSocket.onopen = (evt) => this.onOpen(evt);
    chatSocket.onerror = (evt) => this.onError(evt);
    chatSocket.onclose = (evt) => this.onClose(evt);
  }

  closeConnection() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }

  onMessage(params) {
    this.onMessageReceived(params);
  }

  onMessageReceived = (cb) => (msg) => {
    return cb(msg);
  };

  onOpen(params) {
    console.log("websocket is opened");
  }

  onClose(params) {
    console.log("websocket is closed");
  }

  onError(params) {
    console.log("websocket connection error", params);
  }

  sendMessage(params = {}) {
    if (this.connection && this.connection.readyState === 1) {
      this.connection.send(JSON.stringify(params));
    } else {}
  }
}

export default new Websocket();
