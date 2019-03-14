
import {Project} from "./Project";
/**
 * Model of an user
 */
export class User {
  public id: number;

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  public projects: Project[];

  constructor(data?: any){
    if(data){
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;

      this.projects = [];

      if(data.projects){
        data.projects.forEach(project => {
          this.projects.push(new Project(project));
        });
      }
    }
  }
}
