import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { currentUser } from '../../modules/root-store/auth-store/auth.selectors';
import { AuthState } from '../../modules/root-store/auth-store/auth.reducer';
import { ThemeControlService } from '../../services/theme-control.service';
import { requestUpdateUserSettings } from '../../modules/root-store/auth-store/auth.actions';
import { Subscription } from 'rxjs';
import { SessionStorageService } from '../../services/session-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  openSetting = false;
  isLogined = false;
  isFirsttime = true;
  themeSetting: string = 'light';
  private subscriptions: Subscription = Subscription.EMPTY;
  constructor(
    private themeControlService: ThemeControlService,
    private sessionStorage: SessionStorageService,
    private authService: AuthService,
    private store: Store<AuthState>,
    ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(currentUser).subscribe(user => {
        if (this.isFirsttime && user && user.metadata && user.metadata['theme']) {
          this.themeSetting = user.metadata['theme'];
          this.toggleTheme();
        }
      })
    )
    this.subscriptions.add(
      this.sessionStorage.sessionChange$.subscribe(session => {
        if (session['userInfo'] && session['userInfo'].metadata && session['userInfo'].metadata.theme) {
          this.themeSetting = session['userInfo'].metadata['theme'];
        }
      })
    );
    this.subscriptions.add(
      this.authService.isLoggedInStore().subscribe(value => {
        this.isLogined = value;
      })
    )
  }


  open(): void {
    const userInfo = JSON.parse(this.sessionStorage.getData('userInfo') || '{}');
    if (userInfo && userInfo.metadata && userInfo.metadata.theme) {
      this.themeSetting = userInfo.metadata.theme;
    }
    this.openSetting = true;
  }

  close(): void {
    this.openSetting = false;
  }

  toggleTheme(): void {
    if (!this.isFirsttime && this.isLogined) {
      this.store.dispatch(requestUpdateUserSettings({metadata: {theme: this.themeSetting}}));
    }
    this.isFirsttime = false;
    this.themeControlService.switchTheme(this.themeSetting).then();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
