import { User } from "./User";

export class Auth {
    primaryKey:number;
    referenceKeyUser:User["primaryKey"];
    token:number;
    constructor(referenceKeyUser:number) {
      this.primaryKey = Math.random();
      this.referenceKeyUser = referenceKeyUser;
      this.token = Math.random()*10000000;
    }
    getToken()
    {
      return this.token;
    }
  }