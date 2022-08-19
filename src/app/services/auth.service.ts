import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthLoginModel, AuthReponseModel } from '../models';
import { Store } from '@ngrx/store';
import { AuthState } from '../modules/root-store/auth-store/auth.reducer';
import { loginAuths, logoutAuths, redirectLoginAuths } from '../modules/root-store/auth-store/auth.actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionStorageService } from './session-storage.service';
import { isLoggedIn } from '../modules/root-store/auth-store/auth.selectors';
import { currentState, selectUrl } from '../modules/root-store/router-store/router.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private sessionStorage: SessionStorageService,
    private jwtHelper: JwtHelperService,
    private store: Store<AuthState>,
  ) { }

  isLoggedInStore() {
    return this.store.select(isLoggedIn);
  }

  logout() {
    this.store.dispatch(logoutAuths());
  }

  redirectLogin() {
    this.store.dispatch(redirectLoginAuths());
  }

  isAuthenticated(): boolean {
    const access_token = this.sessionStorage.getData('access_token') || '';
    // Check whether the token is expired and return
    return !this.jwtHelper.isTokenExpired(access_token);
  }

  routeChange() {
    return this.store.select(currentState);
  }

  routeURLChange() {
    return this.store.select(selectUrl);
  }

  submitLogin(data: AuthLoginModel) {
    this.store.dispatch(loginAuths(data));
  }

  login(postData: AuthLoginModel): Observable<AuthReponseModel> {
    return this.httpClient.post<AuthReponseModel>(environment.backend_api.login_context, postData);
  }

}
