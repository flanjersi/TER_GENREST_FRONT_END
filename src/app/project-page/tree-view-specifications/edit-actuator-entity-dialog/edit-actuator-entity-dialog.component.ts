import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BuildingService} from '../../../shared/_services/building.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {CookieService} from 'ngx-cookie-service';
import {Building} from '../../../shared/_models/Building';
import {Address} from '../../../shared/_models/Address';
import {MyErrorStateMatcher} from '../edit-building-entity-dialog/edit-building-entity-dialog.component';
import {ActuatorService} from '../../../shared/_services/actuator.service';
import {Actuator} from '../../../shared/_models/Actuator';

@Component({
  selector: 'app-edit-actuator-entity-dialog',
  templateUrl: './edit-actuator-entity-dialog.component.html',
  styleUrls: ['./edit-actuator-entity-dialog.component.scss']
})
export class EditActuatorEntityDialogComponent implements OnInit {

  public form: FormGroup;

  public matcher = new MyErrorStateMatcher();

  public idActuator: number;


  constructor(private dialogRef: MatDialogRef<EditActuatorEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private actuatorService: ActuatorService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


    this.idActuator = data.idActuator;



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
    });
  }

  ngOnInit() {
  }

  editActuator() {
    this.form.markAsTouched();

    if (!this.form.valid) {
      return;
    }

    const actuator = new Actuator();
    actuator.id = this.idActuator;

    actuator.latitude = this.form.get('latitude').value;
    actuator.longitude = this.form.get('longitude').value;
    actuator.model = this.form.get('model').value;
    actuator.brand = this.form.get('brand').value;
    actuator.reference = this.form.get('reference').value;
    actuator.state = this.form.get('state').value;


    this.spinnerService.show();

    this.actuatorService.updateActuator(actuator)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated')
          console.log(actuator);
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
