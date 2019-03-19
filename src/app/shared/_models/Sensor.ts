
/**
 * Model of an Sensor
 */

export class  Sensor {

  public  id: number;
  public  latitude: number;
  public  longitude: number;
  public  model: string;
  public  brand: string;
  public  reference: string;
  public  state: string;
  public  unitData: string;

  constructor(data?: any){

    if(data) {
      this.id = data.id;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.model = data.model;
      this.brand = data.brand;
      this.reference = data.reference;
      this.state = data.state;
      this.unitData = data.unitData;
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
      state: new String(this.state),
      unitData: new String(this.unitData)
    } 
  }
}
