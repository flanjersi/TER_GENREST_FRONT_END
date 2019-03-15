import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Floor} from '../_models/Floor';
import {Observable} from 'rxjs';
import {Project} from '../_models/Project';
import {Corridor} from '../_models/Corridor';


@Injectable()
export class FloorService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Floor> {
    return new Observable<Floor>((observer) => {
      this.http.get<any>('api/floors/' + id)
        .subscribe(
          (floor) => observer.next(new Floor(floor)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  createFloor(idBuilding: number, floor: Floor) {
    console.log(JSON.stringify(floor.toJson()));
    return new Promise((resolve, reject) => {
      this.http.put('api/buildings/' + idBuilding + '/floors', JSON.stringify(floor.toJson()), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Floor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateFloor(idBuilding: number, floor: Floor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/buildings/' + idBuilding + '/floors/' + floor.id, JSON.stringify(floor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Floor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteFloor(idBuilding: number, idFloor: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/buildings/' + idBuilding + '/floors/' + idFloor)
        .toPromise()
        .then(data => {
            resolve(data);
          },
          msg => {
            reject(msg);
          });
    });
  }

  createCorridor(idFloor: number, corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/floors/' + idFloor + '/corridors', JSON.stringify(corridor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Corridor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateCorridor(idFloor: number, corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/floors/' + idFloor + '/corridors/' + corridor.id, JSON.stringify(corridor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Corridor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteCorridor(idFloor: number, idCorridor: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/floors/' + idFloor + '/corridors/' + idCorridor)
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
