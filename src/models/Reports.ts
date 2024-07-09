import { User } from "./User";
import { Ad } from "./Ad";

export class Reports {
    primaryKey:number;
    referenceKeyUser:User["primaryKey"];
    referenceKeyAd:Ad["primaryKey"];
    description:string;
    closed:boolean;
    constructor(referenceKeyAd:number, referenceKeyUser:number, description:string) {
      this.primaryKey = Math.random();
      this.referenceKeyUser = referenceKeyUser;
      this.referenceKeyAd = referenceKeyAd;
      this.description = description;
      this.closed = false;
    }
  }