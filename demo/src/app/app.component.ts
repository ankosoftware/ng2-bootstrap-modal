import { Component } from '@angular/core';
import { AlertComponent } from './alert.component';
import { ConfirmComponent } from './confirm.component';
import { PromptComponent } from './prompt.component';
import { DialogService } from "ng2-bootstrap-modal";
import Timer = NodeJS.Timer;

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  confirmResult:boolean = null;
  promptMessage:string = '';
  constructor(private dialogService:DialogService) {}
  showAlert() {
    this.dialogService.addDialog(AlertComponent, {
      title:'Alert!!!!',
      message:'TADAM!!!'});
  }
  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirmation',
      message:'Bla bla comfirm action?'})
      .subscribe((isConfirmed)=>{
        //We get dialog result
        this.confirmResult = !!isConfirmed;
      });
  }
  showPrompt() {
    let disposable = this.dialogService.addDialog(PromptComponent, {
      title:'Name dialog',
      question:'Enter your name: '})
      .subscribe((message)=>{
        //We get dialog result
        this.promptMessage = message;
      });
  }
}
