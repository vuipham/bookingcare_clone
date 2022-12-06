import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/trangchu', (req, res) => {
        return res.send("trang chu")
    });  

    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;