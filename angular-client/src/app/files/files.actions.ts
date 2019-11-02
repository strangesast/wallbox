import { createAction, props } from '@ngrx/store';

export const updateURI = createAction('[Files] Update URI', props<{value: string}>());
export const updateURIComplete = createAction('[Files] Update URI Complete', props<{results: any[]}>());
