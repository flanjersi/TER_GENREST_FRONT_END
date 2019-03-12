import {Corridor} from "./Corridor";
import {Room} from "./Room";

export  class MotherRoom {
  public id: number;
  public type: string;
  public numberMotherRoom: number;

  public rooms: Room[];
  public corridors: Corridor[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.numberMotherRoom = data.numberMotherRoom;
      this.type = data.type;


      this.corridors = [];

      if (data.corridors) {
        data.corridors.forEach(corridor => {
          this.corridors.push(new Corridor(corridor));
        });
      }

      this.rooms = [];

      if (data.rooms){
        data.rooms.forEach( room => {
          this.rooms.push(new Room(room));
        });
      }




    }

  }
}
