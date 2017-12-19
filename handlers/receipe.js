module.exports = {
    recipesHandler : function(request, reply) {

        let sql = 'select * from recipes';
        let params = [];

        if(request.query.cuisine) {
            sql += ' where cuisine = ?';
            params.push(request.query.cuisine);
        }
        this.db.all(sql, params, (err, results) => {
            if(err) throw err;

            reply(results);
        })
    },
    recipeByIdHandler: function(request, reply) {
        
        let sql = 'select * from recipes where id = ?';
    
        this.db.get(sql, [request.params.id], (err, results) => {
            if(err) throw err;

            if(typeof results !== 'undefined') {
                return reply(results);
            } 
                
            return reply('No cuisine found for ' + request.params.id).code(404);
        });
    },
    createRecipe: function(request, reply) {
        let sql = 'insert into recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, \
                                    directions, user_id) values (?, ?, ?, ?, ?, ?, ?, ?)'
        
        this.db.run(sql, [
            request.payload.name,
            request.payload.cooking_time,
            request.payload.prep_time,
            request.payload.serves,
            request.payload.cuisine,
            request.payload.ingredients,
            request.payload.directions,
            request.payload.user_id
        ], (err) => {
            if(err) {
                throw err
            }

            reply({status: 'ok'});
        })
    }
    

}