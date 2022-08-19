import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';



@Injectable()
export class UserEffects {

  constructor(private actions$: Actions) {}

}
