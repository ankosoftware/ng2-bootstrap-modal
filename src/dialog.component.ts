import { OnDestroy
} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {DialogWrapperComponent} from "./dialog-wrapper.component";
import {DialogService} from "./dialog.service";

/**
 * Abstract dialog
 * @template T - dialog data;
 * @template T1 - dialog result
 */
export class DialogComponent<T, T1> implements OnDestroy {

  /**
   * Observer to return result from dialog
   */
  private observer: Observer<T1>;

  /**
   * Dialog result
   * @type {T1}
   */
  protected result: T1;

  /**
   * Dialog wrapper (modal placeholder)
   */
  wrapper: DialogWrapperComponent;

  /**
   * Constructor
   * @param {DialogService} dialogService - instance of DialogService
   */
  constructor(protected dialogService: DialogService) {}

  /**
   *
   * @param {T} data
   * @return {Observable<T1>}
   */
  fillData(data:T): Observable<T1> {
    data = data || <T>{};
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

  /**
   * Closes dialog
   */
  close():void {
    this.dialogService.removeDialog(this);
  }

  /**
   * OnDestroy handler
   * Sends dialog result to observer
   */
  ngOnDestroy(): void {
    if(this.observer) {
      this.observer.next(this.result);
    }
  }
}
