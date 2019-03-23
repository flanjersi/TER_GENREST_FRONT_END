import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {RoomService} from '../../../shared/_services/room.service';
import {Room} from '../../../shared/_models/Room';

@Component({
  selector: 'app-edit-room-entity-dialog',
  templateUrl: './edit-room-entity-dialog.component.html',
  styleUrls: ['./edit-room-entity-dialog.component.scss']
})
export class EditRoomEntityDialogComponent implements OnInit {

  @Input()
  private idMotherRoom: number;

  private idRoom: number;

  private form: FormGroup;

  private isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private roomService: RoomService,
              private dialogRef: MatDialogRef<EditRoomEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder
  ) {
    this.idRoom = data.idRoom;

    this.form = this.formBuilder.group({
      type: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      name : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.isLoaded = false;

    let room = this.roomService.getById(this.idRoom).subscribe(
      data => {
        this.form.get('type').setValue(data.type);
        this.form.get('name').setValue(data.name);
      },
      err => {},
      () => {
        this.isLoaded = true;
      }
    );


  }

  ngOnInit() {
  }

  editRoom() {
    this.form.get('type').markAsTouched;
    this.form.get('name').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const room = new Room();
    room.id = this.idRoom;

    room.name = this.form.get('name').value;
    room.type = this.form.get('type').value;


    this.spinnerService.show();

    this.roomService.updateRoom(room)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
        },
        err => {
          console.log(err);
          this.dialogRef.close('error');
        }
      );
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
