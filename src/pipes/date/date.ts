import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe',
})
export class DatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value) {
  	let date = new Date(value);
  	let fullYear: string = date.getFullYear().toString();
  	 console.log("piping date=>"+fullYear.length);
  	
  	fullYear = fullYear.substring(2);
  	let datestring = date.getDate()+'/'+(date.getMonth()+1)+'/'+fullYear;
  	return datestring;
  }
}
