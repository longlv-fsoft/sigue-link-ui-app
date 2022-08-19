import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

// `router` is used as the default feature name. You can use the feature name
// of your choice by creating a feature selector and pass it to the `getSelectors` function

export const selectRouter = createFeatureSelector<RouterReducerState>('routerReducer');

export const currentState: MemoizedSelector<object, any>
    = createSelector(selectRouter, state => state.state);

export const currentUrl: MemoizedSelector<object, string>
    = createSelector(selectRouter, state => state.state.url);

export const {
    selectCurrentRoute, // select the current route
    selectFragment, // select the current route fragment
    selectQueryParams, // select the current route query params
    selectQueryParam, // factory function to select a query param
    selectRouteParams, // select the current route params
    selectRouteParam, // factory function to select a route param
    selectRouteData, // select the current route data
    selectUrl, // select the current url
} = getSelectors();