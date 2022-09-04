import {CurrentOption, Step, TimerState} from "./timer.model";

export class TimerUtil {
  static generateSteps = (rounds: number): Step[] => {
    const steps: Step[] = [];
    let index = 0;
    for (let i = 0; i < rounds; i++) {
      steps.push({index: index, type: "work"})
      steps.push({index: index + 1, type: (i === rounds - 1) ? 'longBreak' : 'shortBreak'})
      index += 2;
    }
    return steps
  }

  static getNextCorrectStepInManualChange = (option: CurrentOption, state: TimerState): number => {
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

  static getTimeByOption = (option: CurrentOption, state: TimerState): number => {
    const prepareResultList: { option: CurrentOption, time: number }[] = [
      {option: "work", time: state.conf.work},
      {option: "longBreak", time: state.conf.longBreak},
      {option: "shortBreak", time: state.conf.shortBreak},
    ]
    const find = prepareResultList.find(item => item.option === option);
    return (find == null) ? 0 : find.time;
  }
}
