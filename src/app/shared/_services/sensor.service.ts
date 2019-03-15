import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sensor} from '../_models/Sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}

  getById(id: number): Promise<Sensor> {
    return new Promise<Sensor>((resolve, reject) => {
      this.http.get('api/sensors/' + id)
        .toPromise()
        .then(res => {
            resolve(new Sensor(res));
          },
          msg => {
            reject(msg);
          });
    });
  }


  updateSensor(idCorridor: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/sensors/' + sensor.id, JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  createSensorInCorridor(idCorridor: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/corridors/' + idCorridor + '/sensors', JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }


  deleteSensorInCorridor(idCorridors: number, idSensor: number) {
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

  createSensorInRoom(idRoom: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/rooms/' + idRoom + '/sensors', JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }


  deleteSensorInRoom(idRoom: number, idSensor: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/rooms/' + idRoom + '/sensors/' + idSensor)
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
