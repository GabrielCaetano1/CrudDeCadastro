import express from 'express';
import userController from "../controller/userController.js";

const userRoutes = express.Router();
const {createController, showController} = new userController;

userRoutes.post('/cadastrar', createController);
userRoutes.get('/buscarTodos', showController)

export default userRoutes;