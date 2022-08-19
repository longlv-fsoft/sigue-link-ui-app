import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import {
  DashboardComponent,
  PageNotFoundComponent,
  SigninPageComponent,
} from './pages';
import {
  AuthorizedPageComponent,
  UnauthorizedPageComponent,
} from './templates';

const routes: Routes = [
  {
    path: '',
    component: UnauthorizedPageComponent,
    data: { title: 'Unauthorized Page' },
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        component: SigninPageComponent,
        canActivate: [PublicGuard],
        data: { title: 'Sign in Page', single: true },
      }
    ],
  },
  {
    path: 'admin',
    component: AuthorizedPageComponent,
    data: { title: 'Admin' },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
