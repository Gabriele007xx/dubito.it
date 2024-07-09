import express, {Request, Response} from "express";
import { dubito } from "../index";

export const routerUsers = express.Router();

routerUsers.get("/", function(req, res){
    return res.json([dubito.getUsers()]);
});