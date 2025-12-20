  import { Router } from "express";
import { getAllUsers, saveUser } from "../controller/userController.js";

  const router = Router();

  router.post("/register", saveUser);
  router.get("/getAllUsers", getAllUsers);

  export default router;