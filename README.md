#Angular2 Bootstrap Modal Service

Library to simplify the work with bootstrap modal dialogs

##Quickstart

### Step 1. import '**BootstrapModalModule**' module

app.module.ts:
```typescript
import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BootstrapModalModule
  ]
})
export class AppModule {}
```

###Step 2. Create your modal dialog component
Your modal dialog should be extended from **DialogComponent**.
**DialogComponent** waits **DialogService** as constructor argument.

confirm.component.ts:
```typescript
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'confirm',
  template: `<div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>`
})
export class ConfirmComponent extends DialogComponent {
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }
}
```

###Step 3. Register created component to module
Add component to **declarations** and **entryComponents** section because component
will be created dynamically.

app.module.ts:
```typescript
    import { NgModule} from '@angular/core';
    import { CommonModule } from "@angular/common";
    import { BootstrapModalModule } from 'ng2-bootstrap-modal';
    import { ConfirmComponent } from './confirm.component.ts';
    @NgModule({
      declarations: [
        ConfirmComponent
      ],
      imports: [
        CommonModule,
        BootstrapModalModule
      ],
      //Don't forget add component to **entryComponents** section
      entryComponents: [
        ConfirmComponent
      ]
    })
    export class AppModule {}
```

###Step 4. Usage

app.component.ts
```typescript
    import { Component } from '@angular/core';
    import { ConfirmComponent } from './confirm.component.ts';
    import { DialogService } from "ng2-bootstrap-modal";
    
    @Component({
      selector: 'app',
      template: `
        <div class="container">
          <button class="btn btn-default" (click)=showConfirm()>Show confirm</button>
        </div>
      `
    })
    export class AppComponent {
        constructor(private dialogService:DialogService) {}
        showConfirm() {
            let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Confirm title', 
                message:'Confirm message'}).subscribe((isConfirmed)=>{
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
            
            //If dialog was not closed manually close it by timeout
            setTimeout(()=>{
                disposable.unsubscribe();
            },10000);
        }
    }
```

##Documentation

###DialogComponent
Super class of all modal components.

####Class Overview
```typescript
abstract class DialogComponent {
    /**
    * Constructor
    * @param {DialogService} dialogService - instance of DialogService
    */
    constructor(dialogService: DialogService)
    
    /**
    * Dialog result 
    * @type {any}
    */
    protected result:any
    
    /**
    * Closes dialog
    */
    public close:Function
}
```

###DialogService 
Service to show dialogs

###Class Overview
```typescript
class DialogService {
    /**
    * Adds dialog
    * @param {Type<DialogComponent>} component
    * @param {any?} data
    * @param {number?} index
    * @return {Observable<any>}
    */
    public addDialog:(component:Type<DialogComponent>, data?:any, index?:number) => {}
}
```
