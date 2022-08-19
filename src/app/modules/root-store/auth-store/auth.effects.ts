import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError,  exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';
import { SessionStorageService } from '../../../services/session-storage.service';
import { AuthService } from '../../../services/auth.service';
import { loadNavigationsAuths, loginAuths, loginAuthsFailure, loginAuthsSuccess, logoutAuths, logoutResponseAuths, redirectLoginAuths, requestUpdateUserSettings, updateUserSettings } from './auth.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../services/app-config.service';
import { UsersService } from '../../../services/users.service';
import { ThemeControlService } from '../../../services/theme-control.service';



@Injectable()
export class AuthEffects implements OnInitEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAuths),
      exhaustMap(payload =>
        this.authService.login(payload).pipe(
          map(data => {
            this.sessionStorage.setData('access_token', data.access_token);
            this.sessionStorage.setData('userInfo', JSON.stringify(data.userInfo));
            if (data.userInfo.metadata && data.userInfo.metadata['theme']) {
              this.themeService.switchTheme(data.userInfo.metadata['theme']);
            }
            return data;
          }),
          switchMap(data => {
            return forkJoin([of(data), this.appConfigService.getMenus()])
          }),
          map(value => {
            const [data, config] = value;
            this.router.navigate(['/']);
            return loginAuthsSuccess({ res: data, config });
          }),
          catchError(error => {
            console.log(error);
            return of(loginAuthsFailure({ error }))
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAuths),
      exhaustMap(() => {
        this.sessionStorage.clearData(['access_token', 'userInfo']);
        this.router.navigate(['/']);
        return of(logoutResponseAuths());
      })
    )
  );

  redirectLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(redirectLoginAuths),
      exhaustMap(() => {
        this.router.navigate(['/signin']);
        return of(logoutResponseAuths());
      })
    )
  );

  loadNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNavigationsAuths),
      exhaustMap((payload) => 
        this.appConfigService.getMenus().pipe(
          map(menu => loginAuthsSuccess({ res: payload.res, config: menu})),
          catchError(error => {
            console.log(error);
            return of(loginAuthsFailure({ error }))
          })
        )
      )
    )
  );

  requestUpdateUserSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUpdateUserSettings),
      exhaustMap((payload) => 
        this.userService.updateMetadata(payload.metadata).pipe(
          map(user => {
            this.sessionStorage.setData('userInfo', JSON.stringify(user));
            return updateUserSettings({ userInfo: user})
          }),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appConfigService: AppConfigService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private userService: UsersService,
    private themeService: ThemeControlService,
  ) { }

  ngrxOnInitEffects(): Action {
    const access_token = this.sessionStorage.getData('access_token');
    const userInfo = JSON.parse(this.sessionStorage.getData('userInfo') || 'null');
    if (access_token && userInfo) {
      if (userInfo.metadata && userInfo.metadata.theme) {
        this.themeService.switchTheme(userInfo.metadata.theme);
      }
      return loadNavigationsAuths({ res: { access_token, userInfo }})
    } else {
      return loginAuthsFailure({ error: 'Session is empty' })
    }
  }

}
