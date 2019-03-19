import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Language} from "../_models/Language";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Array<Language>> {
    return new Observable<Array<Language>> ((observer) => {
      this.http.get<any>('api/language')
        .subscribe(
          (languagesResp) => {
            const languages = [];
            languagesResp.map(languageData => languages.push(new Language(languageData)));
            observer.next(languages);
          },
          (error)=> observer.error(error),
          () => observer.complete()
        );
    });
  }


}
