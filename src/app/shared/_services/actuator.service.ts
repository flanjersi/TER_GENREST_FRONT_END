import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Actuator} from "../_models/Actuator";


@Injectable()
export class ActuatorService {

  constructor(private http: HttpClient) {}

  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<Actuator[]>('api/actuators')
        .toPromise()
        .then(
          res => {
            let actuators = [];
            res.map(actuator => actuators.push(new Actuator(actuator)));
            resolve(actuators);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<Actuator>{
    return new Promise<Actuator>((resolve, reject) => {
      this.http.get('api/actuators/' + id)
        .toPromise()
        .then(res => {
            resolve(new Actuator(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/actuators/', JSON.stringify(actuator), {headers: {"Content-Type": "application/json"}})
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

  update(actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.post('api/actuators/' + actuator.id, JSON.stringify(actuator), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/actuators/' + id)
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
