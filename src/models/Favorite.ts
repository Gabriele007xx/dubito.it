import { User } from "./User";
import { Ad } from "./Ad";

export class Favourite {
    referenceKeyUser:User["primaryKey"];
    referenceKeyAd:Ad["primaryKey"];
    primaryKey:number;
    constructor(referenceKeyUser:number, referenceKeyAd:number) {
      this.referenceKeyUser = referenceKeyUser;
      this.referenceKeyAd = referenceKeyAd;
      this.primaryKey = Math.random();
    }
  }
  