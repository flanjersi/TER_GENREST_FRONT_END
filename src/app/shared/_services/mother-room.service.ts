import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MotherRoom} from '../_models/MotherRoom';
import {Observable} from 'rxjs';
import {Corridor} from '../_models/Corridor';



@Injectable()
export class MotherRoomService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<MotherRoom> {
    return new Observable<MotherRoom>((observer) => {
      this.http.get<any>('api/motherRooms/' + id)
        .subscribe(
          (motherRoom) => observer.next(new MotherRoom(motherRoom)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  createMotherRoom(idFloor: number, motherRoom: MotherRoom) {
    return new Promise((resolve, reject) => {
      this.http.put('api/floors/' + idFloor + '/motherRooms', JSON.stringify(motherRoom), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new MotherRoom(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateMotherRoom(motherRoom: MotherRoom) {
    return new Promise((resolve, reject) => {
      this.http.post('api/motherRooms/' + motherRoom.id, JSON.stringify(motherRoom), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new MotherRoom(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteMotherRoom(idFloor: number, idMotherRoom: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/floors/' + idFloor + '/motherRooms/' + idMotherRoom)
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
