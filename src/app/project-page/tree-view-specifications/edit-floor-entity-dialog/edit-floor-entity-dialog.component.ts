import {Component, Inject, Input, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FloorService} from '../../../shared/_services/floor.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Floor} from '../../../shared/_models/Floor';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-floor-entity-dialog',
  templateUrl: './edit-floor-entity-dialog.component.html',
  styleUrls: ['./edit-floor-entity-dialog.component.scss']
})
export class EditFloorEntityDialogComponent implements OnInit {

  @Input()
  private idBuulding: number;

  private idFloor: number;

  public isLoaded: boolean;
  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private floorService: FloorService,
              private dialogRef: MatDialogRef<EditFloorEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder

  ) {

    this.idFloor = data.idFloor;
    console.log(data);
    this.form = this.formBuilder.group({
      floorNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.isLoaded = false;

    const floor = this.floorService.getById(this.idFloor).subscribe(
      data => {
        this.form.get('floorNumber').setValue(data.floorNumber);
      },
      err => {},
      () => {
        this.isLoaded = true;
      }
    );


  }

  ngOnInit() {
  }

  editFloor() {
    this.form.get('floorNumber').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const floor = new Floor();
    floor.id = this.idFloor;

    floor.floorNumber = this.form.get('floorNumber').value;


    this.spinnerService.show();

    this.floorService.updateFloor(floor)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(floor);
          console.log(data);
        },

        err => {
          this.form.get('floorNumber').setErrors({'incorrect': true});
        }
      );
  }
}

close(); {
  this.dialogRef.close('cancel');
}

