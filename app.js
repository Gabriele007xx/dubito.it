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
  markSold(primaryKeyAd, token) {
    //metti annuncio come venduto
  }

  listFiltred(prezzo, categoria, data, meters) {
    //lista filtrata degli annunci in base alla query
  }
  adDetails(primaryKeyAd) {
    //dettagli dell'annuncio 
  }
  listAdsSold(primaryKeyAd) {
    //lista annunci venduti da una persona
  }

  listAdsPurchased(primaryKeyAd) {
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
