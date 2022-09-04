import { createReducer, on } from '@ngrx/store';

import { TimerState } from './timer.model';
import {setCurrentStep} from "./timer.actions";
import {environment} from "../../../environments/environment";

export const initialState: Readonly<TimerState> = {
  conf: {
    work: environment.timerConf.work,
    longBreak: environment.timerConf.longBreak,
    shortBreak: environment.timerConf.shortBreak
  },
  time: environment.timerConf.work,
  currentOption: "work",
  working: false,
  rounds: environment.timerConf.rounds,
  currentStep: 0
};

export const timerReducer = createReducer(
  initialState,
  on(setCurrentStep, (state, { stepId }) =>({...state, currentStep: stepId}))
);
