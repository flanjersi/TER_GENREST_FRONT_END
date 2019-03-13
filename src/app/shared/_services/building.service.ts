import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Building} from "../_models/Building";


@Injectable()
export class BuildingService {

  constructor(private http: HttpClient) {}


  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<Building[]>('api/buildings')
        .toPromise()
        .then(
          res => {
            let buildings = [];
            res.map(building => buildings.push(new Building(building)));
            resolve(buildings);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<Building>{
    return new Promise<Building>((resolve, reject) => {
      this.http.get('api/Buildings/' + id)
        .toPromise()
        .then(res => {
            resolve(new Building(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(building: Building) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/buildings/', JSON.stringify(building), {headers: {"Content-Type": "application/json"}})
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

  update(building: Building) {
    return new Promise((resolve, reject) => {
      this.http.post('api/buildings/' + building.id, JSON.stringify(building), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Building(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/buildings/' + id)
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
