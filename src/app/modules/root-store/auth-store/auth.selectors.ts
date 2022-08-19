import { IAppConfig, IUser } from '@longlv91/training-common/dist';
import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const authState: MemoizedSelector<object, AuthState>
    = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn: MemoizedSelector<object, boolean>
    = createSelector(authState, state => state.isLogined);

export const accessToken: MemoizedSelector<object, string>
    = createSelector(authState, state => state.access_token);

export const currentUser: MemoizedSelector<object, IUser>
    = createSelector(authState, state => state.userInfo);

export const userMetadata: MemoizedSelector<object, any>
    = createSelector(authState, state => state.userInfo && state.userInfo.metadata);

export const navigations: MemoizedSelector<object, IAppConfig>
    = createSelector(authState, state => state.navigations);
