const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');

const server = new Hapi.Server();
const db = new Sqlite3.Database('./dindin.sqlite');

server.connection({
    port: 8000
});

server.route([{
    path: '/api/recipes',
    method: 'GET',
    handler: (request, reply) => {

        let sql = 'select * from recipes';
        let params = [];

        if(request.query.cuisine) {
            sql += ' where cuisine = ?';
            params.push(request.query.cuisine);
        }
        db.all(sql, params, (err, results) => {
            if(err) throw err;

            reply(results);
        });
    }
}, {
    path: '/api/recipes/{id}',
    method: 'GET',
    handler: (request, reply) => {

        let sql = 'select * from recipes where id = ?';
 
        db.get(sql, [request.params.id], (err, results) => {
            if(err) throw err;

            console.log(results !== 'undefined')
            if(typeof results !== 'undefined') {
               return reply(results);
            } 
                
            return reply('No cuisine found for ' + request.params.id).code(404);
        });
    }
}

]);

server.start((err) => {
    if(err) throw err

    console.log('Server started ', server.info.uri);
});

