import {OperatingSystem} from "./OperatingSystem";


export class Configuration {
  public id: number;

  public name: string;

  public description: string;

  public pathFolder: string;

  public operatingsSystem: OperatingSystem[];

  constructor(data?: any){
    if(data){
      this.id          = data.id;
      this.name        = data.name;
      this.description = data.description;
      this.pathFolder  = data.pathFolder;

      this.operatingsSystem = [];

      if(data.operatingsSystem){
        const instance = this;

        data.operatingsSystem.forEach(element => {
          instance.operatingsSystem.push(new OperatingSystem(element));
        })
      }

    }
  }
}
