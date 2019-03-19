/**
 * Model of an Building
 */
import {Floor} from "./Floor";
import {Address} from "./Address";

export  class Building {
  public id: number;
  public address: Address;
  public type: string;
  public floors: Floor[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.address = new Address(data.address);
      this.type = data.type;
      this.floors = [];

      if(data.floors){
        data.floors.forEach(floor => {
          this.floors.push(new Floor(floor));
        });
      }

    }
  }

  toJsonShowed() : any{
    return [
      {
        title: "Building"
      },
      {
      type: this.type,
      country: this.address.country,
      city: this.address.city,
      street: this.address.street
    }
    ]
  }
}
