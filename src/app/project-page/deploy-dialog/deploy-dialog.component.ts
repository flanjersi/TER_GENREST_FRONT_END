import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LanguageService} from "../../shared/_services/language.service";
import {Language} from "../../shared/_models/Language";
import {DeployService} from "./services/deploy.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {DomSanitizer} from "@angular/platform-browser";

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

  private idProject: number;
  private projectName : string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private domSanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<DeployDialogComponent>,
              private formBuilder: FormBuilder,
              private languageService: LanguageService,
              private deployService: DeployService,
              private spinnerService: Ng4LoadingSpinnerService) {
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

    this.idProject = data.idProject;

    this.projectName = data.projectName;

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
    this.form.get('typeLanguage').markAsTouched;
    this.form.get('typeConfiguration').markAsTouched;
    this.form.get('typeSystem').markAsTouched;

    if(!this.form.valid){
      return;
    }

    let languageId = this.languages[this.indexLanguageSelected].id;
    let configurationId = this.languages[this.indexLanguageSelected].configurationsAvailable[this.indexConfigurationSelected].id;
    let operatingSystemId = this.languages[this.indexLanguageSelected].configurationsAvailable[this.indexConfigurationSelected].operatingsSystem[this.indexConfigurationSelected].id;

    this.spinnerService.show();

    this.deployService.getGeneratedAPI(this.idProject, languageId, configurationId, operatingSystemId)
      .subscribe(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close();
        },
        err => {
          //In error, why don't know why, but that work ...
          const blob = new Blob([err], {type : 'application/zip'});

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob);
          }
          else {
            const fileUrl = window.URL.createObjectURL(blob);

            var link = document.createElement('a');

            link.href = fileUrl;
            link.download = "GENREST APP N°" + this.idProject + " - " + this.projectName + '.zip';
            link.click();
          }

          this.spinnerService.hide();
          this.dialogRef.close();
        },
        () => {}
      );
  }

  close() {
    this.dialogRef.close('close');
  }
}
