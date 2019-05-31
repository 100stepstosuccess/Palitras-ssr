class Database {
  constructor(config) {
    this.name = config.name;
    this.url = config.url;
    this.connection = config.connection;

    if (!config.name) {
      throw new Error('Database requires property "name"');
    }

    if (!config.url) {
      throw new Error('Database requires property "url"');
    }

    if (!config.connection) {
      throw new Error('Database requires property "connection"');
    }
  }

  connect() {
    this.connection
      .then(() => console.log(`${this.name} is successfully connected`))
      .catch(err => console.log(this.name, err));
  }
}

module.exports = Database;
