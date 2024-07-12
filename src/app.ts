import { User } from "./models/User";
import { Ad } from "./models/Ad";
import { Review } from "./models/Review";
import { Auth } from "./models/Auth";
import { Favourite } from "./models/Favorite";
import { Device } from "./models/Device";
import { DocAPI } from "./doc/DocAPI";

export class Marketplace {
  #users: Array<User> = [];
  #ads: Array<Ad> = [];
  #reviews: Array<Review> = [];
  #auth: Array<Auth> = [];
  #favorites: Array<Favourite> = [];

  register(email: string, password: string) {
    // registrazione account
    function OnFind(user: User) {
      if (user.email == email) {
        return true;
      }
      return false;
    }
    const user = this.#users.find(OnFind);
    if (!!user) {
      return false;
    } else {
      let newUser = new User(email, password);
      this.#users = [...this.#users, newUser];
      return true;
    }
  }
  login(email: string, password: string) {
    function OnFind(user: User) {
      if (user.email == email && user.password == password) {
        return true;
      }
      return false;
    }
    const userFound = this.#users.find(OnFind);

    if (!!userFound) {
      // se esiste
      if (userFound.devices.length < 2) {
        const authFound = this.getAuthByUserID(userFound.primaryKey);
        if (!!authFound) {
          return false;
        } else {
          const newAuth = new Auth(userFound.primaryKey);
          this.#auth = [...this.#auth, newAuth];
          return newAuth.getToken();
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  logout(token: Auth["token"]) {
    //uscire dall'account
    //controlla se il token esiste
    const authFound = this.getAuthByToken(token);

    if (!!authFound) {
      this.#auth = this.#auth.filter(function () {
        if (authFound.getToken() == token) {
          return false;
        }
        return true;
      });
      return true;
    } else {
      return false;
    }
  }

  createAd(
    obj : {
    title: string,
    description: string,
    price: number,
    status: string,
    category: string,
    phone: string,
    urlForImage: string,
    token: Auth["token"],
    referenceKeyUser: string
    }
  ) {
    //crea un'annuncio
    const authFound = this.getAuthByToken(obj.token);
    if (!authFound) {
      return false;
    } else {
      obj.referenceKeyUser = authFound.referenceKeyUser;
      const ad = new Ad(
       obj
      );
      this.#ads = [...this.#ads, ad];
      return true;
    }
  }

  editAd(
    obj : {
    primaryKeyAd: Ad["primaryKey"],
    title: string,
    description: string,
    price: number,
    status: string,
    category: string,
    phone: string,
    urlForImage: string,
    token: Auth["token"]
    }
  ) {
    // modificare un'annuncio
    const authFound = this.getAuthByToken(obj.token);

    if (!authFound) {
      return false;
    } else {
      this.#ads = this.#ads.map(function (ad) {
        if (ad.primaryKey == obj.primaryKeyAd) {
          return {
            ...ad,
            obj
          };
        }
        return { ...ad };
      });
      return true;
    }
  }

  deleteAd(primaryKeyAd: Ad["primaryKey"], token: Auth["token"]) {
    //elimina un'annuncio
    const authFound = this.getAuthByToken(token);

    if (!authFound) {
      return false;
    } else {
      this.#ads = this.#ads.filter(function (ad) {
        if (ad.primaryKey == primaryKeyAd) {
          return false;
        }
        return true;
      });
      return true;
    }
  }

  addReview(
    title: string,
    description: string,
    rating: number,
    referenceKeyAd: Ad["primaryKey"],
    token: Auth["token"]
  ) {
    //crea recensione
    const authFound = this.getAuthByToken(token);
    if (!!authFound) {
      const review = new Review(
        authFound.referenceKeyUser,
        title,
        description,
        rating,
        referenceKeyAd
      );
      this.#reviews = [...this.#reviews, review];
      return true;
    } else {
      return false;
    }
  }

  editReview(
    primaryKeyReview: Review["primaryKey"],
    title: string,
    description: string,
    rating: number,
    token: Auth["token"]
  ) {
    //modifica recensione
    const authFound = this.getAuthByToken(token);
    if (!!authFound) {
      const reviewFound = this.#reviews.find(function (rev) {
        return rev.primaryKey == primaryKeyReview;
      });
      if (!!reviewFound) {
        if (reviewFound.referenceKeyUser == authFound.referenceKeyUser) {
          this.#reviews = this.#reviews.map(function (review) {
            if (review.primaryKey == primaryKeyReview) {
              return {
                ...review,
                title: title,
                description: description,
                rating: rating,
              };
            }
            return { ...review };
          });
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  deleteReview(primaryKeyReview: Review["primaryKey"], token: Auth["token"]) {
    //elimina recensione
    const authFound = this.getAuthByToken(token);

    if (!authFound) {
      return true;
    } else {
      const reviewFound = this.#reviews.find(function (rev) {
        return rev.primaryKey == primaryKeyReview;
      });
      if (!!reviewFound) {
        if (reviewFound.referenceKeyUser == authFound.referenceKeyUser) {
          this.#reviews = this.#reviews.filter(function (review) {
            if (review.primaryKey == primaryKeyReview) {
              return false;
            }
            return true;
          });
          return true;
        } else {
          return false;
        }
      }
    }
  }

  deleteAccount(token: Auth["token"], password: string) {
    //elimina account
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      return false;
    } else {
      const userFound = this.getUserbyUserID(authFound.referenceKeyUser);
      if (!!userFound) {
        if (userFound.password == password) {
          this.#users = this.#users.filter(function (user) {
            if (user.primaryKey == authFound.referenceKeyUser) {
              return false;
            }
            return true;
          });
          this.logout(token);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  editUsername(newUsername: string, token: Auth["token"]) {
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      return false;
    } else {
      this.#users = this.#users.map(function (user) {
        if (user.primaryKey == authFound.referenceKeyUser) {
          return { ...user, username: newUsername };
        }
        return { ...user };
      });
      return true;
    }
  }
  markSold(
    primaryKeyAd: Ad["primaryKey"],
    token: Auth["token"],
    referenceKeyUserPuchased: User["primaryKey"]
  ) {
    //metti annuncio come venduto
    const auth = this.getAuthByToken(token);
    if (!!auth) {
      function OnFind(ad: Ad) {
        if (ad.primaryKey == primaryKeyAd) {
          return true;
        }
        return false;
      }
      const adFound = this.#ads.find(OnFind);
      if (!!adFound) {
        if (adFound.referenceKeyUser == auth.referenceKeyUser) {
          if (!adFound.referenceKeyUserPuchased) {
            this.#ads = this.#ads.map(function (ad) {
              if (ad.primaryKey == primaryKeyAd) {
                return {
                  ...ad,
                  referenceKeyUserPuchased: referenceKeyUserPuchased,
                };
              }
              return { ...ad };
            });
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  listFiltred(prezzo: number, categoria: string, data: Date, meters: number) {
    //lista filtrata degli annunci in base alla query
    return this.#ads.filter(function (ad: Ad) {
      if(ad.price <= prezzo && ad.category == categoria)
      {
        return true;
      }
      return false;
    });
  }
  adDetails(primaryKeyAd: Ad["primaryKey"]) {
    //dettagli dell'annuncio
    return this.#ads.find(function (ad) {
      if (ad.primaryKey == primaryKeyAd) {
        return true;
      }
      return false;
    });
  }
  listadsSold(token: Auth["token"]) {
    //lista annunci venduti da una stessa persona
    const auth = this.getAuthByToken(token);
    if (!!auth)
      return this.#ads.reduce(function (acc: Array<User["primaryKey"]>, ad) {
        if (
          auth.referenceKeyUser == ad.referenceKeyUser &&
          ad.referenceKeyUserPuchased != undefined
        ) {
          acc = [...acc, ad.primaryKey];
        }
        return acc;
      }, []);
    return undefined;
  }

  listadsPurchased(token: Auth["token"]) {
    // annunci comprati da una stessa persona
    const auth = this.getAuthByToken(token);
    if (!!auth)
      return this.#ads.reduce(function (acc: Array<User["primaryKey"]>, ad) {
        if (ad.referenceKeyUserPuchased == auth.referenceKeyUser) {
          acc = [...acc, ad.primaryKey];
        }
        return acc;
      }, []);
    return undefined;
  }

  listFavourites(token: Auth["token"]) {
    // lista preferiti personali
    const auth = this.getAuthByToken(token);
    if (!!auth)
      return this.#favorites.reduce(function (acc: Array<Favourite["primaryKey"]>, fav) {
        if (fav.referenceKeyUser == auth.referenceKeyUser) {
          acc = [...acc, fav.primaryKey];
        }
        return acc;
      }, []);
    else console.log("token non valido");
  }
  viewadsList(referenceKeyUser: number, token: Auth["token"]) {
    // lista annunci dello stesso utente
    const auth = this.getAuthByToken(token);
    if (!!auth)
      return this.#ads.reduce(function (acc: Array<Ad["primaryKey"]>, ad) {
        if (ad.referenceKeyUser == auth.referenceKeyUser) {
          acc = [...acc, ad.primaryKey];
        }
        return acc;
      }, []);
    else console.log("token non valido");
  }
  addFavourite(primaryKeyAd: Ad["primaryKey"], token: Auth["token"]) {
    //aggiungi ai preferiti un preferito
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      console.log("token non valido");
    } else {
      const NewFavorite = new Favourite(
        authFound.referenceKeyUser,
        primaryKeyAd
      );
      this.#favorites = [...this.#favorites, NewFavorite];
    }
  }

  removeFavourite(primaryKeyAd: Ad["primaryKey"], token: Auth["token"]) {
    // rimuovi dai preferiti un preferito
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      return false;
    } else {
      this.#favorites = this.#favorites.filter(function (favorite: Favourite) {
        if (favorite.referenceKeyAd == primaryKeyAd) {
          return false;
        }
        return true;
      });
      return true;
    }
  }

  getPhoneNumber(token: Auth["token"], referenceKeyAd: Ad["primaryKey"]) {
    // rivela il numero di telefono dell'annuncio
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      console.log("token non valido");
    } else {
      this.#ads = this.#ads.map(function (ad: Ad) {
        if ((ad.primaryKey = referenceKeyAd)) {
          let lead = [...ad.lead, authFound.referenceKeyUser];
          return { ...ad, lead: lead };
        }
        return { ...ad };
      });

      return this.#ads.find(function (ad: Ad) {
        if (ad.primaryKey == referenceKeyAd) {
          return true;
        }
        return false;
      })!.phone;
    }
  }
  getInterestedusersOfAd(token: Auth["token"], referenceKeyAd: Ad["primaryKey"]) {
    // lista dei utenti interessati all'annuncio
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      console.log("token non valido");
    } else {
      return this.#ads.find(function (ad: Ad) {
        if (ad.primaryKey == referenceKeyAd) {
          return true;
        }
        return false;
      })!.lead;
    }
  }
  getListOfPendingPurchasesToBeConfirmedOfUser(token: Auth["token"]) {
    // lista degli annunci in attesa du essere confermati di un utente
  }
  markBought(token: Auth["token"], referenceKeyAd: Ad["primaryKey"]) {
    // segna come comprato (da compratore)
    const authFound = this.getAuthByToken(token);
    if (!authFound) {
      return false;
    } else {
      const adFound = this.#ads.find(function (ad) {
        if (ad.primaryKey == referenceKeyAd) {
          return true;
        }
        return false;
      });
      if (!adFound) {
        return false;
      } else {
        if (adFound.potentialBuyer != undefined) {
          return false;
        } else {
          this.#ads.map(function (ad) {
            if (ad.primaryKey == referenceKeyAd) {
              return { ...ad, potentialBuyer: authFound.referenceKeyUser };
            }
            return { ...ad };
          });
          return true;
        }
      }
    }
  }
  registerDevice(id: Device["id"], token: Auth["token"], name: string) {
    const auth = this.getAuthByToken(token);
    if (!auth) {
      return false;
    } else {
      const user = this.getUserbyUserID(auth.referenceKeyUser);
      if (!!user) {
        if (user.devices.length <= 2) {
          this.#users = this.#users.map(function (userCurrent: User) {
            if (user.primaryKey == userCurrent.primaryKey) {
              userCurrent.devices = [
                ...userCurrent.devices,
                new Device(user.primaryKey, name, id),
              ];
            }
            return userCurrent;
          });

          return true;
        }
        return false;
      }
      return false;
    }
  }
  removeDevice(id: Device["id"], token: Auth["token"]) {
    const auth = this.getAuthByToken(token);
    if (!auth) {
      return false;
    } else {
      const user = this.getUserbyUserID(auth.referenceKeyUser);
      if (!!user) {
        const newDevices = user.devices.filter(function (device: Device) {
          if (device.id == id) {
            return false;
          }
          return true;
        });
        this.#users = this.#users.map(function (userCurrent: User) {
          if (user.primaryKey == userCurrent.primaryKey) {
            userCurrent.devices = [...newDevices];
          }
          return userCurrent;
        });

        return true;
      }
      return false;
    }
  }
  getAuthByToken(token: Auth["token"]) {
    return this.#auth.find(function (auth) {
      if (auth.getToken() == token) {
        return true;
      }
      return false;
    });
  }
  getAuthByUserID(id: User["primaryKey"]) {
    return this.#auth.find(function (auth: Auth) {
      {
        if (auth.referenceKeyUser == id) {
          return true;
        }
        return false;
      }
    });
  }
  getUserbyUserID(id: User["primaryKey"]) {
    function OnFind(user: User) {
      if (user.primaryKey == id) {
        return true;
      }
      return false;
    }
    return this.#users.find(OnFind);
  }
  getAds() {
    return this.#ads;
  }
  getUsers() {
    return this.#users;
  }
  getAuth() {
    return this.#auth;
  }
  getReviews() {
    return this.#reviews;
  }
  getFavorites() {
    return this.#favorites;
  }
}

const apis = {
  register: new DocAPI("auth/register", "POST", false),
  login: new DocAPI("auth/login", "POST", false),
  logout: new DocAPI("auth/logout", "POST", true),
  deleteAccount: new DocAPI("/users/{ID}", "DELETE", true),
  editUsername: new DocAPI("/users/{ID}", "PATCH", true),
  listadsSold: new DocAPI("/users/ads/sold", "GET", true),
  listadsPurchased: new DocAPI("/users/#ads/puchased", "GET", true),
  createAd: new DocAPI("/ads", "POST", true),
  editAd: new DocAPI("/ads/{ID}", "PUT", true),
  markSold: new DocAPI("/ads/{ID}", "PATCH", true),
  markBought: new DocAPI("/ads/{ID}", "PATCH", true),
  adDetails: new DocAPI("/ads/{ID}", "GET", false),
  viewadsList: new DocAPI("/ads", "GET", false),
  deleteAd: new DocAPI("/ads/{ID}", "DELETE", true),
  getInterestedusersOfAd: new DocAPI("/ads/{ID}/interestedusers", "GET", true),
  getListOfPendingPurchasesToBeConfirmedOfUser: new DocAPI(
    "#ads/{ID}/pendinglist",
    "GET",
    true
  ),
  addReview: new DocAPI("/reviews", "POST", true),
  editReview: new DocAPI("/reviews/", "PUT", true),
  deleteReview: new DocAPI("/reviews/", "DELETE", true),
  addFavorite: new DocAPI("/favorites", "POST", true),
  listfavorites: new DocAPI("/users/{ID}/favorites", "GET", true),
  removeFavorite: new DocAPI("/favorites", "DELETE", true),
  listFiltred: new DocAPI(
    "/ads/?category={category}&?price={price}&?meters={meters}",
    "GET",
    false
  ),
  registerDevice: new DocAPI("/devices/register", "POST", true),
};
