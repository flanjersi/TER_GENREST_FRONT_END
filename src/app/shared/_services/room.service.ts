import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../_models/Room';
import {Observable} from 'rxjs';


@Injectable()
export class RoomService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Room> {
    return new Observable<Room>((observer) => {
      this.http.get<any>('api/Rooms/' + id)
        .subscribe(
          (room) => observer.next(new Room(room)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  createRoom(id: number, room: Room) {
    return new Promise((resolve, reject) => {
      this.http.put('api/motherRooms/' + id + '/rooms', JSON.stringify(room.toJson()), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Room(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateRoom(room: Room) {
    return new Promise((resolve, reject) => {
      this.http.post('api/rooms/' + room.id, JSON.stringify(room), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Room(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteRoom(id: number, idRoom: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/motherRooms/' + id + '/rooms/' + idRoom)
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
