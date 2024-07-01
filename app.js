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
      if(userFound.devices.length < 2)
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
          if(authFound.getToken() == token)
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
    const authFound  = this.getAuthByToken(token);
  
      if (!authFound ) {
        console.log("token non valido");
      } else {
        const ad = new Ads(title,description, price, status,authFound.referenceKeyUser, category, phone, urlForImage);
        this.ads = [...this.ads, ad];
        console.log('annuncio creato con successo')
      }
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

  addReview(title, description, rating, referenceKeyAd, token) {
    //crea recensione
    const authFound = this.getAuthByToken(token);
    if (!!authFound) {
      const review = new Review(authFound.referenceKeyUser, title, description, rating, referenceKeyAd);
      this.reviews = [...this.reviews, review];
      console.log("Recensione creata con successo");
    } else {
      console.log("Token non valido, impossibile creare la recensione");
    }
      
    
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
    const auth = this.getAuthByToken(token);
    if(!!auth)
    {
      function OnFind(ad)
      {
        if(ad.primaryKey == primaryKeyAd)
        {
          return true;
        }
        return false;
      }
      const adFound = this.ads.find(OnFind);
      if(!!adFound)
      {
          if(adFound.referenceKeyUser == auth.referenceKeyUser)
          {
            if(!adFound.referenceKeyUserPuchased)
            {
                this.ads = this.ads.map(function(ad){
                  if(ad.primaryKey == primaryKeyAd)
                  {
                    return {...ad, referenceKeyUserPuchased: referenceKeyUserPuchased};
                  }
                    return {...ad};
                  });
                  console.log("Annuncio modificato");
            }
            else
            {
              console.log("Annuncio già venduto");
            }                     
          }
          else
          {
            console.log("Operazione non autorizzata.");
          }
      }
      else
      {
        console.log("Annuncio invalido");
      }
    }
    else
    {
      console.log("token non valido");
    }

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
  viewAdsList(referenceKeyUser)
  {
    // lista annunci di una persona
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
  getInterestedUsersOfAd(token, referenceKeyAd)
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
  registerDevice(id, token, name)
  {
    const auth = this.getAuthByToken(token);
    const user = this.getUserbyUserID(auth.referenceKeyUser);
    user.devices = [...user.devices, new Device(user.primaryKey, name, id)];
  }

}

class User {
  constructor(email, password) {
    this.username = email.split("@").at(0);
    this.email = email;
    this.password = password;
    this.primaryKey = Math.random();
    this.devices = [];
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
    this.category = category;
    this.primaryKey = Math.random();
    this.phone = phone;
    this.lead = [];
    this.urlForImage = urlForImage;
    this.referenceKeyUserPuchased = undefined;
  }
}

class Review {
  constructor(referenceKeyUser, title, description, rating, referenceKeyAd) {
    this.referenceKeyUser = referenceKeyUser;
    this.time = new Date();
    this.description = description;
    this.rating = rating;
    this.title = title;
    this.referenceKeyAd = referenceKeyAd;
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
    constructor(referenceKeyUser, name, id)
    {
        this.primaryKey = Math.random();
        this.id = id;
        this.referenceKeyUser = referenceKeyUser;
        this.name = name;
    }
  }
