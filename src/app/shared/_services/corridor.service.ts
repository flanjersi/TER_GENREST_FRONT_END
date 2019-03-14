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

  createActuator(id: number, actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.put('api/corridors/' + id + '/actuators', JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateActuator(idCorridor: number, actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.post('api/corridors/' + idCorridor + '/corridors/' + actuator.id, JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteActuator(idCorridors: number, idActuator: number) {
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

  createSensor(id: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/corridors/' + id + '/sensors', JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateSensor(idCorridor: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/corridors/' + idCorridor + '/sensors/' + sensor.id, JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteSensor(idCorridors: number, idSensor: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/corridors/' + idCorridors + '/sensors/' + idSensor)
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
