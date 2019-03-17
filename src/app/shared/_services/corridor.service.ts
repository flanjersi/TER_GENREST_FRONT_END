import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Corridor} from '../_models/Corridor';
import {Observable} from 'rxjs';
import {Actuator} from '../_models/Actuator';
import {Sensor} from '../_models/Sensor';

@Injectable()
export class CorridorService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Corridor> {
    return new Observable<Corridor>((observer) => {
      this.http.get<any>('api/corridors/' + id)
        .subscribe(
          (corridor) => observer.next(new Corridor(corridor)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  updateCorridor(idMotherRoom: number, corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/corridors/' + corridor.id, JSON.stringify(corridor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Corridor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  createCorridorInFloor(idFloor: number, corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/floors/' + idFloor + '/corridors', JSON.stringify(corridor.toJson()), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Corridor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteCorridorInFloor(idFloor: number, idCorridor: number) {
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

  createCorridorInMotherRoom(idMotherRoom: number, corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/motherRooms/' + idMotherRoom + '/corridors', JSON.stringify(corridor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Corridor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteCorridorInMotherRoom(idMotherRoom: number, idCorridor: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/motherRooms/' + idMotherRoom + '/corridors/' + idCorridor)
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
