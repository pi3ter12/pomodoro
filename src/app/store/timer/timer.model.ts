import {CurrentOption} from "../../main/card/timer/timer.service";

export interface TimerState {
  conf: {
    work: number;
    longBreak: number;
    shortBreak: number;
  },
  currentOption: CurrentOption;
  time: number;
  working: boolean;
  rounds: number
  currentStep: number;
}
