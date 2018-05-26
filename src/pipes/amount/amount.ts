import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountpipe',
})
export class AmountPipe implements PipeTransform {
  /**
   * Takes a value and add decimal point.
   */
  transform(value: number, ...args) {
  	return parseFloat((Math.round(value * 100) / 100).toString()).toFixed(2);
  }
}
