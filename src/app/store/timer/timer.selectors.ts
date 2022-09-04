import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TimerState} from "./timer.model";

export const selectTimerCollection = createFeatureSelector<
  Readonly<TimerState>
  >('timer');

export const selectCurrentStep = createSelector(
  selectTimerCollection,
  (timer) => timer.currentStep
);
