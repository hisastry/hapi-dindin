const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');

const server = new Hapi.Server();
const db = new Sqlite3.Database('./dindin.sqlite');

server.connection({
    port: 8000
});

server.bind({db: db})

server.route(require('./routes'));

server.start((err) => {
    if(err) throw err

    console.log('Server started ', server.info.uri);
});

