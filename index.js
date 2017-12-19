let Hapi = require('hapi');
let Sqlite3 = require('sqlite3');

let server = new Hapi.Server();
let db = new Sqlite3.Database('./dindin.sqlite');

server.connection({
    port: 8000
});

let validateFunc = (token, callback) => {
    db.get('select * from users where token = ?', [token], (err, result) => {
        if(err) {
            callback(err, false)
        }

        const user = result
        if(typeof user === undefined) {
            callback(null, false)
        }

        callback(null, true, {
            id: user.id,
            username: user.username
        })
    });
}

server.bind({ db: db } );

server.register(require('hapi-auth-bearer-token'), (err) => {

    if(err) {
        throw err
    }

    server.route(require('./routes'));
    
    server.start((err) => {
        if(err) throw err
    
        console.log('Server started ', server.info.uri);
    });
})


