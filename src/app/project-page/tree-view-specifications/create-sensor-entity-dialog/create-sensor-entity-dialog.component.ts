import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SensorService } from 'src/app/shared/_services/sensor.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Sensor } from 'src/app/shared/_models/Sensor';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-create-sensor-entity-dialog',
  templateUrl: './create-sensor-entity-dialog.component.html',
  styleUrls: ['./create-sensor-entity-dialog.component.scss']
})
export class CreateSensorEntityDialogComponent implements OnInit {

  @Input()
  private idCorridor: number;

  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private sensorService: SensorService,
              private dialogRef: MatDialogRef<CreateSensorEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      latitude: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      longitude: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      model: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      quantityKind: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      unitData: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),

    });

  }

  ngOnInit() {
  }


  save(){

    this.form.get('latitude').markAsTouched;
    this.form.get('longitude').markAsTouched;
    this.form.get('model').markAsTouched;
    this.form.get('name').markAsTouched;
    this.form.get('quantityKind').markAsTouched;
    this.form.get('unitData').markAsTouched;


    if(!this.form.valid){
      return;
    }

    let sensor = new Sensor();
    sensor.latitude = this.form.get('latitude').value;
    sensor.longitude = this.form.get('longitude').value;
    sensor.model = this.form.get('model').value;
    sensor.quantityKind = this.form.get('quantityKind').value;
    sensor.unitData = this.form.get('unitData').value;
    sensor.name = this.form.get('name').value;

    this.spinnerService.show();
    console.log(this.data);
    if(this.data.type === "corridor"){
      this.sensorService.createSensorInCorridor(this.data.id, sensor)
        .then(
          data => {
            this.spinnerService.hide();
            this.dialogRef.close('added');
          },
          err => {
            console.log(err);
            this.dialogRef.close('error');
          }
        )
    }else{
      this.sensorService.createSensorInRoom(this.data.id, sensor)
        .then(
          data => {
            this.spinnerService.hide();
            this.dialogRef.close('added');
          },
          err => {
            console.log(err);
            this.dialogRef.close('error');
          }
        )
    }

  }

  close(){
    this.dialogRef.close('cancel');
  }
}
