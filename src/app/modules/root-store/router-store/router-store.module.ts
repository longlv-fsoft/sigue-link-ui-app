import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

const routerFeatureKey = 'router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(routerFeatureKey, routerReducer),
  ]
})
export class RouterStoreModule { }
