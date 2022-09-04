import {createAction, props} from '@ngrx/store';
import {Step} from "./timer.model";
import {CurrentOption} from "../../main/card/timer/timer.service";

// export const setCurrentStep = createAction(
//   '[Timer] Set Current Step',
//   props<{ stepId: number }>()
// );

export const start = createAction(
  '[Timer] Start'
);

export const stop = createAction(
  '[Timer] Stop'
);

export const decreaseTimeByOneSecond = createAction(
  '[Timer] Decrease Time By One Second'
)
export const manuallyChangeOption = createAction(
  '[Timer] Manually Change Option',
  props<{ next: boolean }>()
)
export const changeOption = createAction(
  '[Timer] Change Option',
  props<{ next: boolean }>()
)
export const setStep = createAction(
  '[Timer] Set Step',
  props<{ step: Step | undefined }>()
)
export const setSelectedOption = createAction(
  '[Timer] Set Selected Option',
  props<{ option: CurrentOption, manuallyChanged: boolean}>()
)

export const setCurrentStep = createAction(
  '[Timer] Set Current Step',
  props<{ currentStep: number }>()
)
