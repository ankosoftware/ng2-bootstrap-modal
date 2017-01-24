import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";


@Component({  selector: 'alert',
  template: `<div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Alert'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || '!!!'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="close()">OK</button>
                   </div>
                 </div>`
})
export class AlertComponent extends DialogComponent {
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
