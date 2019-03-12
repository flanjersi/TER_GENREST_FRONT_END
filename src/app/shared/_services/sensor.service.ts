import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sensor} from "../_models/Sensor";

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}


  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<Sensor[]>('api/sensors')
        .toPromise()
        .then(
          res => {
            let sensors = [];
            res.map(sensor => sensors.push(new Sensor(sensor)));
            resolve(sensors);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<Sensor>{
    return new Promise<Sensor>((resolve, reject) => {
      this.http.get('api/sensors/' + id)
        .toPromise()
        .then(res => {
            resolve(new Sensor(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/sensors/', JSON.stringify(sensor), {headers: {"Content-Type": "application/json"}})
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

  update(sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/sensors/' + sensor.id, JSON.stringify(sensor), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/sensors/' + id)
        .toPromise()
        .then(data => {
            resolve(data);
          },
          msg => {
            reject(msg);
          })
    });
  }
}
