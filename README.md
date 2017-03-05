#Angular2 Bootstrap Modal Service

It is a library to make usage of bootstrap modal plugin easier in Angular2. 
Create clear and reusable modal components.
It makes managing dialogs painless and more clear. 

Library does not use bootstrap js, only css.

Compatible with bootstrap 3 and bootstrap 4.



##Installation
```npm
npm install ng2-bootstrap-modal
```
See [Live Demo](https://plnkr.co/edit/MB6NnzfhicMyAiMJy6YM?p=preview) 

###Without bootstrap?
Yes, you can create your own css. Just write css for .modal and .modal-dialog classes.

```css
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}

.fade {
    opacity: 0;
    -webkit-transition: opacity .15s linear;
    -o-transition: opacity .15s linear;
    transition: opacity .15s linear;
}

.fade.in {
    opacity: 1;
}

.modal-dialog {
    position: relative;
    width: auto;
    margin: 10px;
}

.modal.in .modal-dialog {
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    -o-transform: translate(0,0);
    transform: translate(0,0);
}

.modal.fade .modal-dialog {
    -webkit-transition: -webkit-transform .3s ease-out;
    -o-transition: -o-transform .3s ease-out;
    transition: transform .3s ease-out;
    -webkit-transform: translate(0,-25%);
    -ms-transform: translate(0,-25%);
    -o-transform: translate(0,-25%);
    transform: translate(0,-25%);
}

@media (min-width: 768px) {
    .modal-dialog {
        width: 600px;
        margin: 30px auto;
    }
}
```

##Quickstart

### Step 1. add bootstrap css  
You can add bootstrap css from cdn
```html
<!-- Bootstrap 3.x -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```
or 
```html
<!-- Bootstrap 4.x -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
```


### Step 1. import '**BootstrapModalModule**' module

app.module.ts:
```typescript
import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BootstrapModalModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
By default dialogs placeholder will be added to AppComponent.
But you can select custom placeholder (for example document body):
```typescript
imports: [
    ...
    BootstrapModalModule.forRoot({container:document.body})
  ]
```


###Step 2. Create your modal dialog component
Your modal dialog is expected to be extended from **DialogComponent**.
**DialogService** is generic class with two arguments:
1) input dialog data type (data to initialize component);
2) dialog result type;

Therefore **DialogService** is supposed to be a constructor argument of **DialogComponent**.

confirm.component.ts:
```typescript
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
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
                 </div>
              </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}
```

###Step 3. Register created component to module
Add component to **declarations** and **entryComponents** section because component
will be created dynamically.

app.module.ts:
```typescrit
    import { NgModule} from '@angular/core';
    import { CommonModule } from "@angular/common";
    import { BrowserModule } from '@angular/platform-browser';
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
      //Don't forget to add the component to entryComponents section
      entryComponents: [
        ConfirmComponent
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
```

###Step 4. Usage

app.component.ts
```typescript
    import { Component } from '@angular/core';
    import { ConfirmComponent } from './confirm.component';
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
                message:'Confirm message'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
            //We can close dialog calling disposable.unsubscribe();
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
/**
* Dialog abstract class
* @template T1 - input dialog data
* @template T2 - dialog result
*/
abstract class DialogComponent<T1, T2> implements T1 {
    /**
    * Constructor
    * @param {DialogService} dialogService - instance of DialogService
    */
    constructor(dialogService: DialogService)
    
    /**
    * Dialog result 
    * @type {T2}
    */
    protected result:T2
    
    /**
    * Closes dialog
    */
    public close:Function
}
```

###DialogOptions 
```typescript
interface DialogOptions {
  /**
  * Dialog index (optional) to set order of modals
  * @type {number}
  */
  index?: number;
 
  /**
  * Timestamp to close dialog automatically after timeout (in msec)
  * @type {number}
  */
  autoCloseTimeout?: number;
  
  /**
  * Flag to close dialog by click on backdrop (outside dialog)
  * @type {boolean}
  */
  closeByClickingOutside?: boolean;
  
  /**
   * Custom backdrop color
   * Default backdrop color you can set via css (.modal {backgroundColor:...})
   * @type {string}
   */
  backdropColor?: string;
}
```

###DialogService 
Service to show dialogs

###Class Overview
```typescript
class DialogService {
    /**
    * Adds dialog
    * @param {Type<DialogComponent<T1, T2>} component - Modal dialog component
    * @param {T1?} data - Initialization data for component (optional) to add to component instance and can be used in component code or template 
    * @param {DialogOptions?} Dialog options
    * @return {Observable<T2>} - returns Observable to get dialog result
    */
    public addDialog<T1, T2>(component:Type<DialogComponent<T1, T2>>, data?:T1, options: DialogOptions): Observable<T2> => {}
}
```
