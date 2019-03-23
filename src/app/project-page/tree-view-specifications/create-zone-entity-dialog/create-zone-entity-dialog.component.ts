import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoneService } from 'src/app/shared/_services/zone.service';
import { CreateBuildingEntityDialogComponent } from '../create-building-entity-dialog/create-building-entity-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Zone } from 'src/app/shared/_models/Zone';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-mother-room-entity-dialog',
  templateUrl: './create-zone-entity-dialog.component.html',
  styleUrls: ['./create-zone-entity-dialog.component.scss']
})
export class CreateZoneEntityDialogComponent implements OnInit {

  @Input()
  private idFloor: number;

  private form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private motherRoomService: ZoneService,
              private dialogRef: MatDialogRef<CreateZoneEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder) { 
                this.form = this.formBuilder.group({
                  name: new FormControl('', [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                  ]),
                  type: new FormControl('', [
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
    this.form.get('type').markAsTouched;
    
    
    if(!this.form.valid){
      return;
    }

    let motherRoom = new Zone();
    motherRoom.type= this.form.get('type').value;
    motherRoom.name = this.form.get('name').value;
  
    this.spinnerService.show();

    this.motherRoomService.createZone(this.data.id, motherRoom)
          .then(
            data => {
              this.spinnerService.hide();
              this.dialogRef.close('added');
            },
            err => {
              this.form.get('name').setErrors({'incorrect': true});
            }
          )
  }

  close(){
    this.dialogRef.close('cancel');
  }


}
