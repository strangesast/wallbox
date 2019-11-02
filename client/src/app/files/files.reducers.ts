import { createReducer, on } from '@ngrx/store';
import * as filesActions from './files.actions';

export const initialState = {
  uri: '',
  fileList: [],
  fileListPending: false,
};

const _reducer = createReducer(initialState,
  on(filesActions.updateURI, (state, {value}) => ({...state, fileListPending: true, uri: value})),
  on(filesActions.updateURIComplete, (state, {results}) => ({...state, fileListPending: false, fileList: results})),
);

export function reducer(state, action) {
  return _reducer(state, action);
}

export const featureKey = 'files';
