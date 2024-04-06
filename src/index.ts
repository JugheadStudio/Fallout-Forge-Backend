import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import AppDataSource from './dataSource';
import inventoryRouter from './routes/inventoryRoute';
import constructionsRouter from './routes/constructionsRoute';
import settlementsRouter from './routes/settlementsRoute';
import ccRouter from './routes/constructed_constructionsRoute';
import userRouter from './routes/userRoute';
// import ormconfig from '../ormconfig.json';

const cors = require('cors');

const app = express();

app.use(cors())

dotenv.config()

const appDataSource = AppDataSource

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/inventory', inventoryRouter);
app.use('/constructions', constructionsRouter);
app.use('/settlements', settlementsRouter);
app.use('/admin', ccRouter);
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000');
});
