import {Actuator} from "./Actuator";
import {Sensor} from "./Sensor";

/**
 * Model of an Corridor
 */
export  class  Corridor {
  public  id: number;
  public  name: number;

  public  sensors: Sensor[];
  public  actuators: Actuator[];


  constructor(data?: any){
    if (data){

      this.id = data.id;
      this.name = data.name;

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

  toJson()  {
    return {
      id: new Number(this.id),
      name: new String(this.name),
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
    return [
    {
      title: "Corridor"
    },
    {
      name: this.name
    }
    ]
  }


}
