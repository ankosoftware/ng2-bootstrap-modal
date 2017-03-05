import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {ConfirmComponent} from "../confirm/confirm.component";


@Component({
  selector: 'parent-dialog',
  template: `<div class="modal-dialog" style="width: 800px;">
                <div class="modal-content" >
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Parent dialog</h4>
                   </div>
                   <div class="modal-body">
                     <p>bla-bla</p>
                     <p>bla-bla</p>
                     <p>bla-bla</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">Close</button>
                   </div>
                </div>
             </div>`
})
export class ParentDialogComponent extends DialogComponent<null, null>  {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.dialogService.addDialog(ConfirmComponent, {title: 'Confirm', message: 'Are you sure you want close dialog?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.close();
      }
    });
  }
}
