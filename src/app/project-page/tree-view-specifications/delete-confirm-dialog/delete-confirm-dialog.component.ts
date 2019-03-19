import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
//import { Action, Store } from '@ngrx/store';
//import { State } from "../../app.reducers";
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
  /*    cancel?: Action,
      delete: Action,
      go?: Action,
      */
      text: string,
      title: string
    },
    private spinnerService: Ng4LoadingSpinnerService,
    private mdDialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
 //   private store: Store<State>
  ) { }

  ngOnInit(): void {
  }

  public cancel() {
    /*if (this.data.cancel !== undefined) {
      this.store.dispatch(this.data.cancel);
    }*/
    this.close();
  }

  public close() {
    this.mdDialogRef.close();
  }

  public delete() {
  /*  this.store.dispatch(this.data.delete).then(
      data => {
        this.spinnerService.hide();
        this.mdDialogRef.close({
          action: 'deleted',
        });
        console.log('OK');
      },
      err => {
        console.log(err);
        this.mdDialogRef.close('error');
      }
    );
   /* if (this.data.go !== undefined) {
      this.store.dispatch(this.data.go);
    }*/
    this.close();
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }

}
