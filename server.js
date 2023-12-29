import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import connection from './config/db.js';
import UserModel from './models/userModel.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
dotenv.config();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hey,Love you');
});

app.post('/post-name', async (req, res) => {
  const { name } = req.body;
  try {
    const findName = await UserModel.find({ name });
    if (findName.length === 0) {
      const new_user = new UserModel({ name });
      await new_user.save();
      res.send('success');
    }
  } catch (error) {
    res.send('error');
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Server Started on PORT:', PORT);
  } catch (error) {
    console.log(error);
  }
});
