import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators, FormBuilder, Form, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MAT_DIALOG_DATA} from '@angular/material';
import { BuildingService } from 'src/app/shared/_services/building.service';
import { Building } from 'src/app/shared/_models/Building';
import { Address } from 'src/app/shared/_models/Address';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-building-entity-dialog',
  templateUrl: './create-building-entity-dialog.component.html',
  styleUrls: ['./create-building-entity-dialog.component.scss']
})
export class CreateBuildingEntityDialogComponent implements OnInit {

  @Input()
  private idProjet: number;

  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private buildingService: BuildingService,
              private dialogRef: MatDialogRef<CreateBuildingEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
    });

  }

  ngOnInit() {
  }

  save(){
    this.form.get('name').markAsTouched;
    this.form.get('country').markAsTouched;
    this.form.get('city').markAsTouched;
    this.form.get('street').markAsTouched;

    if(!this.form.valid){
      return;
    }

    let building = new Building();
    building.type = this.form.get('name').value;

    let address = new Address();
    address.city = this.form.get('city').value;
    address.country = this.form.get('country').value;
    address.street = this.form.get('street').value;
    building.address = address;

    this.spinnerService.show();

    this.buildingService.createBuilding(this.data.id, building)
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

  close(){
    this.dialogRef.close('cancel');
  }

}
