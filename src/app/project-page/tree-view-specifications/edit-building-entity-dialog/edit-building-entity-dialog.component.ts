import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {CookieService} from 'ngx-cookie-service';
import {BuildingService} from '../../../shared/_services/building.service';
import {Building} from '../../../shared/_models/Building';
import {Address} from '../../../shared/_models/Address';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-building-entity-dialog',
  templateUrl: './edit-building-entity-dialog.component.html',
  styleUrls: ['./edit-building-entity-dialog.component.scss']
})

export class EditBuildingEntityDialogComponent implements OnInit {

  public form: FormGroup;

  public matcher = new MyErrorStateMatcher();

  public idBuilding: number;
  public idProject: number;

  public isLoaded: boolean;

  constructor(private dialogRef: MatDialogRef<EditBuildingEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private buildingService: BuildingService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


    this.idBuilding = data.idBuilding;
    this.idProject = data.idProjet;

    this.form = this.formBuilder.group({
      type: new FormControl('', [
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


    this.isLoaded = false;

    let building = this.buildingService.getById(this.idBuilding).subscribe(
      data => {
        this.form.get('type').setValue(data.type);
        this.form.get('city').setValue(data.address.city);
        this.form.get('country').setValue(data.address.country);
        this.form.get('street').setValue(data.address.street);
      },
      err => {},
      () => {
        this.isLoaded = true;
      }
    );



  }

  ngOnInit() {
  }

  editBuilding() {
    this.form.markAsTouched();

    if (!this.form.valid) {
      return;
    }

    const building = new Building();
    building.id = this.idBuilding;

    building.type = this.form.get('type').value;

    const address = new Address();
    address.city = this.form.get('city').value;
    address.country = this.form.get('country').value;
    address.street = this.form.get('street').value;
    building.address = address;

    this.spinnerService.show();

    this.buildingService.updateBuilding(building)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(building);
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
