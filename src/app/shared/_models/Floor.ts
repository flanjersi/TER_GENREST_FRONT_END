/**
 * Model of an Floor
 */
import {Zone} from "./Zone";
import {Corridor} from "./Corridor";

export  class  Floor {
  public  id: number;
  public  floorNumber: number;

  public zones: Zone[];
  public  corridors:  Corridor[];

  constructor(data?: any){
    if(data){
      this.id = data.id;
      this.floorNumber = data.floorNumber;

      this.zones = [];

      if(data.zones){
        data.zones.forEach(motherRoom => {
          this.zones.push(new Zone(motherRoom));
        });
      }

      this.corridors = [];

      if(data.corridors){
        data.corridors.forEach( corridor => {
          this.corridors.push(new Corridor(corridor));
        });
      }
    }
  }

    toJson()  {
      return {
        id: new Number(this.id),
        floorNumber: new Number(this.floorNumber),
        corridors: this.corridorsToJson(),
        motherRooms: this.motherRoomstoJson()
      } 
    }

    corridorsToJson() {
      const corridorsJson = [];

      if(!this.corridors) corridorsJson;
  
      for(let index in this.corridors){
        corridorsJson.push(this.corridors[index]);
      }

      return corridorsJson;
    }

    motherRoomstoJson() {
      const motherRoomsJson = [];

      if(!this.zones) motherRoomsJson;
  
      for(let index in this.zones){
        motherRoomsJson.push(this.zones[index]);
      }

      return motherRoomsJson;
    }

  toJsonShowed() : any{
    return [
    {
      title: "Floor"
    },
    {
      number: this.floorNumber
    }
    ]
  }

}
