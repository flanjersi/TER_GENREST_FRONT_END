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
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]),
    });
    this.idCorridor = data.idCorridor;
    this.isLoaded = false;

    const corridor = this.corridorService.getById(this.idCorridor).subscribe(
      data => {
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

  editCorridor() {
    this.form.get('name').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const corridor = new Corridor();
    corridor.id = this.idCorridor;

    corridor.name = this.form.get('name').value;


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
          this.form.get('name').setErrors({'incorrect': true});
        }
      );
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
