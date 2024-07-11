import { User } from "./User";

export class Device
{
  primaryKey:string;
  id:number;
  referenceKeyUser:User["primaryKey"];
  name:string;
    constructor(referenceKeyUser:User["primaryKey"], name:string, id:number)
    {
        this.primaryKey = Math.random().toString();
        this.id = id;
        this.referenceKeyUser = referenceKeyUser;
        this.name = name;
    }
  }