const res = require('express/lib/response');
const db = require('../../database/models');
const sequelize = db.sequelize;

const moviesApiController={

    list:(req,res)=>{
        db.Movie.findAll()
            .then(movies=>{
                let response={
                    meta:{
                        status:200,
                        total:movies.length,
                        url:"api/movies"
                    },
                    data:movies
                }
                res.json(response)
            })  
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                const response ={
                    meta:{
                        status:200,
                        url: '/api/movies/:id'
                    },
                    data:movie,
                }
                res.json(response);
            })
            .catch(err => {
                res.send(err);
            })
            
    },
    update: (req,res) => {
        let movieId = req.params.id;
        db.Movie.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    create:(req,res)=>{
        db.Movie.create(req.body)
            .then(confirm =>{
                let response;
                if(confirm){
                    response={
                        meta:{
                            status:200,
                            url: 'api/movies/create'
                        },
                        data:confirm
                    }
                }else{
                    response={
                        meta:{
                            status:204,
                            url:'api/movies/create'
                        },
                        data:confirm
                    }
                }
                res.json(response)
            })
            .catch(error=>res.send(error))
    },
    destroy: (req,res) => {
        db.Movie.destroy({where: {id: req.params.id}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let response;
            if(confirm){
                response ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/:id'
                    },
                    data:confirm
                }
            }else{
                response ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/:id'
                    },
                    data:confirm
                }
            }
            res.json(response);
        })    
        .catch(error => res.send(error))
    }
}
module.exports=moviesApiController