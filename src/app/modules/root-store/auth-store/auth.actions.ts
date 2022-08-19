import { IAppConfig, IUser } from '@longlv91/training-common/dist';
import { createAction, props } from '@ngrx/store';
import { AuthLoginModel, AuthReponseModel } from '../../../models';

export const loginAuths = createAction(
  '[Auth] Login Auths',
  props<AuthLoginModel>()
);

export const loginAuthsSuccess = createAction(
  '[Auth] Login Auths Success',
  props<{ res: AuthReponseModel, config: IAppConfig }>()
);

export const loginAuthsFailure = createAction(
  '[Auth] Login Auths Failure',
  props<{ error: any }>()
);

export const logoutAuths = createAction(
  '[Auth] Logout Auths'
);

export const logoutResponseAuths = createAction(
  '[Auth] Logout Response Auths'
);

export const redirectLoginAuths = createAction(
  '[Auth] Redirect Login Auths'
);

export const redirectSignupAuths = createAction(
  '[Auth] Redirect Signup Auths'
);

export const loadNavigationsAuths = createAction(
  '[Auth] Load Navigations Auths',
  props<{ res: AuthReponseModel }>()
);

export const requestUpdateUserSettings = createAction(
  '[Auth] Request Update User Settings',
  props<{ metadata: Record<string, any> }>()
);

export const updateUserSettings = createAction(
  '[Auth] Update User Settings',
  props<{ userInfo: IUser }>()
);
