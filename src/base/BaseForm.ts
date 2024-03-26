import { action, IObservableFactory, makeObservable, observable } from 'mobx';

export class BaseForm {
  constructor(props?: any) {
    this.load(props);
  }

  getAttributes(): string[] {
    return Object.keys(this);
  }

  load(data: any): void {
    const attributes = this.getAttributes();

    for (let i = 0; i < attributes.length; i++) {
      if (data && data.hasOwnProperty(attributes[i])) {
        this[attributes[i] as keyof this] = data[attributes[i]];
      }
    }
  }

  createObservable() {
    return makeObservable(this, { setValue: action, load: action, setValues: action });
  }

  makeObservableValues<T extends Object>(fieldsEnum: T): { [key: string]: IObservableFactory } {
    const keys: any = Object.values(fieldsEnum || {});
    const observableValues: { [key: string]: IObservableFactory } = {};

    if (!keys.length) {
      return observableValues;
    }

    for (let i = 0; i < keys.length; i++) {
      observableValues[keys[i]] = observable;
    }

    return observableValues;
  }

  setValue<T>(key: keyof T, value: any): void {
    if (typeof (this as any)[key] !== 'function') {
      (this as any)[key] = value;
    }
  }

  setValues(props: any) {
    this.load(props);
  }

  static create(props?: any): any {
    return new this(props);
  }
}
