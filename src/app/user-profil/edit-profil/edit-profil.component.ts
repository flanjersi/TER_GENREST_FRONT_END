import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../shared/_services/user.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {User} from '../../shared/_models/User';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {

  public form: FormGroup;


  public firstName: string;
  public idUser: number;

  constructor(private dialogRef: MatDialogRef<EditProfilComponent>,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private spinnerService: Ng4LoadingSpinnerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required
      ])
    });

    this.firstName = data.firstName;
    this.idUser = data.idUser;
  }

  ngOnInit(): void {
  }

  updateProfil() {
    this.form.markAsTouched();

    if (!this.form.valid) {
      return;
    }

    let user = new User();

    user.id = this.idUser;
    user.firstName = this.form.get('firstName').value;

    this.spinnerService.show();

    this.userService.update(user)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(project);
          console.log(data);
        },
        msg => {
          this.form.get('firstName').setErrors({'alreadyUsed' : true});
        }
      )

  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
