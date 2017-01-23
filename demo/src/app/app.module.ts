import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './confirm.component';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BootstrapModalModule
  ],
  //Don't forget add component to entryComponents section
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
