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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private roomService: RoomService,
              private dialogRef: MatDialogRef<EditRoomEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder
  ) {
    console.log(data);
    this.form = this.formBuilder.group({
      type: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      numberRoom : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.idRoom = data.idRoom;
  }

  ngOnInit() {
  }

  editRoom() {
    this.form.get('type').markAsTouched;
    this.form.get('numberRoom').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const room = new Room();
    room.id = this.idRoom;

    room.numberRoom = this.form.get('numberRoom').value;
    room.type = this.form.get('type').value;


    this.spinnerService.show();

    this.roomService.updateRoom(this.idMotherRoom, room)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close({
            action: 'updated',
            type : this.form.get('type').value
          });
          console.log(room);
          console.log(data);
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
