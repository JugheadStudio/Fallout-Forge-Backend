import express from 'express';
import dotenv from 'dotenv';

const cors = require('cors'); // middleware
const app = express();

app.use(cors())

dotenv.config()


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});