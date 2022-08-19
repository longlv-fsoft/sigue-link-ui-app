import { Action, createReducer, on } from '@ngrx/store';
import { IAppConfig, IUser, Role, StatusType } from '@longlv91/training-common/dist';
import { loginAuths, loginAuthsFailure, loginAuthsSuccess, logoutAuths, redirectLoginAuths, updateUserSettings } from './auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  isLogined: boolean;
  access_token: string;
  userInfo: IUser;
  navigations: IAppConfig;
}

export const initialState: AuthState = {
  isLogined: false,
  access_token: '',
  userInfo: {
    userId: '',
    name: '',
    pass: '',
    email: '',
    roles: [Role.ADMIN],
    isDelete: false,
    isResetPassword: true,
    status: StatusType.OFFLINE,
    createdBy: '',
    createdDate: new Date(),
    modifiedBy: '',
    modifiedDate: new Date(),
    addr1: {
      phone: '',
      street: '',
      province: '',
      district: '',
      country: '',
    }
  },
  navigations: {
    name: '',
    value: null,
    createdBy: '',
    createdDate: new Date(),
    modifiedBy: '',
    modifiedDate: new Date(),
  }
};

export const authReducer = createReducer(
  initialState,
  on(loginAuths, (state: AuthState, {}) => state),
  on(loginAuthsSuccess, (state: AuthState, { res, config }) => ({...state, isLogined: true, userInfo: res.userInfo, access_token: res.access_token, navigations: config })),
  on(loginAuthsFailure, (state: AuthState, { error }) => initialState),
  on(logoutAuths, (state: AuthState) => initialState),
  on(redirectLoginAuths, (state: AuthState) => initialState),
  on(updateUserSettings, (state: AuthState, { userInfo }) => ({...state, userInfo})),
);
