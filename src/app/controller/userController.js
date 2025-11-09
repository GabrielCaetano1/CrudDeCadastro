import userRepository from "../repository/userRepository.js";

const {createUser, showAllUsers, deleteUser} = new userRepository();

class userController{
    async createController(req, res) {
        try {
            const {name, password, email, birthday} = req.body;
            const user = await createUser(name, password, email, birthday);
            res.status(200).json({message: 'Usuário criado com sucesso!'})
        } catch (error) {
            res.status(500).json({
                message: "Erro ao criar usuário!",
                error: error.message
            });
        }
    }

    async showController(req, res) {
        try {
            const user = await showAllUsers();
            res.json(user)    
        } catch (error) {
            res.status(500).json({
                message: "Controller: Erro ao acessar a tabela!",
                error: error.message
            })
            // console.error(error);
        }
    }

    async deleteController(req, res) {
        try {
            const {name, email} = req.body;
            if (name === null || email === null) {
                return res.status(400).json({message: 'Nome e Email obrigatórios ao deletar!'})
            };
            const user = await deleteUser(name, email);
            res.status(200).json(user.message)

        } catch (error) {
            res.status(500).json({
                message: 'Controller: Erro ao deletar usuário!',
                error: error.message
            })
        }
    }
}

export default userController;