import {createReducer, on} from '@ngrx/store';

import {TimerState} from './timer.model';
import {setCurrentStep, setSelectedOption, setStep, start, stop} from "./timer.actions";
import {environment} from "../../../environments/environment";
import {CurrentOption, Step} from "../../main/card/timer/timer.service";


const generateSteps = (rounds: number): Step[] => { // todo: move to utils
  const steps: Step[] = [];
  let index = 0;
  for (let i = 0; i < rounds; i++) {
    steps.push({index: index, type: "work"})
    steps.push({index: index + 1, type: (i === rounds - 1) ? 'longBreak' : 'shortBreak'})
    index += 2;
  }
  return steps
}

const getNextCorrectStepInManualChange = (option: CurrentOption, state: TimerState): number => {
  const searchStep = (searchOption: CurrentOption, startIndex: number): number | undefined => {
    for (let i = startIndex; i < state.steps.length; i++) {
      const foundStep = state.steps?.find((item) => item.index === i)
      if (foundStep == null) {
        return undefined;
      }
      if (foundStep.type === searchOption) {
        return foundStep.index
      }
    }
    return undefined;
  }
  if (option !== state.steps?.find(item => item.index === state.currentStep)?.type) {
    let searchResult = searchStep(option, state.currentStep);
    if (searchResult == null) {
      searchResult = searchStep(option, 0);
    }
    return searchResult || 0;
  }
  return 0;
}

const getTimeByOption = (option: CurrentOption, state: TimerState): number => {
  const prepareResultList: { option: CurrentOption, time: number }[] = [
    {option: "work", time: state.conf.work},
    {option: "longBreak", time: state.conf.longBreak},
    {option: "shortBreak", time: state.conf.shortBreak},
  ]
  const find = prepareResultList.find(item => item.option === option);
  return (find == null) ? 0 : find.time;
}

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
  currentStep: 0,
  steps: generateSteps(environment.timerConf.rounds),
};

export const timerReducer = createReducer(
  initialState,
  on(setCurrentStep, (state, { currentStep }) =>({...state, currentStep: currentStep})),
  on(start, (state) => ({...state, working: true})),
  on(stop, (state) => ({...state, working: false})),
  on(setStep, (state, {step}) => step != null ? ({...state, currentStep: step.index}) : state),
  on(setSelectedOption, (state, {option, manuallyChanged}) => {
    let newCurrentStep = state.currentStep;
    if (manuallyChanged) {
      newCurrentStep = getNextCorrectStepInManualChange(option, state);
    }
    return {
      ...state,
      currentOption: option,
      currentStep: newCurrentStep,
      time: getTimeByOption(option, state)
    }
  })
);
