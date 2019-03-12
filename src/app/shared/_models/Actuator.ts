
/**
 * Model of an Actuator
 */
export  class  Actuator {
  public  id: number;
  public  latitude: number;
  public  longitude: number;
  public  model: string;
  public  brand: string;
  public  state: string;

  constructor(data?: any){

    if (data) {
      this.id = data.id;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.model = data.model;
      this.brand = data.brand;
      this.state = data.state;
    }
  }

}
