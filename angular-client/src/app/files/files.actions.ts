import { createAction, props } from '@ngrx/store';

export const updateSearch = createAction('[Files] Update Search', props<{value: string}>());
export const updateSearchComplete = createAction('[Files] Update Search Complete', props<{results: []}>());
export const updateURI = createAction('[Files] Update URI', props<{value: string}>());
export const updateURIComplete = createAction('[Files] Update URI Complete', props<{results: []}>());
