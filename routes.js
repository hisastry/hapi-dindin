var recipeHandlers = require('./handlers/receipe')

module.exports = [{
        path: '/api/recipes',
        method: 'GET',
        handler: recipeHandlers.recipesHandler
    
    }, {
        path: '/api/recipes/{id}',
        method: 'GET',
        handler: recipeHandlers.recipeByIdHandler
    }, {
        path: '/api/recipes',
        method: 'POST',
        handler: recipeHandlers.createRecipe
    }
];