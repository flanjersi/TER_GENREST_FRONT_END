import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../edit-building-entity-dialog/edit-building-entity-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActuatorService} from '../../../shared/_services/actuator.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {CookieService} from 'ngx-cookie-service';
import {Actuator} from '../../../shared/_models/Actuator';
import {SensorService} from '../../../shared/_services/sensor.service';
import {Sensor} from '../../../shared/_models/Sensor';

@Component({
  selector: 'app-edit-sensor-entity-dialog',
  templateUrl: './edit-sensor-entity-dialog.component.html',
  styleUrls: ['./edit-sensor-entity-dialog.component.scss']
})
export class EditSensorEntityDialogComponent implements OnInit {

  public form: FormGroup;

  public matcher = new MyErrorStateMatcher();

  public idSensor: number;


  constructor(private dialogRef: MatDialogRef<EditSensorEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private sensorService: SensorService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


    this.idSensor = data.idSensor;



    this.form = this.formBuilder.group({
      latitude: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      longitude: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      model: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      brand: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      reference: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      uniData: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
    });
  }

  ngOnInit() {
  }

  editSensor() {
    this.form.markAsTouched();

    if (!this.form.valid) {
      return;
    }

    const sensor = new Sensor();
    sensor.id = this.idSensor;

    sensor.latitude = this.form.get('latitude').value;
    sensor.longitude = this.form.get('longitude').value;
    sensor.model = this.form.get('model').value;
    sensor.brand = this.form.get('brand').value;
    sensor.reference = this.form.get('reference').value;
    sensor.state = this.form.get('state').value;
    sensor.unitData = this.form.get('uniData').value;


    this.spinnerService.show();

    this.sensorService.updateSensor(sensor)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close({
            action: 'updated',

            latitude : this.form.get('latitude').value
          });
          console.log(sensor);
          console.log(data);
        },

        err => {
          console.log(err);
          this.dialogRef.close('error');
        }
      );
  }

  cancel() {
    this.dialogRef.close({
      action : 'cancel'
    });
  }
}
