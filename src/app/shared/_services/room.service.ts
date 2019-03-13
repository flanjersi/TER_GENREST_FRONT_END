import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../_models/Room';
import {Observable} from 'rxjs';
import {Actuator} from '../_models/Actuator';
import {Sensor} from '../_models/Sensor';


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
      this.http.put('api/motherRooms/' + id + '/rooms', JSON.stringify(Room), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Room(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateRoom(idMotherRoom: number, room: Room) {
    return new Promise((resolve, reject) => {
      this.http.post('api/motherRooms/' + idMotherRoom + '/rooms/' + room.id, JSON.stringify(room), {headers: {'Content-Type': 'application/json'}})
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
  createActuator(id: number, actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.put('api/rooms/' + id + '/actuators', JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateActuator(idRoom: number, actuator: Actuator) {
    return new Promise((resolve, reject) => {
      this.http.post('api/rooms/' + idRoom + '/actuators/' + actuator.id, JSON.stringify(actuator), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Actuator(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteActuator(idRoom: number, idActuator: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/rooms/' + idRoom + '/actuators/' + idActuator)
        .toPromise()
        .then(data => {
            resolve(data);
          },
          msg => {
            reject(msg);
          });
    });
  }
  createSensor(id: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.put('api/corridors/' + id + '/sensors', JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateSensor(idCorridor: number, sensor: Sensor) {
    return new Promise((resolve, reject) => {
      this.http.post('api/corridors/' + idCorridor + '/sensors/' + sensor.id, JSON.stringify(sensor), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Sensor(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteSensor(idCorridors: number, idSensor: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/corridors/' + idCorridors + '/sensors/' + idSensor)
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
