import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Room} from "../_models/Room";

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) {}


  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<Room[]>('api/rooms')
        .toPromise()
        .then(
          res => {
            let rooms = [];
            res.map(room => rooms.push(new Room(room)));
            resolve(rooms);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) : Promise<Room>{
    return new Promise<Room>((resolve, reject) => {
      this.http.get('api/rooms/' + id)
        .toPromise()
        .then(res => {
            resolve(new Room(res));
          },
          msg => {
            reject(msg);
          })
    });
  }

  create(room: Room) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/rooms/', JSON.stringify(room), {headers: {"Content-Type": "application/json"}})
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

  update(room: Room) {
    return new Promise((resolve, reject) => {
      this.http.post('api/rooms/' + room.id, JSON.stringify(room), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new Room(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/rooms/' + id)
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
