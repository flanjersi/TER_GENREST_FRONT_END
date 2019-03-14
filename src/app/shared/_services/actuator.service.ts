import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actuator} from '../_models/Actuator';
import {Observable} from 'rxjs';


@Injectable()
export class ActuatorService {

  constructor(private http: HttpClient) {}
  getById(id: number): Observable<Actuator> {
    return new Observable<Actuator>((observer) => {
      this.http.get<any>('api/actuators/' + id)
        .subscribe(
          (actuator) => observer.next(new Actuator(actuator)),
          (error) => observer.error(error),
          () => observer.complete()
        );
    });
  }
}
