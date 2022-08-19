import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subscription = Subscription.EMPTY;
  constructor(
    private titleService: TitleService,
  ) { }

  ngOnDestroy(): void {
    if (this._unsubscribe) {
      this._unsubscribe.unsubscribe();
    }
  }

  ngOnInit() {
    this.titleService.init();
  }
}
