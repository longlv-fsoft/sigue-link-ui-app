import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IChannel } from '@longlv91/training-common/dist';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = Subscription.EMPTY;
  activeChannel: IChannel | undefined;
  channels: IChannel[] = [];
  constructor(
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
