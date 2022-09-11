import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberToList'
})
export class NumberToListPipe implements PipeTransform {

  transform(value: number, increaseBy: number = 0): number[] {
    return [...new Array(value).keys()].map(value => value + increaseBy);
  }

}
