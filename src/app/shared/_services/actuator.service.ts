import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actuator} from '../_models/Actuator';
import {Observable} from 'rxjs';


@Injectable()
export class ActuatorService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Actuator> {
    return new Observable<Actuator>((observer) => {
      this.http.get<any>('api/actuators/' + id)
        .subscribe(
          (actuator) => observer.next(new Actuator(actuator)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }


  createActuatorInCorridor(idCorridor: number, actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.put('api/corridors/' + idCorridor + '/actuators', JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateActuator(actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.post('api/actuators/' + actuator.id, JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteActuatorInCorridor(idCorridors: number, idActuator: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/corridors/' + idCorridors + '/actuators/' + idActuator)
        .toPromise()
        .then(data => {
            resolve(data);
          },
          msg => {
            reject(msg);
          });
    });
  }

  createActuatorInRoom(idRoom: number, actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.put('api/rooms/' + idRoom + '/actuators', JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }



  deleteActuatorInRoom(idRoom: number, idActuator: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/rooms/' + idRoom + '/actuators/' + idActuator)
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
