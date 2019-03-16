import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators, FormBuilder, Form, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FloorService } from 'src/app/shared/_services/floor.service';
import { Floor } from 'src/app/shared/_models/Floor';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-floor-entity-dialog',
  templateUrl: './create-floor-entity-dialog.component.html',
  styleUrls: ['./create-floor-entity-dialog.component.scss']
})


export class CreateFloorEntityDialogComponent implements OnInit {

  @Input()
  private idBuulding: number;

  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private floorService: FloorService,
              private dialogRef: MatDialogRef<CreateFloorEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder) { 

                this.form = this.formBuilder.group({
                  name: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(50)
                  ]),
                });
              }

  ngOnInit() {
  }

  save(){
    this.form.get('name').markAsTouched;
    
    if(!this.form.valid){
      return;
    }

    let floor = new Floor();
    floor.floorNumber = this.form.get('name').value;
    

    this.spinnerService.show();

    this.floorService.createFloor(this.data.id, floor)
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
