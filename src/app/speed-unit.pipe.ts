import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedUnit',
  standalone: true
})
export class SpeedUnitPipe implements PipeTransform {

  transform(value: number, unit: string): string {
    if (!value) return '';

    let convertedValue: number;
    let unitLabel: string;

    if (unit === 'mph') {
      convertedValue = value * 0.621371;
      unitLabel = 'mph';
    } else {
      convertedValue = value * 1.60934;
      unitLabel = 'km/h';
    }

    return `${convertedValue.toFixed(2)} ${unitLabel}`;
  }

}
