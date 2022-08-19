import { Action, createReducer, on } from '@ngrx/store';
import { loadUsers } from './user.actions';


export const userFeatureKey = 'user';

export interface UserState {

}

export const initialState: UserState = {

};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state: UserState) => state)
);
