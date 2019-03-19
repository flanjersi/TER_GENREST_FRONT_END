import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  constructor(private http: HttpClient) { }

  getGeneratedAPI(idProject: number, idLanguage: number, idConfiguration: number, idOperatingSystem: number) : Observable<any> {
    return new Observable<any> ((observer) => {
      this.http.get<any>('http://localhost:8090/terGENREST/api/deploiement?project=' + idProject + '&language=' + idLanguage + '&configuration=' + idConfiguration + '&operatingSystem=' + idOperatingSystem)
        .subscribe(
          (data) => {
           console.log(data);
           observer.next(data);
          },
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }
}
