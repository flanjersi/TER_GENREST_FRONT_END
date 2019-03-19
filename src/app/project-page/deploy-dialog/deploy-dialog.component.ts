import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';
import {LanguageService} from "../../shared/_services/language.service";
import {Language} from "../../shared/_models/Language";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface ConfigurationEnum {
  value: string;
  viewValue: string;
}
export interface LanguageEnum {
  value: string;
  viewValue: string;
}
export interface SystemEnum {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-deploy-dialog',
  templateUrl: './deploy-dialog.component.html',
  styleUrls: ['./deploy-dialog.component.scss']
})
export class DeployDialogComponent implements OnInit {

  configurations: ConfigurationEnum[] = [];

  systems: SystemEnum[] = [];

  languagesEnum: LanguageEnum[] = [];

  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  public isLoaded: boolean;

  private languages: Language[];

  private indexLanguageSelected : number;
  private indexConfigurationSelected : number;
  private indexOperatingSystemSelected : number;


  constructor(private dialogRef: MatDialogRef<DeployDialogComponent>,
              private formBuilder: FormBuilder,
              private languageService: LanguageService) {
    this.form = this.formBuilder.group({
      typeLanguage: new FormControl('', [
        Validators.required
      ]),
      typeConfiguration: new FormControl('', [
        Validators.required
      ]),
      typeSystem: new FormControl('', [
        Validators.required
      ])
    });

    this.isLoaded = false;

    this.languageService.getAll()
      .subscribe(
        data => {
          this.languages = data;
          var instance = this;
          console.log(this.languages);
          for(var index = 0; index < this.languages.length ; index++){
            this.languagesEnum.push(new class implements LanguageEnum {
              value: string;
              viewValue: string;

              constructor() {
                this.value = index + '';
                this.viewValue = instance.languages[index].name;
              }
            });
          }
        },
        (error) => {},
        () => {this.isLoaded = true;}
      );





  }

  ngOnInit() {}

  selectionLanguageChanged(event){
    console.log(event);

    this.indexLanguageSelected = parseInt(event.value);

    const language = this.languages[parseInt(event.value)];

    this.configurations = [];
    this.systems = [];

    if(language.configurationsAvailable){
      for(var index = 0; index < language.configurationsAvailable.length ; index++){
        this.configurations.push(new class implements ConfigurationEnum {
          value: string;
          viewValue: string;

          constructor() {
            this.value = index + '';
            this.viewValue = language.configurationsAvailable[index].name;
          }
        });
      }
    }
  }

  selectionConfigurationChanged(event){
    this.indexConfigurationSelected = parseInt(event.value);

    const configuration = this.languages[this.indexLanguageSelected].configurationsAvailable[this.indexConfigurationSelected];

    this.systems = [];

    if(configuration.operatingsSystem){
      for(var index = 0; index < configuration.operatingsSystem.length ; index++){
        this.systems.push(new class implements SystemEnum {
          value: string;
          viewValue: string;

          constructor() {
            this.value = index + '';
            this.viewValue = configuration.operatingsSystem[index].name;
          }
        });
      }
    }
  }

  selectionSystemChanged(event){
    this.indexOperatingSystemSelected = parseInt(event.value);
  }

  deploy() {
    this.form.markAsTouched();
  }

  close() {
    this.dialogRef.close('Close');
  }
}
