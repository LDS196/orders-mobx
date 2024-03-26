export default class ApiHelper {
  static getURLSearchParams = (object: any) => {
    const data = this.getOnlyFillData(object);

    return new URLSearchParams(data);
  };

  static getOnlyFillData = (object: any) => {
    const data = Object.assign(object);

    Object.keys(data).forEach((key) => {
      if (object[key] === null || object[key] === '' || object[key] === undefined) {
        delete object[key];
      }

      if (object[key] instanceof Map) {
        object[key].forEach((value: string, key: any) => {
          data[key] = `[${value}]`;
        });
        delete data[key];
      }
    });

    return data;
  };

  static getTrimStringValues = (object: Record<string, unknown>) => {
    const data = Object.assign(object);

    Object.keys(data).forEach((key) => {
      if (typeof object[key] === 'string') {
        data[key] = (object[key] as string).trim();
      }
    });

    return data;
  };
}
