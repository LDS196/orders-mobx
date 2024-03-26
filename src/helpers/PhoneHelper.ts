import NumberHelper from './NumberHelper';

export default class PhoneHelper {
  /**
   * Форматирует номер под русский формат телефона через +7.
   *
   * Формат: +7 (###) ###-##-##
   *
   * @param phone номер телефона
   * @returns отформатированный номер
   */
  static russianFormat = (phone: string | undefined | null): string => {
    if (!phone) {
      return '';
    }

    // return pipe(phone, {
    //   mask: '+{7} (000) 000-00-00',
    // });
  };

  /**
   * @param phone форматированный номер
   * @returns только цифры и без кода страны (7).
   *
   * @example '+7 (999) 888-77-66' -> '9998887766'
   */
  static getRussianRawNumber = (phone: string | undefined | null): string => {
    if (!phone) {
      return '';
    }

    return NumberHelper.getDigits(phone).replace(/^7|^8/g, '');
  };
}
