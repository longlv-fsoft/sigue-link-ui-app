import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUrl, selectRouteData } from '../../modules/root-store/router-store/router.selector';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent implements OnInit, OnDestroy {

  showAllPage: boolean = true;
  private _unsubscribe: Subscription = Subscription.EMPTY;

  constructor(private store: Store<RouterReducerState>,) { }

  ngOnInit(): void {
    this._unsubscribe.add(
      this.store.select(selectUrl).subscribe(url => {
        if (url !== '/home') {
          this.showAllPage = false;
        } else {
          this.showAllPage = true;
        }
      })
    );
    this._unsubscribe.add(
      this.store.select(selectRouteData).subscribe(data => {
        // console.log(data)
      })
    );
  }

  ngOnDestroy(): void {
    if (this._unsubscribe) {
      this._unsubscribe.unsubscribe();
    }
  }

}
