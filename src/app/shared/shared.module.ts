import {ModuleWithProviders, NgModule} from '@angular/core';
import {UserService} from "./_services/user.service";
import {CookieService} from "ngx-cookie-service";
import {ProjectService} from "./_services/project.service";
import { BuildingService } from './_services/building.service';
import { FloorService } from './_services/floor.service';
import { RoomService } from './_services/room.service';
import { CorridorService } from './_services/corridor.service';
import { ZoneService } from './_services/zone.service';
import { SensorService } from './_services/sensor.service';
import { ActuatorService } from './_services/actuator.service';
import {LanguageService} from "./_services/language.service";

@NgModule({
  declarations: [],
  imports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ 
        UserService, 
        CookieService, 
        ProjectService, 
        BuildingService,
        FloorService,
        RoomService,
        CorridorService,
        ZoneService,
        SensorService,
        ActuatorService,
        LanguageService
      ]
    };
  }
}
