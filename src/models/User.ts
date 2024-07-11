import { Device } from "./Device";

export class User {
    username:string;
    email:string;
    password:string;
    primaryKey:string;
    devices:Array<Device>= [];
  
    constructor(email:string, password:string) {
      this.username = email.split("@")[0];  
       /*  
      Il problema è l'errore 'Typescript: Type 'string | undefined' is not assignable to type 'string''.
      
      Da stackoverflow:
      You can now use the non-null assertion operator that is here exactly for your use case.
  
      It tells TypeScript that even though something looks like it could be null, it can trust you that it's not:
      */
      this.email = email;
      this.password = password;
      this.primaryKey = Math.random().toString();
      
    }
  }
  