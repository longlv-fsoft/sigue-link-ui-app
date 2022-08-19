import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMenuConfig } from '@longlv91/training-common/dist';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-authorized-page',
  templateUrl: './authorized-page.component.html',
  styleUrls: ['./authorized-page.component.scss']
})
export class AuthorizedPageComponent implements OnInit, OnDestroy {

  private _unsubscribe: Subscription = Subscription.EMPTY;
  isCollapsed = false;
  menus: IMenuConfig[] = [];
  constructor(private appConfigService: AppConfigService) { }

  ngOnInit(): void {
    const timeout = setTimeout(() => {
      this._unsubscribe.add(this.appConfigService.navigationRepository().subscribe(data => {
        this.menus = data.value;
        clearTimeout(timeout);
      }));
    }, 1000)
    
  }

  ngOnDestroy(): void {
    if (this._unsubscribe) {
      this._unsubscribe.unsubscribe();
    }
  }

}
