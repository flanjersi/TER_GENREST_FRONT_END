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
    this.form.get('brand').markAsTouched;
    this.form.get('reference').markAsTouched;
    this.form.get('state').markAsTouched;
    this.form.get('unitData').markAsTouched;
    
    
    if(!this.form.valid){
      return;
    }

    let sensor = new Sensor();
    sensor.latitude = this.form.get('latitude').value;
    sensor.longitude = this.form.get('longitude').value;
    sensor.model = this.form.get('model').value;
    sensor.reference = this.form.get('reference').value;
    sensor.brand = this.form.get('brand').value;
    sensor.state = this.form.get('state').value;
    sensor.unitData = this.form.get('unitData').value;
  
    this.spinnerService.show();

    if(this.data.level === 6){
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
  }

  if(this.data.level === 8){
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
