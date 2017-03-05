import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from "./confirm/confirm.component";
import { PromptComponent } from "./prompt/prompt.component";
import { ParentDialogComponent } from "./parent-dialog/parent-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    ParentDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    ParentDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
