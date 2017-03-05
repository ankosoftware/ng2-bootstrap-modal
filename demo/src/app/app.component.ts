import { Component } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { AlertComponent } from "./alert/alert.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { PromptComponent } from "./prompt/prompt.component";
import { ParentDialogComponent } from "./parent-dialog/parent-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  confirmResult:boolean = null;
  promptMessage:string = '';

  constructor(private dialogService:DialogService) {}

  showAlert() {
    this.dialogService.addDialog(AlertComponent, {title:'Alert title!', message:'Alert message!!!'});
  }

  showConfirm() {
    this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirmation',
      message:'Bla bla confirm some action?'})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
    });
  }

  showPrompt() {
    this.dialogService.addDialog(PromptComponent, {
      title:'Name dialog',
      question:'What is your name?: '})
      .subscribe((message)=>{
        //We get dialog result
        this.promptMessage = message;
      });
  }

  showAlert2() {
    this.dialogService.addDialog(AlertComponent, { message:'Click outside to close dialog' }, { closeByClickingOutside:true });
  }

  showAlert3() {
    this.dialogService.addDialog(AlertComponent, { message:'Wait 5 seconds and dialog will be closed automatically' }, { autoCloseTimeout:5000 });
  }

  showAlert4() {
    this.dialogService.addDialog(AlertComponent, { message:'Dialog with red backdrop' }, { backdropColor: 'rgba(255, 0, 0, 0.5)' });
  }
  showParentDialog() {
    this.dialogService.addDialog(ParentDialogComponent);
  }
}
