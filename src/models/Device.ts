import { User } from "./User";

export class Device
{
  primaryKey:number;
  id:number;
  referenceKeyUser:User["primaryKey"];
  name:string;
    constructor(referenceKeyUser:number, name:string, id:number)
    {
        this.primaryKey = Math.random();
        this.id = id;
        this.referenceKeyUser = referenceKeyUser;
        this.name = name;
    }
  }