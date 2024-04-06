import express from "express";
import AppDataSource from "../dataSource";
import { User } from "../entity/users";
import * as bcrypt from 'bcrypt'

const userRouter = express.Router()

userRouter.use(express.json())

const appDataSource = AppDataSource

userRouter.post("/", async (req, res) => {
  
  try {
    const {name, surname, username, email, password, isAdmin} = req.body

    var newUser = new User()

    newUser.name = name
    newUser.surname = surname
    newUser.username = username
    newUser.email = email
    newUser.password = password
    newUser.isAdmin = isAdmin

    var addedUser = await appDataSource.getRepository(User).save(newUser);

    return res.json(addedUser)

  } catch (error) {
    console.log("Error occured: " + error)
    return res.status(500).json({message: error})
  }
})

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