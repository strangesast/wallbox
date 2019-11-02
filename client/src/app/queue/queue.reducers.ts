import { createReducer, on } from '@ngrx/store';
import * as queueActions from './queue.actions';

export const initialState = {
  queue: [],
  loading: false,
};

const _reducer = createReducer(initialState,
  on(queueActions.refresh, state => ({...state, loading: true})),
  on(queueActions.refreshSuccess, (state, {queue}) => ({...state, loading: false, queue})),
);

export function reducer(state, action) {
  return _reducer(state, action);
}

export const featureKey = 'queue';
