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


}
