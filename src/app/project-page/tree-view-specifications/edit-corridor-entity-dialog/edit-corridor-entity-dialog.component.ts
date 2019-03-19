import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FloorService} from '../../../shared/_services/floor.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Floor} from '../../../shared/_models/Floor';
import {CorridorService} from '../../../shared/_services/corridor.service';
import {Corridor} from '../../../shared/_models/Corridor';

@Component({
  selector: 'app-edit-corridor-entity-dialog',
  templateUrl: './edit-corridor-entity-dialog.component.html',
  styleUrls: ['./edit-corridor-entity-dialog.component.scss']
})
export class EditCorridorEntityDialogComponent implements OnInit {

  @Input()
  private idFloor: number;

  private idCorridor: number;

  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private corridorService: CorridorService,
              private dialogRef: MatDialogRef<EditCorridorEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder
  ) {
    console.log(data);
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.idCorridor = data.idCorridor;
  }

  ngOnInit() {
  }

  editCorridor() {
    this.form.get('name').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const corridor = new Corridor();
    corridor.id = this.idCorridor;

    corridor.numberCorridor = this.form.get('name').value;


    this.spinnerService.show();

    this.corridorService.updateCorridor(corridor)
      .then(
        data => { console.log(data)
          this.spinnerService.hide();
          this.dialogRef.close({
            action: 'updated',
            numberCorridor : this.form.get('name').value
          });
          console.log(corridor);
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
