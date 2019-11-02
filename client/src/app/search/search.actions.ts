import { createAction, props } from '@ngrx/store';

export const search = createAction('[Search] Update Search', props<{query: string}>());
export const searchComplete = createAction('[Search] Search Complete', props<{results: any[]}>());
