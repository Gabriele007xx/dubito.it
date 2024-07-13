import { User } from "./User";

export class Auth {
    primaryKey:string;
    referenceKeyUser:User["primaryKey"];
    token:string;
    constructor(referenceKeyUser:User["primaryKey"]) {
      this.primaryKey = Math.random().toString();
      this.referenceKeyUser = referenceKeyUser;
      let tok =  this.#generateToken(8);
      this.token = tok.toString();
    }
    getToken()
    {
      return this.token;
    }
    #generateToken(numberChars: number){
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < numberChars) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }
  
  }
