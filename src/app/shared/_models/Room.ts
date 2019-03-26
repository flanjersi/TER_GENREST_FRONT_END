import {Sensor} from "./Sensor";
import {Actuator} from "./Actuator";

export  class  Room {
  public id: number;
  public name: string;
  public type: string;

  public sensors: Sensor[];
  public actuators: Actuator[];


  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
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
    return [ {
      title: "Room"
    },
      {
        type: this.type,
        name: this.name
      }]

  }

  createJsonArraySensor(): any{
    var tabSpace = [];
    this.sensors.forEach(element => {
      tabSpace.push(element.toJsonLdShowed());
    });
    return tabSpace;
  }

  createJsonArrayActuator(): any{
    var tabSpace = [];
    this.actuators.forEach(element => {
      tabSpace.push(element.toJsonLdShowed());
    });
    return tabSpace;
  }

  toJsonLdShowed() : any {
    
    return {
      "@type": ["bot:Space", "dog:Room"],
      "@id": "Room" + this.id,
      "rdfs:label": this.type,
      "bot:hasElement": this.createJsonArraySensor().concat(this.createJsonArrayActuator()),
    }
    


  }

}


