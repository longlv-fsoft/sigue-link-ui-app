import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './conponents/manage/manage.component';
import { RolesComponent } from './conponents/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
  },
  {
    path: 'manage',
    component: ManageComponent,
    data: { title: 'Users' },
  },
  {
    path: 'roles',
    component: RolesComponent,
    data: { title: 'Roles' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
