import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): unknown {
    return value == null ? "" : value.split('_').join(' ');
  }

}
