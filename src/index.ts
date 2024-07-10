import express, { Request, Response } from "express";
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
  if (!req.body.email)
    return res.status(400).json({ message: "Missing email" });
  if (!req.body.password)
    return res.status(400).json({ message: "Missing password" });
  const success = dubito.register(req.body.email, req.body.password);
  if (success)
    return res.status(200).json({ message: "Registrazione avvenuta" });
  return res.status(400).json({ message: "Utente già esistente" });
});
app.post("/api/auth/login", function (req, res) {
  if (!req.body.email)
    return res.status(400).json({ message: "Missing email" });
  if (!req.body.password)
    return res.status(400).json({ message: "Missing password" });
  const success = dubito.login(req.body.email, req.body.password);
  if (success === false)
    return res.status(400).json({ message: "Login fallito" });
  return res.status(200).json({ message: "Login avvenuto", token: success });
});
app.post("/api/auth/logout", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Invalid token" });
  const success = dubito.logout(parseInt(req.headers.authorization));
  if (success === false)
    return res.status(400).json({ message: "Logout fallito" });
  return res.status(200).json({ message: "Logout avvenuto", token: success });
});

app.get("/api/users", function (req, res) {
  return res.json(dubito.getUsers());
});
app.get("/api/users/:primaryKey", function (req, res) {
  const userFound = dubito.getUserbyUserID(parseInt(req.params.primaryKey));
  if (!!userFound) return res.json(userFound);
  return res.status(404).json({ message: "Not found" });
});
app.delete("/api/users", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  if (!req.body.password)
    return res.status(400).json({ message: "Missing password" });
  const success = dubito.deleteAccount(
    parseInt(req.headers.authorization),
    req.body.password
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});
app.get("/api/users/:primaryKey/purchased", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  const success = dubito.listadsPurchased(
    parseInt(req.headers.authorization)
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});
app.get("/api/users/:primaryKey/sold", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  const success = dubito.listadsSold(
    parseInt(req.headers.authorization)
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});
app.patch("/api/users", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  if (!req.body.username)
    return res.status(400).json({ message: "Missing username" });
  const success = dubito.editUsername(
    req.body.username,
    parseInt(req.headers.authorization)
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});

app.get("/api/ads", function (req: Request, res) {
  if (!!req.query.price && !!req.query.category && !!req.query.meters) {
    return res.json(
      dubito.listFiltred(
        parseInt(req.query.price.toString()),
        req.query.category.toString(),
        new Date(),
        parseInt(req.query.meters.toString())
      )
    );
  }
  return res.json(dubito.getAds());
});
app.get("/api/ads/:primaryKey", function (req, res) {
  const adFound = dubito.adDetails(parseInt(req.params.primaryKey));
  if (!!adFound) return res.json(adFound);
  return res.status(404).json({ message: "Not found" });
});
app.post("/api/ads", function (req: Request, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Invalid token" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.description)
    return res.status(400).json({ message: "Invalid description" });
  if (!req.body.price)
    return res.status(400).json({ message: "Invalid price" });
  if (!req.body.status)
    return res.status(400).json({ message: "Invalid status" });
  if (!req.body.category)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.phone)
    return res.status(400).json({ message: "Invalid phone" });
  if (!req.body.urlForImage)
    return res.status(400).json({ message: "Invalid urlImage" });
  const success = dubito.createAd(
    req.body.title,
    req.body.description,
    parseInt(req.body.price),
    req.body.status,
    req.body.category,
    req.body.phone,
    req.body.urlImage,
    parseInt(req.headers.authorization)
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});
app.put("/api/ads", function (req: Request, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Invalid token" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.id) return res.status(400).json({ message: "Invalid ID" });
  if (!req.body.description)
    return res.status(400).json({ message: "Invalid description" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  const success = dubito.editAd(
    req.body.id,
    req.body.title,
    req.body.description,
    parseInt(req.body.price),
    req.body.status,
    req.body.category,
    req.body.phone,
    req.body.urlImage,
    parseInt(req.headers.authorization)
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});
app.delete("/api/ads", function (req: Request, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Invalid token" });
  if (!req.body.id) return res.status(400).json({ message: "Invalid ID" });
  const success = dubito.deleteAd(
    req.body.id,
    parseInt(req.headers.authorization)
  );
  if (success) return res.json({ messge: "Success" });
  return res.json({ messge: "Failed" });
});
app.patch("/api/ads", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Invalid token" });
  if (!req.body.id) return res.status(400).json({ message: "Invalid ID" });
  if (!req.body.keyUser)
    return res.status(400).json({ message: "Invalid User ID" });
  if (req.query.action == "sold") {
    const success = dubito.markSold(
      req.body.id,
      parseInt(req.headers.authorization),
      req.body.keyUser
    );
    if (success) return res.json({ messge: "Success" });
    return res.json({ messge: "Failed" });
  }
  if (req.query.action == "bought") {
    const success = dubito.markBought(
      parseInt(req.headers.authorization),
      req.body.id
    );
    if (success) return res.json({ messge: "Success" });
    return res.json({ messge: "Failed" });
  }
  return res.json({ messge: "Invalid action" });
});
app.get("/api/ads/:primaryKey/interestedusers", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Invalid token" });
  if (!req.query.primaryKey)
    return res.status(400).json({ message: "Invalid ID" });
  if (req.query.action == "sold") {
    const success = dubito.getInterestedusersOfAd(
      parseInt(req.headers.authorization),
      parseInt(req.query.primaryKey.toString())
    );
    if (!!success) return res.json(success);
    return res.json({ messge: "Failed" });
  }
  if (req.query.action == "bought") {
    const success = dubito.markBought(
      parseInt(req.headers.authorization),
      req.body.id
    );
    if (success) return res.json({ messge: "Success" });
    return res.json({ messge: "Failed" });
  }
  return res.json({ messge: "Invalid action" });
});

app.get("/api/users/:primaryKey/favorites", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  const favorites = res.json(dubito.listFavourites(parseInt(req.headers.authorization)));
  if(!!favorites) return res.status(200).json(favorites);
  return res.status(400).json({ message: "Failed" });
});
app.get("api/favorites", function (req, res) {
  return res.json(dubito.getFavorites());
});
app.delete("api/favorites", function (req, res) {
  if (!req.body.id) return res.status(400).json({ message: "Missing ID" });
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  const result = dubito.removeFavourite(
    req.body.id,
    parseInt(req.headers.authorization)
  );
  if (result) return res.status(200).json({ message: "Success" });
  return res.status(400).json({ message: "Failed" });
});

app.post("api/devices", function (req, res) {
  if (!req.body.idDevice)
    return res.status(400).json({ message: "Missing ID" });
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  if (!req.body.name) return res.status(400).json({ message: "Missing name" });
  const result = dubito.registerDevice(
    req.body.idDevice,
    parseInt(req.headers.authorization),
    req.body.name
  );
  if (result) return res.status(200).json({ message: "Success" });
  return res.status(400).json({ message: "Failed" });
});
app.delete("api/devices", function (req, res) {
  if (!req.body.idDevice)
    return res.status(400).json({ message: "Missing ID" });
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Missing authorization" });
  const result = dubito.removeDevice(
    req.body.idDevice,
    parseInt(req.headers.authorization)
  );
  if (result) return res.status(200).json({ message: "Success" });
  return res.status(400).json({ message: "Failed" });
});

app.post("/api/reviews", function (req, res) {
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.description)
    return res.status(400).json({ message: "Invalid description" });
  if (!req.body.rating)
    return res.status(400).json({ message: "Invalid rating" });
  if (!req.body.referenceKeyAd)
    return res.status(400).json({ message: "Invalid ID" });
  if (!req.headers.authorization) return res.json({ message: "Missing token" });
  const success = dubito.addReview(
    req.body.title,
    req.body.description,
    parseInt(req.body.rating),
    parseInt(req.body.referenceKeyAd),
    parseInt(req.headers.authorization)
  );
  if (success) return res.status(200).json({ message: "Success" });
  return res.status(400).json({ message: "Failed" });
});
app.put("/api/reviews", function (req, res) {
  if (!req.body.title)
    return res.status(400).json({ message: "Invalid title" });
  if (!req.body.description)
    return res.status(400).json({ message: "Invalid description" });
  if (!req.body.rating)
    return res.status(400).json({ message: "Invalid rating" });
  if (!req.body.referenceKeyAd)
    return res.status(400).json({ message: "Invalid ID" });
  if (!req.headers.authorization) return res.json({ message: "Missing token" });
  const success = dubito.editReview(
    req.body.referenceKeyAd,
    req.body.title,
    req.body.description,
    parseInt(req.body.rating),
    parseInt(req.headers.authorization)
  );
  if (success) return res.status(200).json({ message: "Success" });
  return res.status(400).json({ message: "Failed" });
});
app.delete("/api/reviews", function (req, res) {
  if (!req.body.referenceKeyAd)
    return res.status(400).json({ message: "Invalid ID" });
  if (!req.headers.authorization) return res.json({ message: "Missing token" });
  const success = dubito.deleteReview(
    parseInt(req.headers.authorization),
    parseInt(req.body.referenceKeyAd)
  );
  if (success) return res.status(200).json({ message: "Success" });
  return res.status(400).json({ message: "Failed" });
});

app.listen(3000, () => {
  console.log("Server is running on localhost:3000");
});
