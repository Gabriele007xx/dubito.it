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
      primaryKey:number;
      potentialBuyer:number;
      referenceKeyUserPuchased:User["primaryKey"];
      lead:Array<number> = [];
    constructor(
      title:string,
      description:string,
      price:number,
      status:string,
      referenceKeyUser:number,
      category:string,
      phone:string,
      urlForImage:string
    ) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.date = new Date();
      this.status = status;
      this.referenceKeyUser = referenceKeyUser;
      this.category = category;
      this.primaryKey = Math.random();
      this.phone = phone;
      this.urlForImage = urlForImage;
      this.referenceKeyUserPuchased = NaN;
      this.potentialBuyer = NaN;
    }
  }