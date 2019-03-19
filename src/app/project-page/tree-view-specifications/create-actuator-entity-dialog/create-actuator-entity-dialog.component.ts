import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actuator } from 'src/app/shared/_models/Actuator';
import { ActuatorService } from 'src/app/shared/_services/actuator.service';
import { CreateSensorEntityDialogComponent } from '../create-sensor-entity-dialog/create-sensor-entity-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-actuator-entity-dialog',
  templateUrl: './create-actuator-entity-dialog.component.html',
  styleUrls: ['./create-actuator-entity-dialog.component.scss']
})
export class CreateActuatorEntityDialogComponent implements OnInit {
  @Input()
  private idCorridor: number;

  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private actuatorService: ActuatorService,
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
    
    if(!this.form.valid){
      return;
    }

    let actuator = new Actuator();
    actuator.latitude = this.form.get('latitude').value;
    actuator.longitude = this.form.get('longitude').value;
    actuator.model = this.form.get('model').value;
    actuator.reference = this.form.get('reference').value;
    actuator.brand = this.form.get('brand').value;
    actuator.state = this.form.get('state').value;
  
    this.spinnerService.show();

    if(this.data.type === "corridor"){
    this.actuatorService.createActuatorInCorridor(this.data.id, actuator)
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
    this.actuatorService.createActuatorInRoom(this.data.id, actuator)
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
