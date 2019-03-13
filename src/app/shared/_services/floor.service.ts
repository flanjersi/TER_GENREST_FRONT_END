import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Floor} from "../_models/Floor";

@Injectable()
export class FloorService {

  constructor(private http: HttpClient) {}


  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<Floor[]>('api/floors')
        .toPromise()
        .then(
          res => {
            let floors = [];
            res.map(floor => floors.push(new Floor(floor)));
            resolve(floors);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<Floor>{
    return new Promise<Floor>((resolve, reject) => {
      this.http.get('api/floors/' + id)
        .toPromise()
        .then(res => {
            resolve(new Floor(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(floor: Floor) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/floors/', JSON.stringify(floor), {headers: {"Content-Type": "application/json"}})
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

  update(floor: Floor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/floors/' + floor.id, JSON.stringify(floor), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Floor(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/floors/' + id)
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
