import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppConfig } from "@longlv91/training-common/dist";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { AuthState } from "../modules/root-store/auth-store/auth.reducer";
import { navigations } from '../modules/root-store/auth-store/auth.selectors';

@Injectable({
    providedIn: 'root'
  })
  export class AppConfigService {
    constructor(
      private httpClient: HttpClient,
      private store: Store<AuthState>,
    ) { }

    navigationRepository(): Observable<IAppConfig> {
      return this.store.select(navigations);
    }

    getMenus(): Observable<IAppConfig> {
      return this.httpClient.get<IAppConfig>(environment.backend_api.menu_context);
    }
  }