import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../edit-building-entity-dialog/edit-building-entity-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {CookieService} from 'ngx-cookie-service';
import {SensorService} from '../../../shared/_services/sensor.service';
import {Sensor} from '../../../shared/_models/Sensor';
import {camelize} from "tslint/lib/utils";

@Component({
  selector: 'app-edit-sensor-entity-dialog',
  templateUrl: './edit-sensor-entity-dialog.component.html',
  styleUrls: ['./edit-sensor-entity-dialog.component.scss']
})
export class EditSensorEntityDialogComponent implements OnInit {

  public form: FormGroup;

  public matcher = new MyErrorStateMatcher();

  public idSensor: number;
  private isLoaded: boolean;


  constructor(private dialogRef: MatDialogRef<EditSensorEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private sensorService: SensorService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


    this.idSensor = data.idSensor;



    this.form = this.formBuilder.group({
      latitude: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      longitude: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      model: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      quantityKind: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),

      unitData: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
    });
    this.isLoaded = false;
    this.sensorService.getById(this.idSensor).then
      ( data => {
        this.form.get('latitude').setValue(data.latitude);
        this.form.get('longitude').setValue(data.longitude);
        this.form.get('model').setValue(data.model);
        this.form.get('unitData').setValue(data.unitData);
        this.form.get('name').setValue(data.name);
        this.form.get('quantityKind').setValue(data.quantityKind);

        },

      () => {
        this.isLoaded = true;
      }
    );
  }

  ngOnInit() {
  }

  editSensor() {
    this.form.markAsTouched();

    if (!this.form.valid) {
      return;
    }

    const sensor = new Sensor();
    sensor.id = this.idSensor;

    sensor.latitude = this.form.get('latitude').value;
    sensor.longitude = this.form.get('longitude').value;
    sensor.model = this.form.get('model').value;
    sensor.quantityKind = this.form.get('quantityKind').value;
    sensor.name = this.camelize(this.form.get('name').value, ' ');
    sensor.unitData = this.form.get('unitData').value;

    this.spinnerService.show();

    this.sensorService.updateSensor(sensor)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(sensor);
          console.log(data);
        },

        err => {
          console.log(err);
          this.dialogRef.close('error');
        }
      );
  }

  cancel() {
    this.dialogRef.close({
      action : 'cancel'
    });
  }

  /**
   * Camelize a string, cutting the string by separator character.
   * @param string Text to camelize
   * @param string Word separator (underscore by default)
   * @return string Camelized text
   */
  camelize(text, separator) {

    // Assume separator is _ if no one has been provided.
    if(typeof(separator) == "undefined") {
      separator = "_";
    }

    // Cut the string into words
    var words = text.split(separator);

    // Concatenate all capitalized words to get camelized string
    var result = "";
    for (var i = 0 ; i < words.length ; i++) {
      var word = words[i];
      word = word.toLowerCase();
      var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
      result += capitalizedWord;
    }

    return result;

  }
}
