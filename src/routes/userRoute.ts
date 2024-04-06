import express from "express";
import AppDataSource from "../dataSource";
import { User } from "../entity/users";
import * as bcrypt from 'bcrypt'

const userRouter = express.Router()

userRouter.use(express.json())

const appDataSource = AppDataSource

userRouter.post("/register", async (req, res) => {
  try {
    const { name, surname, username, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await appDataSource.getRepository(User).findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email address already registered" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User();
    newUser.name = name;
    newUser.surname = surname;
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword; // Assign hashed password

    // Save the new user to the database
    const addedUser = await appDataSource.getRepository(User).save(newUser);

    return res.status(201).json(addedUser);
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post('/login', async (req, res) => {
  try {

    const {email, password} = req.body;

    // if (email || username && password)
    if (email && password) {

      let userRequest = await appDataSource.getRepository(User).findOneBy({email: email})

      if (!userRequest ){
        return res.status(404).json({message: " No User Found"})
      } else {
        bcrypt.compare(password, userRequest.password, (error, result) => {
          if (!result) {
            userRequest!.password = ""
            return res.json(userRequest)
          } else {
            return res.status(500).json({message: "Invalid Credentials"})
          }
        })
      }
    } else {
      return res.status(500).json({message: "Invalid Credentials"})
    }
    
  } catch (error) {
    console.log("Error occured: " + error)
    return res.status(500).json({message: error})
  }
})

export default userRouter