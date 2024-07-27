import express from 'express'
import { fetch ,create, update, deleteUser, login} from '../controller/userController.js'

const route = express.Router();
route.post("/register", create)
route.get("/getAllUsers", fetch)
route.put("/updateUser/:id", update)
route.delete("/deleteUser/:id", deleteUser)
route.post("/login", login)

export default route;