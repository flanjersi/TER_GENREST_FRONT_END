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
}


