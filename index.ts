import express from "express";
import { Marketplace } from "./app";
import { routerUsers } from "./routes/users";
import { routerAuth } from "./routes/auth";

export const dubito = new Marketplace();
dubito.register("ueididi@kfif.it", "1234");

const app = express();
const server = express.json();

app.use(server);

app.use("/", function(req, res){
    //res.status(200).sendFile(__dirname + "/index.html");
    return res.json([dubito.getUsers()]);
});

const routerApi = express.Router();
app.use("/api", routerApi);
// concatenazione di path
routerApi.use("/users", routerUsers);
routerApi.use("/auth", routerAuth);

app.listen(3000, ()=>{
  console.log("Server is running on localhost:3000");
});