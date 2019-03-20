import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {MotherRoomService} from '../../../shared/_services/mother-room.service';
import {Corridor} from '../../../shared/_models/Corridor';
import {MotherRoom} from '../../../shared/_models/MotherRoom';

@Component({
  selector: 'app-edit-mother-room-entity-dialog',
  templateUrl: './edit-mother-room-entity-dialog.component.html',
  styleUrls: ['./edit-mother-room-entity-dialog.component.scss']
})
export class EditMotherRoomEntityDialogComponent implements OnInit {

  @Input()
  private idFloor: number;

  private idMotherRoom: number;

  private form: FormGroup;
  private isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private motherRoomService: MotherRoomService,
              private dialogRef: MatDialogRef<EditMotherRoomEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder
  ) {
    this.idMotherRoom = data.idMotherRoom;
    console.log(data);
    this.form = this.formBuilder.group({
      type: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      numberMotherRoom : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.isLoaded = false;
    let motherRoom = this.motherRoomService.getById(this.idMotherRoom).subscribe(
      data => {
        this.form.get('type').setValue(data.type);
        this.form.get('numberMotherRoom').setValue(data.numberMotherRoom);
      },
      err => {},
      () => {
        this.isLoaded = true;
      }
    );


  }

  ngOnInit() {
  }

  editMotherRoom() {
    this.form.get('type').markAsTouched;
    this.form.get('numberMotherRoom').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const motherRoom = new MotherRoom();
    motherRoom.id = this.idMotherRoom;

    motherRoom.numberMotherRoom = this.form.get('numberMotherRoom').value;
    motherRoom.type = this.form.get('type').value;


    this.spinnerService.show();

    this.motherRoomService.updateMotherRoom(motherRoom)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(motherRoom);
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
