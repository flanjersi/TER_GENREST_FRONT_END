import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Building} from '../_models/Building';
import {Observable} from 'rxjs';


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
            resolve(data['id']);
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateBuilding(building: Building) {
    return new Promise((resolve, reject) => {
      this.http.post('api/buildings/' + building.id, JSON.stringify(building), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Building(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteBuilding(idProject: number, idBuilding: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/projects/' + idProject + '/buildings/' + idBuilding)
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
