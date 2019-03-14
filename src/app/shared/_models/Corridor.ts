import {Actuator} from "./Actuator";
import {Sensor} from "./Sensor";

/**
 * Model of an Corridor
 */
export  class  Corridor {
  public  id: number;
  public  numberCorridor: number;

  public  sensors: Sensor[];
  public  actuators: Actuator[];

  constructor(data?: any){
    if (data){

      this.id = data.id;
      this.numberCorridor = data.numberCorridor;

      this.sensors = [];

      if(data.sensors){
        data.sensors.forEach( sensor => {
          this.sensors.push( new Sensor(sensor));
          });

      }

      this.actuators = [];

      if(data.actuators){
        data.actuators.forEach(  actuator => {
          this.actuators.push( new Actuator(actuator));

        });

      }



    }




  }


}
