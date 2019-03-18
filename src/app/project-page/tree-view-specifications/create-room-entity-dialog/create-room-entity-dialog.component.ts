import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from 'src/app/shared/_services/room.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Room } from 'src/app/shared/_models/Room';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-room-entity-dialog',
  templateUrl: './create-room-entity-dialog.component.html',
  styleUrls: ['./create-room-entity-dialog.component.scss']
})
export class CreateRoomEntityDialogComponent implements OnInit {
  
  @Input()
  private idFloor: number;

  private form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private roomService: RoomService,
              private dialogRef: MatDialogRef<CreateRoomEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder) { 
                this.form = this.formBuilder.group({
                  name: new FormControl('', [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                  ]),
                  city: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(50)
                  ]),
                });
            
              }

  ngOnInit() {
  }

  
  save(){

    this.form.get('name').markAsTouched;
    this.form.get('city').markAsTouched;
    
    
    if(!this.form.valid){
      return;
    }

    let room = new Room();
    room.type= this.form.get('name').value;
    room.numberRoom = this.form.get('city').value;
  
    this.spinnerService.show();

    this.roomService.createRoom(this.data.id, room)
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
