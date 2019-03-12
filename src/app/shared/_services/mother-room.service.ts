import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MotherRoom} from "../_models/MotherRoom";

@Injectable()
export class MotherRoomService {

  constructor(private http: HttpClient) {}


  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<MotherRoom[]>('api/motherRooms')
        .toPromise()
        .then(
          res => {
            let motherRooms = [];
            res.map(motherRoom => motherRooms.push(new MotherRoom(motherRoom)));
            resolve(motherRooms);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<MotherRoom>{
    return new Promise<MotherRoom>((resolve, reject) => {
      this.http.get('api/motherRooms/' + id)
        .toPromise()
        .then(res => {
            resolve(new MotherRoom(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(motherRoom: MotherRoom) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/motherRooms/', JSON.stringify(motherRoom), {headers: {"Content-Type": "application/json"}})
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

  update(motherRoom: MotherRoom) {
    return new Promise((resolve, reject) => {
      this.http.post('api/motherRooms/' + motherRoom.id, JSON.stringify(motherRoom), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new MotherRoom(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/motherRooms/' + id)
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
