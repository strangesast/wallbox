import { createAction, props } from '@ngrx/store';

export const refresh = createAction('[Queue] Refresh');
export const refreshSuccess = createAction('[Queue] Refresh Success', props<{queue: any[]}>());
