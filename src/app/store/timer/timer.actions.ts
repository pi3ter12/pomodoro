import { createAction, props } from '@ngrx/store';

export const setCurrentStep = createAction(
  '[Timer] Set Current Step',
  props<{ stepId: number }>()
);
