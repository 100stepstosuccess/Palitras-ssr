class Server {
  constructor() {
    this.db = [];
    this.port = PORT;
    this.host = HOST;
    this.env = NODE_ENV;
  }

  dbList() {
    return this.db.map(database => database.name);
  }

  addDatabase(database) {
    this.db.push(database);
  }

  start(app) {
    this._connectDatabase();
    app.listen(this.port, () => console.log(`server runs on ${this.host}`));
  }

  _connectDatabase() {
    this.db.forEach(database => {
      database.connect();
    });
  }
}

module.exports = new Server();
