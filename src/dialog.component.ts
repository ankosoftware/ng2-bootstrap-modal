import {
  Component, OnDestroy
} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {DialogWrapperComponent} from "./dialog-wrapper.component";
import {DialogService} from "./dialog.service";

@Component({
  selector: 'pagination'
})
export class DialogComponent implements OnDestroy {

  private observer: Observer<any>;

  protected result: any;

  wrapper: DialogWrapperComponent;

  constructor(protected dialogService: DialogService) {}

  fillData(data:any = {}) {
    let keys = Object.keys(data);
    for(let i=0, length=keys.length; i<length; i++) {
      let key = keys[i];
      this[key] = data[key];
    }
    return Observable.create((observer)=>{
      this.observer = observer;
      return ()=>{
        this.close();
      }
    });
  }

  close() {
    this.dialogService.removeDialog(this);
  }

  ngOnDestroy(): void {
    this.observer.next(this.result);
  }
}
