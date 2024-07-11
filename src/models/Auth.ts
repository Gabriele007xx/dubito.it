import { User } from "./User";

export class Auth {
    primaryKey:string;
    referenceKeyUser:User["primaryKey"];
    token:string;
    constructor(referenceKeyUser:User["primaryKey"]) {
      this.primaryKey = Math.random().toString();
      this.referenceKeyUser = referenceKeyUser;
      let tok =  Math.random()*10000000;
      this.token = tok.toString();
    }
    getToken()
    {
      return this.token;
    }
  }