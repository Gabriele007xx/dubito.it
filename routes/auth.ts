import express, {Request, Response} from "express";
import { dubito } from "../index";
export const routerAuth = express.Router();

routerAuth.post("/register", function(req: Request, res: Response){
    const success = dubito.register(req.body.email, req.body.password);
    if(success) return res.status(200).json({message: "Utente registrato con successo"});
    else return res.status(400).json({message: "Impossibile registrare utente, gia' registrato"});
});