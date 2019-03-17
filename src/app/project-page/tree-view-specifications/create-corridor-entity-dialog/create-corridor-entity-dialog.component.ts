import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Corridor } from 'src/app/shared/_models/Corridor';
import { CorridorService } from 'src/app/shared/_services/corridor.service';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-corridor-entity-dialog',
  templateUrl: './create-corridor-entity-dialog.component.html',
  styleUrls: ['./create-corridor-entity-dialog.component.scss']
})
export class CreateCorridorEntityDialogComponent implements OnInit {

  @Input()
  private idFloor: number;

  private form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private corridorService: CorridorService,
              private dialogRef: MatDialogRef<CreateCorridorEntityDialogComponent>,
              private spinnerService: Ng4LoadingSpinnerService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });

  }

  ngOnInit() {
  }

  save(){
    this.form.get('name').markAsTouched;

    if(!this.form.valid){
      return;
    }

    let corridor = new Corridor();
    corridor.numberCorridor = this.form.get('name').value;

    this.spinnerService.show();

    this.corridorService.createCorridorInFloor(this.data.id, corridor)
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
