import {
  add,
  differenceInCalendarYears,
  format,
  isAfter,
  isFuture,
  isToday,
  isValid,
  parseISO,
  formatISO,
  endOfYesterday,
  endOfToday,
  startOfDay,
  endOfMonth,
  startOfMonth,
  differenceInCalendarDays,
} from 'date-fns';
import parse from 'date-fns/parse';

export default class DateHelper {
  static getDateFnsLocale = () => {};

  static isValid = (date: unknown): boolean => {
    if (!date) {
      return false;
    }

    return isValid(date);
  };

  static parseISO = (date: string | null | undefined): Date | undefined => {
    if (!date) {
      return;
    }

    return parseISO(date);
  };

  static today = () => {
    return new Date();
  };

  static endOfYesterday = () => {
    return endOfYesterday();
  };

  static endOfToday = () => {
    return endOfToday();
  };

  static startOfDay = (date: Date | null | undefined): Date | undefined => {
    if (!date) {
      return;
    }

    return startOfDay(date);
  };

  static startOfMonth = (date: Date): Date => {
    return startOfMonth(date);
  };

  static endOfMonth = (date: Date): Date => {
    return endOfMonth(date);
  };

  static differenceInCalendarDays = (dateLeft: Date, dateRight: Date): number => {
    return differenceInCalendarDays(dateLeft, dateRight);
  };

  static formatISO = (date: Date) => {
    return formatISO(date);
  };

  static formatFromDate = (date: Date, customFormat = 'dd.MM.yyyy') => {
    return format(date, customFormat);
  };

  static format = (date: string | null | undefined, customFormat = 'dd.MM.yyyy'): string | undefined => {
    if (!date || !isValid(parseISO(date))) {
      return;
    }

    return format(parseISO(date), customFormat);
  };

  static differenceInCalendarYears = (dateLeft: Date, dateRight: Date) => {
    return differenceInCalendarYears(dateLeft, dateRight);
  };

  static add = (date: Date | number, duration: Duration) => {
    return add(date, duration);
  };

  static isAfter = (date: Date, dateToCompare: Date) => {
    return isAfter(date, dateToCompare);
  };

  static isFuture = (date: Date) => {
    return isFuture(date);
  };

  static getCurrentDateAsUTC = () => {
    const utcDate = new Date().toISOString();
    return utcDate.replace('T', ' ').replace('Z', '');
  };

  static formatTimeToTimezone = (date: string | null | undefined, checkToday = false, mask = 'H:mm') => {
    if (!date) {
      return '';
    }

    const d = DateHelper.createDateAsUTCFromString(date);

    if (checkToday && isToday(d)) {
      return format(d, mask);
    }

    return format(d, `dd MMM, ${mask}`);
  };

  static createDateAsUTCFromString = (data: string) => {
    let dataString = data;

    //убираем миллисекунды
    if (data[data.length - 4] === '.') {
      dataString = dataString?.slice(0, data.length - 4);
    }

    //https://stackoverflow.com/questions/55655273/date-fns-returns-invalid-date-on-safari
    dataString = dataString.split(' ').join('T') + 'Z';

    //https://github.com/date-fns/date-fns/issues/2130
    return parse('', '', new Date(dataString));
  };

  static getDateAndTimeWithoutTimeZone = (dateString: Date) => {
    return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm:ss");
  };
}
