import express from 'express';
import dotenv from 'dotenv';
import todoRouter from '../features/todo'

dotenv.config();


const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/todos', todoRouter)


export default app ;