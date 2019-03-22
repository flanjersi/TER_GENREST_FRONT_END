
/**
 * Model of an Actuator
 */
export  class  Actuator {
  public  id: number;
  public  latitude: number;
  public  longitude: number;
  public  model: string;
  public  name: string;

  constructor(data?: any){

    if (data) {
      this.id = data.id;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.model = data.model;
      this.name = data.name;
    }
  }

  toJson()  {
    return {
      id: new Number(this.id),
      name: new String(this.name),
      model: new String(this.model),
      latitude: new Number(this.latitude),
      longitude: new Number(this.longitude)
    }
  }

  toJsonShowed() : any{
    return [
      {
        title: "Actuator"
      },
      {
        name: new String(this.name),
        model: new String(this.model),
        latitude: new Number(this.latitude),
        longitude: new Number(this.longitude)
    }]
  }

}
