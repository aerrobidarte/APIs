const express = require('express');
const router = express.Router();
const genresApiController = require('../../controllers/api/genresApiController');

router.get('/api/genres', genresApiController.list);
router.get('/api/genres/:id', genresApiController.detail);
router.put('/api/genres/update/:id', genresApiController.update);
router.post('/api/genres', genresApiController.create);
router.delete('/api/genres/:id', genresApiController.destroy);

module.exports=router