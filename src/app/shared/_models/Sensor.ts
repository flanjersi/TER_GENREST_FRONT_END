
/**
 * Model of an Sensor
 */

export class  Sensor {

  public  id: number;
  public  latitude: number;
  public  longitude: number;
  public  model: string;
  public  name: string;
  public  quantityKind: string;
  public  unitData: string;


  constructor(data?: any){

    if(data) {
      this.id = data.id;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.model = data.model;
      this.quantityKind = data.quantityKind;
      this.unitData = data.unitData;
      this.name = data.name;
    }
  }

  toJson()  {
    return {
      id: new Number(this.id),
      latitude: new Number(this.latitude),
      longitude: new Number(this.longitude),
      model: new String(this.model),
      name: new String(this.name),
      quantityKind: new String(this.quantityKind),
      unitData: new String(this.unitData)
    } 
  }

  toJsonShowed() : any{
    return [ {
        title: "Sensor"
      },
      {
        name: new String(this.name),
        model: new String(this.model),
        quantityKind: new String(this.quantityKind),
        unitData: new String(this.unitData),
        latitude: new Number(this.latitude),
        longitude: new Number(this.longitude)
      }]

  }

  toJsonLdShowed() : any {
    return {
        "@type": "ssn:Sensor",
        "@id": "sensor" + this.id,
        "geo:lat": this.latitude,
        "geo:long": this.longitude,
        "rdfs:label": this.model,
        "qu:QuantityKind": this.quantityKind,
        "qu:Unit": this.unitData,
        }
  }
}
