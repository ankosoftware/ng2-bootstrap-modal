import { Component } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import Timer = NodeJS.Timer;

@Component({
  selector: 'app',
  template: `
        <div class="container" >
          <h1>ng2-bootstrap-modal demo application</h1>
          <button class="btn btn-default" (click)=showConfirm()>Show confirm</button> 
          <span>Result: <b>{{ confirmResult }}</b></span>
        </div>
      `
})
export class AppComponent {
  confirmResult:boolean = null;
  timeoutId:Timer;
  constructor(private dialogService:DialogService) {}
  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirm title',
      message:'Confirm message'})
      .subscribe((isConfirmed)=>{
        //We get dialog result
        this.confirmResult = !!isConfirmed;
      });



    //We can close dialog calling disposable.unsubscribe();

    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    //If dialog was not closed manually close it by timeout
    this.timeoutId = setTimeout(()=>{
      disposable.unsubscribe();
      this.confirmResult = null;
    },10000);
  }
}
