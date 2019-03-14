import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Project} from '../_models/Project';
import {id} from "@swimlane/ngx-graph/release/utils";
import {Observable} from 'rxjs';
import {User} from "../_models/User";

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  getById(id: number) : Observable<Project> {
    return new Observable<Project>((observer) => {
      this.http.get<any>('api/projects/' + id)
        .subscribe(
          (project) => observer.next(new Project(project)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  createProject(id: number, project: Project) {
    return new Promise((resolve, reject) => {
      this.http.put('api/users/' + id + '/projects', JSON.stringify(project), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Project(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  updateProject(idUser: number, project: Project) {
    return new Promise((resolve, reject) => {
      this.http.post('api/users/' + idUser + '/projects/' + project.id, JSON.stringify(project), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Project(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  deleteProject(id: number, idProject: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/users/' + id + '/projects/' + idProject)
        .toPromise()
        .then(data => {
            resolve(data);
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


