import instanciaPrisma from "../../connection/instance.js";

const prisma = instanciaPrisma.getConnection();

class userRepository{
    async createUser(name, password, email, birthday) {
        try {
            const userExists = await prisma.user.findUnique({where: {email}}); //procura o usuário pra ver se ja existe

            if (userExists === null) {
                const create = await prisma.user.create({data: {name, password, email, birthday}});
                return create
            } else {
                throw new Error('Repository: Falha ao criar usuário!')
            }

        } catch (error) {
            console.log('Repository: Erro no catch! ', error.message)
            // throw error;
        }
    }

    async showAllUsers() {
        try {
            const allUser = prisma.user.findMany();
            return allUser
        } catch (error) {
            console.log('Repository: Erro no cath! ', error.message)
        }
    }

    async deleteUser(name, email) {
        try {
            const userExists = await prisma.user.findUnique({where: {name, email}});
            if (userExists === null) {
                throw new Error('Repository: ConflictError - Usuário não existe ')
            };
            await prisma.user.delete({where:{name, email}});
            const message = {message: 'Usuário Deletado com sucesso!'};
            return message
            
        } catch (error) {
            console.log('Repository: Erro ao deletar usuário! ', error);
            // throw error
        }
    }

}

export default userRepository;