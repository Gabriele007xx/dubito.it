import { User } from "./User";
import { Ad } from "./Ad";

export class Reports {
    primaryKey:string;
    referenceKeyUser:User["primaryKey"];
    referenceKeyAd:Ad["primaryKey"];
    description:string;
    closed:boolean;
    constructor(referenceKeyAd:Ad["primaryKey"], referenceKeyUser:User["primaryKey"], description:string) {
      this.primaryKey = Math.random().toString();
      this.referenceKeyUser = referenceKeyUser;
      this.referenceKeyAd = referenceKeyAd;
      this.description = description;
      this.closed = false;
    }
  }