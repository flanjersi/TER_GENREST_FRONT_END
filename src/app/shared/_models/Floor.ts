/**
 * Model of an Floor
 */
import {MotherRoom} from "./MotherRoom";
import {Corridor} from "./Corridor";

export  class  Floor {
  public  id: number;
  public  floorNumber: number;

  public motherRooms: MotherRoom[];
  public  corridors:  Corridor[];

  constructor(data?: any){
    if(data){
      this.id = data.id;
      this.floorNumber = data.floorNumber;

      this.motherRooms = [];

      if(data.motherRooms){
        data.motherRooms.forEach(motherRoom => {
          this.motherRooms.push(new MotherRoom(motherRoom));
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

      if(!this.motherRooms) motherRoomsJson;
  
      for(let index in this.motherRooms){
        motherRoomsJson.push(this.motherRooms[index]);
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
