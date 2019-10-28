import { createReducer, on } from '@ngrx/store';
import * as filesActions from './files.actions';

export const initialState = {
  search: '',
  searchResults: [],
  searchPending: false,
  uri: '',
  fileList: [],
  fileListPending: false,
};

const _reducer = createReducer(initialState,
  on(filesActions.updateSearch, (state, {value}) => ({ ...state, searchPending: true, search: value })),
  on(filesActions.updateSearchComplete, (state, {results}) => ({...state, searchPending: false, searchResults: results})),
  on(filesActions.updateURI, (state, {value}) => ({...state, fileListPending: true, uri: value})),
  on(filesActions.updateURIComplete, (state, {results}) => ({...state, fileListPending: false, fileList: results})),
);

export function filesReducer(state, action) {
  return _reducer(state, action);
}
