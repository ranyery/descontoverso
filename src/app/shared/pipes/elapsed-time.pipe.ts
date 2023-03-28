import { Pipe, PipeTransform } from '@angular/core';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {
  transform(value: string): string {
    const approvedAt = new Date(value);

    if (isNaN(approvedAt.getTime())) return '';

    const now = new Date();
    const elapsedMilliseconds = now.getTime() - approvedAt.getTime();
    const elapsedSeconds = elapsedMilliseconds / MILLISECONDS_IN_SECOND;
    const elapsedMinutes = Math.round(elapsedSeconds / SECONDS_IN_MINUTE);
    const elapsedHours = Math.round(elapsedMinutes / MINUTES_IN_HOUR);
    const elapsedDays = Math.round(elapsedHours / HOURS_IN_DAY);

    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} minuto${elapsedMinutes > 1 ? 's' : ''}`;
    } else if (elapsedHours < 24) {
      return `${elapsedHours} hora${elapsedHours > 1 ? 's' : ''}`;
    } else {
      return `${elapsedDays} dia${elapsedDays > 1 ? 's' : ''}`;
    }
  }
}
