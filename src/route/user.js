import express, { Router } from "express";
import userController from '../controllers/userController'

let router = express.Router();

let userRoutes = (app) => {

    router.post('/login', userController.handleLogin)
    router.get('/getAll', userController.handleGetAllUsers)
    router.post('/addNew', userController.handleAddNewUser)
    router.post('/edit', userController.handleEditUser)
    router.post('/delete', userController.handleDeleteUser)
    router.get('/gethash', userController.handleGetHash)

    return app.use("/api/user", router)
}

module.exports = userRoutes;