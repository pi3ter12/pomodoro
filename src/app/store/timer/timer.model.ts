export interface TimerState {
  conf: {
    work: number;
    longBreak: number;
    shortBreak: number;
  },
  currentOption: CurrentOption;
  baseTime: number;
  time: number;
  timerStartTime: Date | undefined,
  working: boolean;
  rounds: number;
  currentStep: number;
  steps: Step[];
  playAlarm: boolean;
  openSettings: boolean;
  theme: Theme,
}

export type CurrentOption = 'work' | 'longBreak' | 'shortBreak';
export type Theme = 'settings' | CurrentOption;

export interface Step {
  index: number;
  type: CurrentOption;
}

export interface ControlPanelConf {
  working: boolean;
  rounds: number;
  currentStep: number;
  currentOption: CurrentOption;
}


export interface FooterConf {
  currentStep: number;
  currentOption: CurrentOption;
}

export interface SettingsConf {
  conf: {
    work: number;
    longBreak: number;
    shortBreak: number;
  },
  rounds: number;
  //todo: alarm time
}
