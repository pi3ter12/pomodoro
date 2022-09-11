import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Pipe({
  name: 'toFormControl'
})
export class ToFormControlPipe implements PipeTransform {

  transform(value: AbstractControl | null): FormControl | null {
    if (value == null) {
      return null;
    }
    return value as FormControl;
  }

}
