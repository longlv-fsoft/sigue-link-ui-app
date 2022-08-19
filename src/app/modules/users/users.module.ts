import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ManageComponent } from './conponents/manage/manage.component';
import { RolesComponent } from './conponents/roles/roles.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
