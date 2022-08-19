import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStoreModule } from './user-store/user-store.module';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { RouterStoreModule } from './router-store/router-store.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterStoreModule,
    UserStoreModule,
    AuthStoreModule,
  ]
})
export class RootStoreModule { }
