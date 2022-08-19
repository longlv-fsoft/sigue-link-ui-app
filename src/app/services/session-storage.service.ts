import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  sessionChange$: Subject<Record<string, any>> = new Subject();

  constructor() { }

  setData(name: string, value: string) {
    sessionStorage.setItem(name, value);
    this.sessionChange$.next({ name: value });
  }
  getData(name: string) {
    return sessionStorage.getItem(name);
  }

  updateUserMetadata(metadata: Record<string, any>) {
    const userInfo = JSON.parse(this.getData('userInfo') || 'null');
    if (userInfo && userInfo.metadata) {
      userInfo.metadata = {...userInfo.metadata, ...metadata};
      this.setData('userInfo', JSON.stringify(userInfo));
    }
  }

  clearData(names: string[]) {
    names.forEach(v => { sessionStorage.removeItem(v) });
  }

}