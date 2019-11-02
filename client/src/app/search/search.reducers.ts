import { createReducer, on } from '@ngrx/store';
import * as searchActions from './search.actions';

export const initialState = {
  query: '',
  results: [],
  count: 0,
  loading: false,
};

const _reducer = createReducer(initialState,
  on(searchActions.search, (state, {query}) => ({...state, loading: true, query})),
  on(searchActions.searchComplete, (state, {results}) => ({...state, loading: false, results, count: results.length})),
);

export function reducer(state, action) {
  return _reducer(state, action);
}

export const featureKey = 'search';
