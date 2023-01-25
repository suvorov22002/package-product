import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat'
})
export class MoneyFormatPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): unknown {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

}
