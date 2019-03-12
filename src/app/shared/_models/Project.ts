/**
 * Model of an Project
 */
import {Building} from "./Building";

export class Project {
  public id: number;

  public projectName: string;

  public buildings: Building[];

  constructor(data?: any){
    if(data){
      this.id = data.id;
      this.projectName = data.projectName;
      this.buildings = [];
      if(data.buildings){
        data.buildings.forEach(building => {
          this.buildings.push(new Building(building));
        });
      }
    }
  }
}
