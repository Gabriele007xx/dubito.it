class Marketplace {
  users = [];
  ads = [];
  reviews = [];
  auth = [];
  favorites = [];

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
    const authFound  = this.getAuthByToken(token);
  
      if (!authFound ) {
        console.log("token non valido");
      } else {
        this.ads = this.ads.map(function (ad)
      {
          if(ad.primaryKey == primaryKeyAd)
           {
            return {...ad, title: title, description: description, price: price, status: 
              status, category: category, phone: phone, urlForImage: urlForImage};
           }
           return {...ad};
      });
      }
  }

  deleteAd(primaryKeyAd, token) {
    //elimina un'annuncio
    const authFound  = this.getAuthByToken(token);
  
      if (!authFound ) {
        console.log("token non valido");
      } else {
        this.ads = this.ads.filter(function (ad)
      {
          if(ad.primaryKey == primaryKeyAd)
           {
            return false;
           }
           return true;
      });
      }
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
    const authFound = this.getAuthByToken(token);
    if (!!authFound) {
      const reviewFound = this.reviews.find(function (rev)
    {
      return rev.primaryKey == primaryKeyReview;
    });
    if(!!reviewFound)
      {
        if(reviewFound.referenceKeyUser == authFound.referenceKeyUser)
        {
          this.reviews = this.reviews.map(function (review)
        {
            if(review.primaryKey == primaryKeyReview)
             {
              return {...review, title: title, description: description, rating: rating};
             }
             return {...review};
        });
        }
        else
        {
          console.log("La recensione non e' tua");
        }
        
      }
      
    } else {
      console.log("Token non valido, impossibile modificare la recensione");
    }
  }

  deleteReview(primaryKeyReview, token) {
    //elimina recensione
    const authFound  = this.getAuthByToken(token);
  
      if (!authFound ) {
        console.log("token non valido");
      } else {
        const reviewFound = this.reviews.find(function (rev)
    {
      return rev.primaryKey == primaryKeyReview;
    });
    if(!!reviewFound)
      {
        if(reviewFound.referenceKeyUser == authFound.referenceKeyUser)
        {
          this.reviews = this.reviews.filter(function (review)
        {
            if(review.primaryKey == primaryKeyReview)
             {
              return false;
             }
             return true;
        });
        }
        else
        {
          console.log("La recensione non e' tua");
        }
       
      }
  }
}

  deleteAccount(token, password) {
    //elimina account
    const authFound  = this.getAuthByToken(token);
      if (!authFound ) {
        console.log("token non valido");
      } else {
        const userFound = this.getUserbyUserID(authFound.referenceKeyUser);
        if(userFound.password == password) 
          {
            this.users = this.users.filter(function (user)
            {
                if(user.primaryKey == authFound.referenceKeyUser)
                 {
                  return false;
                 }
                 return true;
            });
            this.logout(token);
          }
          else {
              console.log("Password non valida");
          }
        
      }
  }

  editUsername(newUsername, token) {
    const authFound  = this.getAuthByToken(token);
      if (!authFound ) {
        console.log("token non valido");
      } else {
        this.users = this.users.map(function(user){
          if(user.primaryKey == authFound.referenceKeyUser)
            {
              return {...user, username: newUsername};
            }
            return {...user};
        });
        
      }
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
    return this.ads.find(function (ad){
          if(ad.primaryKey == referenceKeyAd)
            {
              return true;
            }
            return false;
      });
  }
  listAdsSold(token) {
    //lista annunci venduti da una stessa persona
    const auth = this.getAuthByToken(token);
    return this.ads.reduce(function(acc, ad){
      if(auth.referenceKeyUser == ad.referenceKeyUser && ad.referenceKeyUserPuchased != undefined)
        {
          acc = [...acc, ad.primaryKey];
        }
        return acc;
    }, []);
  }

  listAdsPurchased(token) {
    // annunci comprati da una stessa persona
    const auth = this.getAuthByToken(token);
    return this.ads.reduce(function(acc, ad){
      if(ad.referenceKeyUserPuchased == auth.referenceKeyUser)
        {
          acc = [...acc, ad.primaryKey];
        }
        return acc;
    }, []);

  }

  listFavourites(token) {
    // lista preferiti personali
    const auth = this.getAuthByToken(token);
    return this.favorites.reduce(function(acc, fav){
      if(fav.referenceKeyUser == auth.referenceKeyUser)
        {
          acc = [...acc, fav.primaryKey];
        }
        return acc;
    }, []);
  }
  viewAdsList(referenceKeyUser)
  {
    // lista annunci di una persona
    const auth = this.getAuthByToken(token);
    return this.ads.reduce(function(acc, ad){
      if(ad.referenceKeyUser == auth.referenceKeyUser)
        {
          acc = [...acc, ad.primaryKey];
        }
        return acc;
    }, []);
  }
  addFavourite(primaryKeyAd, token) {
    //aggiungi ai preferiti un preferito
    const authFound  = this.getAuthByToken(token);
    if (!authFound ) {
      console.log("token non valido");
    } else {
      const NewFavorite = new Favourite(authFound.referenceKeyUser, primaryKeyAd);
      this.favorites = [...this.favorites, NewFavorite];
      
    }
  }

  removeFavourite(primaryKeyAd, token) {
    // rimuovi dai preferiti un preferito
    const authFound  = this.getAuthByToken(token);
    if (!authFound ) {
      console.log("token non valido");
    } else {
      this.favorites = this.favorites.filter(function (favorite)
      {
          if(favorite.primaryKeyAd == primaryKeyAd)
           {
            return false;
           }
           return true;
      });
      console.log("Preferito eliminato con successo");
      }
    }
  
  getPhoneNumber(token, referenceKeyAd)
  {
    // rivela il numero di telefono dell'annuncio
    const authFound  = this.getAuthByToken(token);
    if (!authFound ) {
      console.log("token non valido");
    } else {
      this.ads = this.ads.map(function(ad){
          if(ad.primaryKey = referenceKeyAd)
          {
            let lead = [...ad.lead, authFound.referenceKeyUser];
            return {...ad, lead: lead}; 
          }
          return {...ad};
      });
      return this.ads.find(function (ad){
          if(ad.primaryKey == referenceKeyAd)
            {
              return true;
            }
            return false;
      }).phone;
    }
  }
  getInterestedUsersOfAd(token, referenceKeyAd)
  {
    // lista dei utenti interessati all'annuncio
    const authFound  = this.getAuthByToken(token);
    if (!authFound ) {
      console.log("token non valido");
    } else {  
    return this.ads.find(function (ad){
          if(ad.primaryKey == referenceKeyAd)
            {
              return true;
            }
            return false;
      }).lead;
    }
  }
  getListOfPendingPurchasesToBeConfirmedOfUser(token)
  {
    // lista degli annunci in attesa du essere confermati di un utente
  }
  markBought(token, referenceKeyAd)
  {
      // segna come comprato (da compratore)
      const authFound = this.getAuthByToken(token);
      if(!authFound)
        {
          console.log("Token invalido");
        }
        else{
          const adFound = this.ads.find(function (ad){
          if(ad.primaryKey == referenceKeyAd)
                {
                  return true;
                }
                return false;
          });
          if(!adFound)
            {
              console.log("Annuncio non trovato");
            }
            else
            {
                if(adFound.potentialBuyer != undefined)
                  {
                    console.log("Gia' comprato");
                  }
                  else
                  {
                      this.ads.map(function (ad){
                        if(ad.primaryKey == referenceKeyAd)
                        {
                            return {...ad, potentialBuyer: authFound.referenceKeyUser};      
                        }
                        return {...ad};
                      });
                  }
            }
        }
  }
  registerDevice(id, token, name)
  {
    const auth = this.getAuthByToken(token);
    const user = this.getUserbyUserID(auth.referenceKeyUser);
    user.devices = [...user.devices, new Device(user.primaryKey, name, id)];
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
getUserbyUserID(id)
{
  function OnFind(user)
    {
        if(user.primaryKey == id)
        {
            return true;
        }
        return false;
    }
    return  this.users.find(OnFind);  
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
    this.potentialBuyer = undefined;
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
  constructor(referenceKeyUser, referenceKeyAds) {
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
