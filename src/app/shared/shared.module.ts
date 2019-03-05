import {ModuleWithProviders, NgModule} from '@angular/core';
import {UserService} from "../core/_services/user.service";

@NgModule({
  declarations: [],
  imports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ UserService ]
    };
  }
}
