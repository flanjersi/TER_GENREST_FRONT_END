import {Injectable} from '@angular/core';
import {User} from '../_models/User';
import {HttpClient} from '@angular/common/http';
import {Project} from "../_models/Project";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<User[]>('api/users')
        .toPromise()
        .then(
          res => {
            let users = [];
            res.map(user => users.push(new User(user)));
            resolve(users);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<User>{
    return new Promise<User>((resolve, reject) => {
      this.http.get('api/users/' + id)
        .toPromise()
        .then(res => {
            resolve(new User(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  getByEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('api/users/query?email=' + email)
        .toPromise()
        .then(res => {
            resolve(new User(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(user: User) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/users/', JSON.stringify(user), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(
          data => {
            resolve(data.id);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  update(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post('api/users/' + user.id, JSON.stringify(user), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new User(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/users/' + id)
        .toPromise()
        .then(data => {
            resolve(data);
          },
          msg => {
            reject(msg);
          })
    });
  }

  createProject(id: number, project: Project) {
    return new Promise((resolve, reject) => {
      this.http.put('api/users/' + id + "/projects", JSON.stringify(project), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Project(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  getAllProjects(id: number): Promise<Project[]>{
    return new Promise<Project[]>((resolve, reject) => {
      this.http.get<any>('api/users/' + id)
        .toPromise()
        .then(data => {
            let projects = [];

            data.projects.forEach(project => {
              projects.push(new Project(project));
            });

            resolve(projects);
          },
          msg => {
            reject(msg);
          });
    });
  }



}
