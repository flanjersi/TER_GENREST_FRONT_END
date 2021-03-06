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

  createJsonArrayFloors(): any{
    var tabFloors = [];
    this.floors.forEach(element => {
      
      tabFloors.push(element.toJsonLdShowed());
    });
    return tabFloors;
  }


  toJsonLdShowed() : any {
    
    return {
        "@type": "bot:Building",
        "@id": "Building" + this.id,
        "rdfs:label": this.type,
        "sch:address": this.address.toJsonLdShowedForAdress(),
        "bot:hasStorey": this.createJsonArrayFloors()
        }
  }



}
