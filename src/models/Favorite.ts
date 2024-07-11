import { User } from "./User";
import { Ad } from "./Ad";

export class Favourite {
    referenceKeyUser:User["primaryKey"];
    referenceKeyAd:Ad["primaryKey"];
    primaryKey:string;
    constructor(referenceKeyUser:User["primaryKey"], referenceKeyAd:Ad["primaryKey"]) {
      this.referenceKeyUser = referenceKeyUser;
      this.referenceKeyAd = referenceKeyAd;
      this.primaryKey = Math.random().toString();
    }
  }
  