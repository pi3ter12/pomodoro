import {createAction, props} from '@ngrx/store';
import {CurrentOption, Step, TimerState} from "./timer.model";

export const start = createAction(
  '[Timer] Start'
);

export const stop = createAction(
  '[Timer] Stop'
);

export const doTimerInterval = createAction(
  '[Timer] Do Timer Interval'
);

export const decreaseTimeByOneSecond = createAction(
  '[Timer] Decrease Time By One Second'
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
  props<{ option: CurrentOption, manuallyChanged: boolean }>()
)

export const setCurrentStep = createAction(
  '[Timer] Set Current Step',
  props<{ currentStep: number }>()
)

export const changeRound = createAction(
  '[Timer] Change Round',
  props<{ round: number }>()
)

export const changeAlarmState = createAction(
  '[Timer] Change Alarm State',
  props<{ isOn: boolean }>()
)

export const loadState = createAction(
  '[Timer] LoadState',
  props<{ newState: TimerState }>()
)
