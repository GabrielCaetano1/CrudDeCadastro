import express from 'express';
import userController from "../controller/userController.js";

const userRoutes = express.Router();
const {createController, showController, deleteController} = new userController;

userRoutes.post('/cadastrar', createController);
userRoutes.get('/buscarTodos', showController);
userRoutes.delete('/deletarUsuario', deleteController);

export default userRoutes;