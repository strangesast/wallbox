import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    value = value - hours * 3600;
    const minutes = Math.floor(value / 60);
    value = value - minutes * 60;
    const seconds = value;
    let str = '';
    if (hours) {
      str += hours + ':' + ('0' + minutes).slice(-2) + ':';
    } else { // if (minutes) { // kinda weird only showing seconds
      str += minutes + ':';
    }
    str += ('0' + seconds.toFixed(2)).slice(-5);
    return str;
  }

}
