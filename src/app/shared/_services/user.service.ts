import {Injectable} from '@angular/core';
import {User} from '../_models/User';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getAll() : Observable<Array<User>> {
    return new Observable<Array<User>> ((observer) => {
      this.http.get<any>('api/users')
        .subscribe(
          (usersResp) => {
            const users = [];
            usersResp.map(user => users.push(new User(user)));
            observer.next(users);
          },
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }

  getById(id: number) : Observable<User> {
    return new Observable<User>((observer) => {
      this.http.get<any>('api/users/' + id)
        .subscribe(
          (user) => observer.next(new User(user)),
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }

  getByEmail(email: string) {
    return new Observable<User>((observer) => {
      this.http.get<any>('api/users/query?email=' + email)
        .subscribe(
          (user) => observer.next(new User(user)),
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }

  create(user: User) {
    return new Promise((resolve, reject) => {
      this.http.put<any>('api/users/', JSON.stringify(user), {headers: {"Content-Type": "application/json"}})
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

  update(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post('api/users/' + user.id, JSON.stringify(user), {headers: {"Content-Type": "application/json"}})
        .toPromise()
        .then(data => {
            resolve(new User(data));
          },
          msg => {
            reject(msg);
          })
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('api/users/' + id)
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
