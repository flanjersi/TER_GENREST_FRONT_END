
/**
 * Model of an Actuator
 */
export  class  Actuator {
  public  id: number;
  public  latitude: number;
  public  longitude: number;
  public  model: string;
  public  brand: string;
  public  reference: string;
  public  state: string;

  constructor(data?: any){

    if (data) {
      this.id = data.id;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.model = data.model;
      this.brand = data.brand;
      this.reference = data.reference;
      this.state = data.state;
    }
  }

  toJson()  {
    return {
      id: new Number(this.id),
      latitude: new Number(this.latitude),
      longitude: new Number(this.longitude),
      model: new String(this.model),
      brand: new String(this.brand),
      reference: new String(this.reference),
      state: new String(this.state)
    } 
  }

  toJsonShowed() : any{
    return [
      {
        title: "Actuator"
      },
      {
      brand: new String(this.brand),
      model: new String(this.model),
      reference: new String(this.reference),
      latitude: new Number(this.latitude),
      longitude: new Number(this.longitude),
      state: new String(this.state)
    }]
  }

}
