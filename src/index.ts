import express from "express";
import { Marketplace } from "./app";
import { routerUsers } from "./routes/users";
import { routerAuth } from "./routes/auth";

export const dubito = new Marketplace();
dubito.register("ueididi@kfif.it", "1234");

const app = express();
const server = express.json();

app.use(server);

app.get("/", function(req, res){
  res.status(200).sendFile(__dirname + "/index.html");
  
});
app.post("/api/users/register", function(req, res){
  if(!req.body.email) return res.status(400).send("Missing email");
  if(!req.body.password) return res.status(400).send("Missing password");
  const result = dubito.register(req.body.email, req.body.password);
  if(result) return res.status(400).send("Registrazione fallita");
  return res.status(200).send("Registrazione avvenuta");
    
});
app.post("/api/users/login", function(req, res){
  
  if(!req.body.email) return res.status(400).send("Missing email");
  if(!req.body.password) return res.status(400).send("Missing password");
  const result = dubito.login(req.body.email, req.body.password);
  if(result) return res.status(400).send("Login fallito");
  return res.status(200).send("Login avvenuto");
    
});
app.get("/api/users", function(req, res){
  return res.json(dubito.getUsers());
    
});
app.get("/api/users/:primaryKey", function(req, res){
  //return res.json(dubito.getUsers());
    
});
app.get("/api/ads", function(req, res){
  return res.json(dubito.getAds());
    
});
app.get("/api/ads/:primaryKey", function(req, res){
  return res.json(dubito.adDetails(parseInt(req.params.primaryKey)));
    
});

app.get("/api/users/:primaryKey/favorites", function(req, res){
  return res.json (dubito.listFavourites(parseInt(req.body.authorization)));
    
});

app.get("api/favorites", function(req, res){
  return res.json(dubito.getFavorites());
    
});

app.post("/devices/register", function(req, res){
  return res.json(dubito.registerDevice(req.body.idDevice, req.body.authorization, req.body.name));
    
});
app.delete("/devices/register", function(req, res){
  return res.json(dubito.registerDevice(req.body.idDevice, req.body.authorization, req.body.name));
    
});


app.listen(3000, ()=>{
  console.log("Server is running on localhost:3000");
});

