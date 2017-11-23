module.exports = [{
    path: '/api/recipes',
    method: 'GET',
    handler: function(request, reply) {

        console.log(this);
        let sql = 'select * from recipes';
        let params = [];

        if(request.query.cuisine) {
            sql += ' where cuisine = ?';
            params.push(request.query.cuisine);
        }
        this.db.all(sql, params, (err, results) => {
            if(err) throw err;

            reply(results);
        });
    }
}, {
    path: '/api/recipes/{id}',
    method: 'GET',
    handler: function(request, reply) {

        let sql = 'select * from recipes where id = ?';
 
        this.db.get(sql, [request.params.id], (err, results) => {
            if(err) throw err;

            if(typeof results !== 'undefined') {
               return reply(results);
            } 
                
            return reply('No cuisine found for ' + request.params.id).code(404);
        });
    }
}
]