export default class NumberHelper {
  /**
   * Очищение значения от любых других символов кроме цифр.
   *
   * @param maskedValue значение с маской
   * @returns очищенные цифры от других символов
   */
  static getDigits = (value: string | null | undefined): string => {
    if (!value) {
      return '';
    }

    return value.replace(/\D+/g, '');
  };
}
