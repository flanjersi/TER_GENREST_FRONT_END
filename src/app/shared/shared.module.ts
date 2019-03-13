import {ModuleWithProviders, NgModule} from '@angular/core';
import {UserService} from "./_services/user.service";
import {CookieService} from "ngx-cookie-service";
import {ProjectService} from "./_services/project.service";

@NgModule({
  declarations: [],
  imports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ UserService, CookieService, ProjectService ]
    };
  }
}
