import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyOrNullNa'
})
export class EmptyOrNullNaPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value == null || value.toString().trim() == "" ? "N/A" : value;
  }

}
