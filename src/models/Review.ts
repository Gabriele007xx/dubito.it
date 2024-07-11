import { User } from "./User";
import { Ad } from "./Ad";

export class Review {
    referenceKeyUser:User["primaryKey"];
    time:Date;
    description:string;
    rating:number;
    title:string;
    referenceKeyAd:Ad["primaryKey"];
    primaryKey:string;
    constructor(referenceKeyUser:User["primaryKey"], title:string, description:string, rating:number, referenceKeyAd:Ad["primaryKey"]) {
      this.referenceKeyUser = referenceKeyUser;
      this.time = new Date();
      this.description = description;
      this.rating = rating;
      this.title = title;
      this.referenceKeyAd = referenceKeyAd;
      this.primaryKey = Math.random().toString();
    }
  }