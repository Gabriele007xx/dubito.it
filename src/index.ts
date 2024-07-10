import express, {Request, Response} from "express";
import { Marketplace } from "./app";

export const dubito = new Marketplace();
dubito.register("ueididi@kfif.it", "1234");

const app = express();
const server = express.json();

app.use(server);

app.get("/", function (req, res) {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.post("/api/auth/register", function (req, res) {
  if (!req.body.email) return res.status(400).json({message: "Missing email"});
  if (!req.body.password) return res.status(400).json({message: "Missing password"});
  const success = dubito.register(req.body.email, req.body.password);
  if (success)return res.status(200).json({message: "Registrazione avvenuta"});
  return res.status(400).json({message: "Utente già esistente"}); 
});
app.post("/api/auth/login", function (req, res) {
  if (!req.body.email) return res.status(400).json({message: "Missing email"});
  if (!req.body.password) return res.status(400).json({message: "Missing password"});
  const result = dubito.login(req.body.email, req.body.password);
  if (result) return res.status(400).json({message: "Login fallito"});
  return res.status(200).json({message: "Login avvenuto"});
});

app.get("/api/users", function (req, res) {
  return res.json(dubito.getUsers());
});
app.get("/api/users/:primaryKey", function (req, res) {
  const userFound = dubito.getUserbyUserID(parseInt(req.params.primaryKey));
  if (!!userFound) return res.json(userFound);
  return res.status(404).json({message: "Not found"});
});

app.get("/api/ads", function (req: Request, res) {
  return res.json(dubito.getAds());
});
app.get("/api/ads/:primaryKey", function (req, res) {
  const adFound = dubito.adDetails(parseInt(req.params.primaryKey));
  if (!!adFound) return res.json(adFound);
  return res.status(404).json({message: "Not found"});
});

app.get("/api/users/:primaryKey/favorites", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({message: "Missing authorization"});
  return res.json(dubito.listFavourites(parseInt(req.headers.authorization)));
});
app.get("api/favorites", function (req, res) {
  return res.json(dubito.getFavorites());
});
app.delete("api/favorites", function (req, res) {
  if (!req.body.id) return res.status(400).json({message: "Missing ID"});
  if (!req.headers.authorization)
    return res.status(400).json({message: "Missing authorization"});
  const result = dubito.removeFavourite(req.body.id, parseInt(req.headers.authorization));
  if (result) return res.status(200).json({message: "Success"});
  return res.status(400).json({message: "Failed"});
});

app.post("/devices/register", function (req, res) {
  if (!req.body.idDevice) return res.status(400).json({message: "Missing ID"});
  if (!req.headers.authorization)
    return res.status(400).json({message: "Missing authorization"});
  if (!req.body.name) return res.status(400).json({message: "Missing name"});
  const result = dubito.registerDevice(
    req.body.idDevice,
    parseInt(req.headers.authorization),
    req.body.name
  );
  if (result) return res.status(200).json({message: "Success"});
  return res.status(400).json({message: "Failed"});
});
app.delete("/devices/register", function (req, res) {
  if (!req.body.idDevice) return res.status(400).json({message:"Missing ID"});
  if (!req.headers.authorization)
    return res.status(400).json({message: "Missing authorization"});
  const result = dubito.removeDevice(req.body.idDevice, parseInt(req.headers.authorization));
  if (result) return res.status(200).json({message: "Success"});
  return res.status(400).json({message: "Failed"});
});

app.listen(3000, () => {
  console.log("Server is running on localhost:3000");
});
