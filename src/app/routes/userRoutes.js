import express from 'express';
import userController from "../controller/userController.js";

const userRoutes = express.Router();
const controller = new userController;

userRoutes.post('/cadastrar', controller.createController);
userRoutes.get('/buscarTodos', controller.showController);
userRoutes.delete('/deletarUsuario/:id', controller.deleteController);

export default userRoutes;