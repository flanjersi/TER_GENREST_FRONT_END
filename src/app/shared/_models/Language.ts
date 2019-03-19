import {Configuration} from "./Configuration";


export class Language {
  public id: number;

  public name: string;

  public configurationsAvailable: Configuration[];

  constructor(data?: any){
    if(data){
      this.id            = data.id;
      this.name          = data.name;
      this.configurationsAvailable = [];

      if(data.configurationsAvailable){
        const instance = this;

        data.configurationsAvailable.forEach(element => {
          instance.configurationsAvailable.push(new Configuration(element));
        })
      }

    }
  }
}
