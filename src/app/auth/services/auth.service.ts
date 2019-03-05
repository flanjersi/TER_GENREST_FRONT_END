import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../../core/_models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/users/authentification?email=' + email + '&password=' + password)
        .toPromise()
        .then(data => {
            localStorage.setItem('currentUser', data);
            resolve(new User(data));
          },
          msg => {
            reject(msg);
          }
        )
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
