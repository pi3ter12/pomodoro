import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stepToRound'
})
export class StepToRoundPipe implements PipeTransform {

  transform(step: number): number {
    return Math.floor((step) / 2) + 1;
  }

}
