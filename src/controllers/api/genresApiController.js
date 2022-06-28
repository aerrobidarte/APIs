const db = require('../../database/models');
const sequelize = db.sequelize;

const genresApiController = {
    list:(req,res)=>{
        db.Genre.findAll()
            .then(genres => {
                const response ={
                    meta:{
                        status:200,
                        total:genres.length,
                        url: 'api/genres'
                    },
                    data:genres,
                }
                res.json(response);
            })
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                const response ={
                    meta:{
                        status:200,
                        url: '/api/genres/:id'
                    },
                    data:genre,
                }
                res.json(response);
            })
            .catch(err => {
                res.send(err);
            })
            
    },
    update: (req,res) => {
        let genreId = req.params.id;
        db.Genre.update(
            {
                name: req.body.name,
                ranking: req.body.ranking,
            },
            {
                where: {id: genreId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/genres/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/genres/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    create:(req,res)=>{
        db.Genre.create(req.body)
            .then(confirm =>{
                let response;
                if(confirm){
                    response={
                        meta:{
                            status:200,
                            url: 'api/genres'
                        },
                        data:confirm
                    }
                }else{
                    response={
                        meta:{
                            status:204,
                            url:'api/movies'
                        },
                        data:confirm
                    }
                }
                res.json(response)
            })
            .catch(error=>res.send(error))
    },
    destroy: (req,res) => {
        db.Genre.destroy({where: {id: req.params.id}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let response;
            if(confirm){
                response ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/genres/:id'
                    },
                    data:confirm
                }
            }else{
                response ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/genres/:id'
                    },
                    data:confirm
                }
            }
            res.json(response);
        })    
        .catch(error => res.send(error))
    }
}
module.exports=genresApiController;