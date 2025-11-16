import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';
import userRoutes from './app/routes/userRoutes.js';

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);

const DOOR = process.env.DOOR || 3000
const DB_URL = process.env.DATABASE_URL

const connection = new pg.Pool({
    connectionString: DB_URL
})

app.get('/', (req, res) => {
    res.send("Servidor rodando!")
})

async function connectDb() {
    try {
        const client = await connection.connect()
        console.log("[SUCESSO] Database conectado com sucesso ao CRUD!");
        client.release();
    } catch (error) {
        console.error('[ERRO] Erro ao se conectar ao Database! ', error.message);
        process.exit(1)
    }
}

connectDb().then(()=>{
    app.listen(DOOR, () => {
        console.log(`O servidor está rodando em: http://localhost:${DOOR}/user`); 
    })
})
