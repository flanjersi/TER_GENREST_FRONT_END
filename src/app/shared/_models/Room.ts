import {Sensor} from "./Sensor";
import {Actuator} from "./Actuator";

export  class  Room {
  public id: number;
  public numberRoom: number;
  public type: string;

  public sensors: Sensor[];
  public actuators: Actuator[];


  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.numberRoom = data.numberRoom;
      this.type = data.type;
      this.sensors = [];
      if (data.sensors) {
        data.sensors.forEach(sensor => {
          this.sensors.push(new Sensor(sensor));
        });

      }

      this.actuators = [];

      if (data.actuators) {
        data.actuators.forEach(actuator => {
          this.actuators.push(new Actuator(actuator));
        });
      }
    }
  }

  toJson()  {
    return {
      id: new Number(this.id),
      type: new String(this.type),
      numberRoom: new Number(this.numberRoom),
      sensors: this.sensorsToJson(),
      actuators: this.actuatorstoJson()
    } 
  }

  sensorsToJson() {
    const sensorsJson = [];

    if(!this.sensors) sensorsJson;

    for(let index in this.sensors){
      sensorsJson.push(this.sensors[index]);
    }

    return sensorsJson;
  }

  actuatorstoJson() {
    const actuatorsJson = [];

    if(!this.actuators) actuatorsJson;

    for(let index in this.actuators){
      actuatorsJson.push(this.actuators[index]);
    }

    return actuatorsJson;
  }

  toJsonShowed() : any{
    return [ {
      title: "Room"
    },
      {
        type: this.type,
        number: this.numberRoom
      }]

  }

}


