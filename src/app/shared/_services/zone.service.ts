import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Zone} from '../_models/Zone';
import {Observable} from 'rxjs';


@Injectable()
export class ZoneService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Zone> {
    return new Observable<Zone>((observer) => {
      this.http.get<any>('api/zones/' + id)
        .subscribe(
          (motherRoom) => observer.next(new Zone(motherRoom)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }

  createZone(idFloor: number, zone: Zone) {
    return new Promise((resolve, reject) => {
      this.http.put('api/floors/' + idFloor + '/zones', JSON.stringify(zone.toJson()), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Zone(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  updateZone(zone: Zone) {
    return new Promise((resolve, reject) => {
      this.http.post('api/zones/' + zone.id, JSON.stringify(zone.toJson()), {headers: {'Content-Type': 'application/json'}})
        .toPromise()
        .then(data => {
            resolve(new Zone(data));
          },
          msg => {
            reject(msg);
          });
    });
  }

  deleteZone(idFloor: number, idZone: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/floors/' + idFloor + '/zones/' + idZone)
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
