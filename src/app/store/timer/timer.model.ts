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
  steps: Step[];
}

export type CurrentOption = 'work' | 'longBreak' | 'shortBreak';

export interface Step {
  index: number;
  type: CurrentOption;
}
