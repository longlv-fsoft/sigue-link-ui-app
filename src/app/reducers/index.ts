import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';


import { environment } from '../../environments/environment';

export interface State {
    routerReducer: fromRouter.RouterReducerState;
}

export const reducers = {
    routerReducer: fromRouter.routerReducer
};

// console.log all actions
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        // console.log('state', state);
        // console.log('action', action);
        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [logger, storeFreeze]
    : [];
