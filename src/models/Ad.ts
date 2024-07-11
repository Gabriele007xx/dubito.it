import { User } from "./User";

export class Ad {
    title:string;
      description:string;
      price:number;
      status:string;
      referenceKeyUser:User["primaryKey"];
      category:string;
      phone:string;
      urlForImage:string;
      date:Date;
      primaryKey:string;
      potentialBuyer:string;
      referenceKeyUserPuchased:User["primaryKey"];
      lead:Array<string> = [];
    constructor(
      obj: {
      title:string,
      description:string,
      price:number,
      status:string,
      referenceKeyUser:User["primaryKey"],
      category:string,
      phone:string,
      urlForImage:string
      }
    ) {
      this.title = obj.title;
      this.description = obj.description;
      this.price = obj.price;
      this.date = new Date();
      this.status = obj.status;
      this.referenceKeyUser = obj.referenceKeyUser;
      this.category = obj.category;
      this.primaryKey = Math.random().toString();
      this.phone = obj.phone;
      this.urlForImage = obj.urlForImage;
      this.referenceKeyUserPuchased = "";
      this.potentialBuyer = "";
    }
  }