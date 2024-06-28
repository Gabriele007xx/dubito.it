class Marketplace {
  users = [];
  ads = [];
  reviews = [];
  auth = [];

  register(email, password) {
    // registrazione account
    function OnFind(user)
    {
        if(user.email == email)
        {
            return true;
        }
        return false;
    }
    const user = this.users.find(OnFind);
    if(!!user)
    {
        console.log("utente già registrato");
    }
    else
    {
        let newUser = new User(email, password);
        this.users = [...this.users, newUser];
    }
  }
  login(email, password) {
    function OnFind(user)
    {
        if(user.email == email && user.password == password)
        {
            return true;
        }
        return false;
    }
const userFound = this.users.find(OnFind);


    
    if(!!userFound) // se esiste
    {
      if(userFound.devices.lenght >= 2)
        {
        
        const authFound = this.getAuthByUserID(userFound.primaryKey);
        if(!!authFound)
        {
           console.log("Gia' autenticato"); 
        }
        else
        {
            const newAuth = new Auth(userFound.primaryKey);
            this.auth = [...this.auth, newAuth];
            return newAuth.getToken();
        }

    }
    else
    {
    console.log("Troppi devices");
    }
   
  }
  else
  {
    console.log("email/password sbagliati");
  }
}

  logout(token) {
    //uscire dall'account
    //controlla se il token esiste
    const authFound = this.getAuthByToken(token);
  
  if(!!authFound)
  {

      this.auth = this.auth.filter(function(){
          if(auth.getToken() == token)
          {
              return false;
          } 
          return true;
      });
      console.log("Logout effettuato con successo");
  }
  else
  {
      console.log("token non valido");
  }
  }

  createAd(
    primaryKeyAd,
    title,
    description,
    price,
    status,
    category,
    phone,
    urlForImage,
    token
  ) {
    //crea un'annuncio
  }

  editAd(
    primaryKeyAd,
    title,
    description,
    price,
    status,
    category,
    phone,
    urlForImage,
    token
  ) {
    // modificare un'annuncio
  }

  deleteAd(primaryKeyAd, token) {
    //elimina un'annuncio
  }

  addReview(title, description, rating, referenceKeyAds, token) {
    //crea recensione
  }

  editReview(primaryKeyReview, title, description, rating, token) {
    //modifica recensione
  }

  deleteReview(primaryKeyReview, token) {
    //elimina recensione
  }

  deleteAccount(token, password) {
    //elimina account
  }

  editUsername(newUsername, token) {
    // modifica username
  }
  markSold(primaryKeyAd, token, referenceKeyUserPuchased) {
    //metti annuncio come venduto
  }

  listFiltred(prezzo, categoria, data, meters) {
    //lista filtrata degli annunci in base alla query
  }
  adDetails(primaryKeyAd) {
    //dettagli dell'annuncio 
  }
  listAdsSold(token) {
    //lista annunci venduti da una persona
  }

  listAdsPurchased(token) {
    // annunci comprati da una persona
  }

  listFavourites(token) {
    // lista preferiti personali
  }

  addFavourite(primaryKeyAd, token) {
    //aggiungi preferiti un preferito
  }

  removeFavourite(primaryKeyAd, token) {
    // rimuovi dai preferiti un preferito
  }
  getPhoneNumber(token, referenceKeyAd)
  {
    // rivela il numero di telefono dell'annuncio
  }
  getInterestedUsersOfAd()
  {
    // lista dei utenti interessati all'annuncio
  }
  getListOfPendingPurchasesToBeConfirmedOfUser(token)
  {
    // lista dei annunci in attesa du essere confermati di un eutente
  }
  markBought(token, referenceKeyAd)
  {
      // segna come comprato
  }
  registerDevice(id, token)
{
    function OnFind(element)
    {
        if(user.email == email)
        {
            return true;
        }
        return false;
    }
    const user = this.users.find(OnFind);    
}
getAuthByToken(token)
{
   return this.auth.find(function(auth){
    if(auth.getToken()== token)
    {
        return true;
    }    
    return false;
});
}
getAuthByUserID(id)
{ 
return this.auth.find(function (auth) {
{   
    if(auth.referenceKeyUser == id)
    {
        return true;
    }
    return false;
}});
}
}

class User {
  constructor(email, password) {
    this.username = email.split("@").at(0);
    this.email = email;
    this.password = password;
    this.primaryKey = Math.random();
  }
}

class Ads {
  constructor(
    title,
    description,
    price,
    status,
    referenceKeyUser,
    category,
    phone,
    urlForImage
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.date = new Date();
    this.status = status;
    this.referenceKeyUser = referenceKeyUser;
    this.sold = false;
    this.category = category;
    this.primaryKey = Math.random();
    this.phone = phone;
    this.lead = [];
    this.urlForImage = urlForImage;
    this.referenceKeyUserPuchased = null;
  }
}

class Review {
  constructor(referenceKeyUser, title, description, rating, referenceKeyAds) {
    this.referenceKeyUser = referenceKeyUser;
    this.time = new Date();
    this.description = description;
    this.rating = rating;
    this.title = title;
    this.referenceKeyAds = referenceKeyAds;
    this.primaryKey = Math.random();
  }
}

class Auth {
  constructor(referenceKeyUser) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.token = Math.random()*10000000;
  }
  getToken()
  {
    return this.token;
  }
}

class Reports {
  constructor(referenceKeyAds, referenceKeyUser) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
    this.description = description;
    this.status = false;
  }
}

class Favourite {
  constructor() {
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
    this.primaryKey = Math.random();
  }
}
class Device
{
    constructor(referenceKeyUser, name)
    {
        this.primaryKey = Math.random();
        this.referenceKeyUser = referenceKeyUser;
        this.name = name;
    }
  }
