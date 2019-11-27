import { AbstractControl } from '@angular/forms';
import { isObservable } from 'rxjs';

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isObject(x: any) {
  return x != null && typeof x === 'object';
}

export function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function';
}

/**
 * Clones an object
 *
 * @export
 * @param  value to be clonned
 * @returns object clone
 */
export function clone(value: any): any {
  if (
    !isObject(value) ||
    isObservable(value) ||
    /* instanceof SafeHtmlImpl */ value.changingThisBreaksApplicationSecurity ||
    ['RegExp', 'FileList', 'File', 'Blob'].indexOf(value.constructor.name) !== -1
  ) {
    return value;
  }

  // https://github.com/moment/moment/blob/master/moment.js#L252
  if (value._isAMomentObject && isFunction(value.clone)) {
    return value.clone();
  }

  if (value instanceof AbstractControl) {
    return null;
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (Array.isArray(value)) {
    return value.slice(0).map(v => clone(v));
  }

  // best way to clone a js object maybe
  // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
  const proto = Object.getPrototypeOf(value);
  let c = Object.create(proto);
  c = Object.setPrototypeOf(c, proto);
  // need to make a deep copy so we dont use Object.assign
  // also Object.assign wont copy property descriptor exactly
  return Object.keys(value).reduce((newVal, prop) => {
    const propDesc = Object.getOwnPropertyDescriptor(value, prop);
    if (propDesc.get) {
      Object.defineProperty(newVal, prop, propDesc);
    } else {
      newVal[prop] = clone(value[prop]);
    }

    return newVal;
  }, c);
}
