import userRepository from "../repository/userRepository.js";

const {createUser, showAllUsers} = new userRepository();

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
}

export default userController;