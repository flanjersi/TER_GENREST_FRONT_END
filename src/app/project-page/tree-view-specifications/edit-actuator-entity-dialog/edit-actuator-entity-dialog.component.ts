import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {CookieService} from 'ngx-cookie-service';
import {MyErrorStateMatcher} from '../edit-building-entity-dialog/edit-building-entity-dialog.component';
import {ActuatorService} from '../../../shared/_services/actuator.service';
import {Actuator} from '../../../shared/_models/Actuator';
import {camelize} from "tslint/lib/utils";

@Component({
  selector: 'app-edit-actuator-entity-dialog',
  templateUrl: './edit-actuator-entity-dialog.component.html',
  styleUrls: ['./edit-actuator-entity-dialog.component.scss']
})
export class EditActuatorEntityDialogComponent implements OnInit {

  public form: FormGroup;

  public matcher = new MyErrorStateMatcher();

  public idActuator: number;
  private isLoaded: boolean;


  constructor(private dialogRef: MatDialogRef<EditActuatorEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private actuatorService: ActuatorService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


    this.idActuator = data.idActuator;



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
        Validators.maxLength(200)
      ]),

    });
    this.isLoaded = false;

    this.actuatorService.getById(this.idActuator).subscribe(
      data => {
        this.form.get('latitude').setValue(data.latitude);
        this.form.get('longitude').setValue(data.longitude);
        this.form.get('model').setValue(data.model);
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

  editActuator() {
    this.form.markAsTouched();

    if (!this.form.valid) {
      return;
    }

    const actuator = new Actuator();
    actuator.id = this.idActuator;

    actuator.latitude = this.form.get('latitude').value;
    actuator.longitude = this.form.get('longitude').value;
    actuator.model = this.form.get('model').value;
    actuator.name = this.camelize(this.form.get('name').value, ' ');


    this.spinnerService.show();

    this.actuatorService.updateActuator(actuator)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(actuator);
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
