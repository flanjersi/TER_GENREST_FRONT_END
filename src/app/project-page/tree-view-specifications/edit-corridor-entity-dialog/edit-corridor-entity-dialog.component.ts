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
  private isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private corridorService: CorridorService,
              private dialogRef: MatDialogRef<EditCorridorEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      numberCorridor: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.idCorridor = data.idCorridor;
    this.isLoaded = false;

    const corridor = this.corridorService.getById(this.idCorridor).subscribe(
      data => {
        this.form.get('numberCorridor').setValue(data.numberCorridor);
      },
      err => {},
      () => {
        this.isLoaded = true;
      }
    );
  }

  ngOnInit() {
  }

  editCorridor() {
    this.form.get('numberCorridor').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const corridor = new Corridor();
    corridor.id = this.idCorridor;

    corridor.numberCorridor = this.form.get('numberCorridor').value;


    this.spinnerService.show();

    this.corridorService.updateCorridor(corridor)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(corridor);
          console.log(data);
        },

        err => {
          this.form.get('floorNumber').setErrors({'incorrect': true});
        }
      );
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
