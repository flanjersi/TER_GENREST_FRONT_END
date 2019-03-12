import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Corridor} from "../_models/Corridor";

@Injectable()
export class CorridorService {

  constructor(private http: HttpClient) {}


  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<Corridor[]>('api/corridors')
        .toPromise()
        .then(
          res => {
            let corridors = [];
            res.map(corridor => corridors.push(new Corridor(corridor)));
            resolve(corridors);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<Corridor>{
    return new Promise<Corridor>((resolve, reject) => {
      this.http.get('api/corridors/' + id)
        .toPromise()
        .then(res => {
            resolve(new Corridor(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/corridors/', JSON.stringify(corridor), {headers: {"Content-Type": "application/json"}})
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

  update(corridor: Corridor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/corridors/' + corridor.id, JSON.stringify(corridor), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Corridor(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/corridors/' + id)
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
