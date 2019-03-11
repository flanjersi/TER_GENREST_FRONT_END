/**
 * Model of an Project
 */
export class Project {
  public id: number;

  public projectName: string;

  constructor(data?: any){
    if(data){
      this.id = data.id;
      this.projectName = data.projectName;
    }
  }
}
