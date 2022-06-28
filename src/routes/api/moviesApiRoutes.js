const express=require('express');
const router=express.Router();
const moviesApiController=require("../../controllers/api/moviesApiController");

router.get("/api/movies",moviesApiController.list);
router.get("/api/movies/:id",moviesApiController.detail);
router.put("/api/movies/update/:id",moviesApiController.update);
router.post("/api/movies",moviesApiController.create);
router.delete("/api/movies/:id",moviesApiController.destroy);


module.exports=router;
