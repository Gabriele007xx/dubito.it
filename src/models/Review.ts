import { User } from "./User";
import { Ad } from "./Ad";

export class Review {
    referenceKeyUser:User["primaryKey"];
    time:Date;
    description:string;
    rating:number;
    title:string;
    referenceKeyAd:Ad["primaryKey"];
    primaryKey:number;
    constructor(referenceKeyUser:number, title:string, description:string, rating:number, referenceKeyAd:number) {
      this.referenceKeyUser = referenceKeyUser;
      this.time = new Date();
      this.description = description;
      this.rating = rating;
      this.title = title;
      this.referenceKeyAd = referenceKeyAd;
      this.primaryKey = Math.random();
    }
  }