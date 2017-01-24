import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './confirm.component';
import { AlertComponent } from './alert.component';
import { PromptComponent } from './prompt.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmComponent,
    PromptComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BootstrapModalModule
  ],
  //Don't forget add component to entryComponents section
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
