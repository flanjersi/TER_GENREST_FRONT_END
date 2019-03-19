import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  fileUrl;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getGeneratedAPI(idProject: number, idLanguage: number, idConfiguration: number, idOperatingSystem: number) : Observable<any> {
    return new Observable<any> ((observer) => {
      this.http.get<any>('http://localhost:8090/terGENREST/api/deploiement?project=' + idProject + '&language=' + 1 + '&configuration=' + 1 + '&operatingSystem=' + 1)
        .subscribe(
          (data) => {
           console.log(data);
           //observer.next(data);
           this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl
            (window.URL.createObjectURL(observer.next(data)));
          },
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }
}
