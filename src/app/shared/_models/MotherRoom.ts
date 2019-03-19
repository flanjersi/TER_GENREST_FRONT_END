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

  toJson()  {
    return {
      id: new Number(this.id),
      type: new String(this.type),
      numberMotherRoom: new Number(this.numberMotherRoom),
      rooms: this.corridorsToJson(),
      corridors: this.corridorsToJson()
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

  roomstoJson() {
    const roomsJson = [];

    if(!this.rooms) roomsJson;

    for(let index in this.rooms){
      roomsJson.push(this.rooms[index]);
    }

    return roomsJson;
  }

  toJsonShowed() : any{
    return [
    {
      title: "Zone"
    },
    {
      type: this.type,
      number: this.numberMotherRoom
    }]
  }
}
