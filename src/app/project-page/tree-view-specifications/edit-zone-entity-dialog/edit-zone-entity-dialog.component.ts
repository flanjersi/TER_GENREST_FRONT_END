import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ZoneService} from '../../../shared/_services/zone.service';
import {Zone} from '../../../shared/_models/Zone';

@Component({
  selector: 'app-edit-mother-room-entity-dialog',
  templateUrl: './edit-zone-entity-dialog.component.html',
  styleUrls: ['./edit-zone-entity-dialog.component.scss']
})
export class EditZoneEntityDialogComponent implements OnInit {

  @Input()
  private idFloor: number;

  private idZone: number;

  public form: FormGroup;
  public isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private zoneService: ZoneService,
              private dialogRef: MatDialogRef<EditZoneEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder
  ) {
    this.idZone = data.idZone;
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

    this.zoneService.getById(this.idZone).subscribe(
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

  editMotherRoom() {
    this.form.get('type').markAsTouched;
    this.form.get('name').markAsTouched;

    if (!this.form.valid) {
      return;
    }

    const zone = new Zone();
    zone.id = this.idZone;

    zone.name = this.form.get('name').value;
    zone.type = this.form.get('type').value;


    this.spinnerService.show();

    this.zoneService.updateZone(zone)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(zone);
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
