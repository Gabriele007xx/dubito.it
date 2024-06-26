class Marketplace {
  users = [];
  ads = [];
  reviews = [];
  auth = [];

  register(email, password) {
    // registrazione account
    let user = new User(email, password);
    this.users = [...this.users, user];
  }
  login(token, email, password) {
    // accedere all'account

    return this.users.find((el) => {
      if (el.email == email && el.password == password) {
        return true;
      } else {
        return false;
      }
    });
  }

  logout(token) {
    //uscire dall'account
  }

  createAds(
    title,
    description,
    price,
    status,
    referenceKeyUser,
    category,
    phone,
    urlForImage,
    token
  ) {
    //crea un'annuncio
  }

  editAds(
    title,
    description,
    price,
    status,
    referenceKeyUser,
    category,
    phone,
    urlForImage,
    token
  ) {
    // modificare un'annuncio
  }

  deleteAds(primaryKey, token) {
    //elimina un'annuncio
  }

  addReview(referenceKeyUser, title, description, rating, referenceKeyAds, token) {
    //crea recensione
  }

  editReview(referenceKeyUser, title, description, rating, referenceKeyAds, token) {
    //modifica recensione
  }

  deleteReview(primaryKey, token) {
    //elimina recensione
  }

  delitAccount(primaryKey, token) {
    //elimina account
  }

  editUsername(newUsername, primaryKey, token) {
    // modifica username
  }
  markSold(primaryKey, token) {
    //metti annuncio come venduto
  }

  listFiltred(prezzo, categoria, data, meters) {
    //lista filtrata degli annunci in base alla query
  }
  detailsAds(primaryKey) {
    //dettagli dell'annuncio 
  }
  listAdsSold(primaryKey) {
    //lista annunci venduti da una persona
  }

  listAdsPurchased(primaryKey) {
    // annunci comprati da una persona
  }

  listFavourites(primaryKey) {
    // lista preferiti 
  }

  addFavourite(primaryAds, primaryUser, token) {
    //aggiungi preferiti un preferito
  }

  removeFavourite(primaryKey, primaryUser, token) {
    // rimuovi dai preferiti un preferito
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
    this.urlForImage = urlForImage;
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
