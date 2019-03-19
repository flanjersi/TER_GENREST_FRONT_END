import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  constructor(private http: HttpClient) { }

  getGeneratedAPI(idProject: number, idLanguage: number, idConfiguration: number, idOperatingSystem: number) : Observable<any> {
    return new Observable ((observer) => {
      this.http.request('get', 'api/deploiement?project=' + idProject + '&language=' + idLanguage + '&configuration=' + idConfiguration + '&operatingSystem=' + idOperatingSystem, {
        responseType: 'blob'
      })
        .subscribe(
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }
}
