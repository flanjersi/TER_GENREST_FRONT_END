import {Injectable} from '@angular/core';
import {User} from '../_models/User';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getAll(){
    return new Promise((resolve, reject) => {
      this.http.get<User[]>('api/users')
        .toPromise()
        .then(
          res => {
            let users = [];
            res.map(user => users.push(new User(user)));
            resolve(users);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getById(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('api/users/' + id)
        .toPromise()
        .then(res => {
          resolve(new User(res));
        },
        msg => {
          reject(msg);
        })
    });
  }

  getByEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('api/users/query?email=' + email)
        .toPromise()
        .then(res => {
            resolve(new User(res));
          },
          msg => {
            reject(msg);
          })
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
