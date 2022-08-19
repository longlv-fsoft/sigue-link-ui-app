import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { TokenInterceptor } from './interceptors/token.interceptor';
import { TitleService } from './services/title.service';
import { reducers, metaReducers } from './reducers';
import { RootStoreModule } from './modules/root-store/root-store.module';
import { SessionStorageService } from './services/session-storage.service';
import { AppConfigService } from './services/app-config.service';
import { ThemeControlService } from './services/theme-control.service';
import { AppInitializerProvider } from './app-initializer.service';
import { AuthorizedPageComponent, UnauthorizedPageComponent } from './templates';
import { BreadcrumbComponent, FooterComponent, HeaderComponent } from './components';
import { DashboardComponent, LandingPageComponent, PageNotFoundComponent, SigninPageComponent, SignupPageComponent } from './pages';
import { ChartInstanceComponent } from './components/chart-instance/chart-instance.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { SharedModule } from './shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthorizedPageComponent,
    UnauthorizedPageComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    LandingPageComponent,
    SigninPageComponent,
    SignupPageComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ChartInstanceComponent,
    UserSettingsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RootStoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: (sessionService: SessionStorageService) => {
          return {
            tokenGetter: () => {
              return sessionService.getData('access_token');
            },
          }
        },
        deps: [SessionStorageService]
      },
    }),
    BrowserAnimationsModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    AppInitializerProvider,
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    TitleService,
    SessionStorageService,
    AppConfigService,
    ThemeControlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
