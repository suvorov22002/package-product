import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string | number | null, ...args: unknown[]): unknown {
    return value == null ? "" : moment(value).format('MMMM Do YYYY, h:mm:ss a');
  }

}
