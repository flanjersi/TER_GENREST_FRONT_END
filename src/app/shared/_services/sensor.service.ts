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
}
