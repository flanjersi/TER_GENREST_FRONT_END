import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Building} from '../_models/Building';
import {Observable} from 'rxjs';
import {Project} from '../_models/Project';


@Injectable()
export class BuildingService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Building> {
    return new Observable<Building>((observer) => {
      this.http.get<any>('api/buildings/' + id)
        .subscribe(
          (building) => observer.next(new Building(building)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  createBuilding(id: number, building: Building) {
    return new Promise((resolve, reject) => {
      this.http.put('api/projects/' + id + '/buildings', JSON.stringify(building), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Project(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateBuilding(idProject: number, building: Building) {
    return new Promise((resolve, reject) => {
      this.http.post('api/projects/' + idProject + '/buildings/' + building.id, JSON.stringify(building), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Building(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteBuilding(id: number, idBuilding: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/projects/' + id + '/buildings/' + idBuilding)
        .toPromise()
        .then(data => {
            resolve(data);
          },
          msg => {
            reject(msg);
          });
    });
  }
}
