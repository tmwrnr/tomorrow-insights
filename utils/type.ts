/**
 * Returns whether the payload is undefined
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
export function isUndefined(payload: unknown): payload is undefined {
  return typeof payload === 'undefined';
}

/**
 * Returns whether the payload is null
 *
 * @param {*} payload
 * @returns {payload is null}
 */
export function isNull(payload: unknown): payload is null {
  return payload === null;
}

/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
export function isObject(payload: unknown): payload is object {
  return (
    !isUndefined(payload) && !isNull(payload) && typeof payload === 'object'
  );
}

/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is { [K in unknown]: never }}
 */
export function isEmptyObject(
  payload: unknown
): payload is { [K in string]: never } {
  return isObject(payload) && Object.keys(payload).length === 0;
}

/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
export function isFullObject(payload: unknown): payload is object {
  return isObject(payload) && Object.keys(payload).length > 0;
}

/**
 * Returns whether the payload is a function (regular or async)
 *
 * @param {*} payload
 * @returns {payload is unknownFunction}
 */
export function isFunction(payload: unknown): payload is Function {
  return typeof payload === 'function';
}

/**
 * Returns whether the payload is an array
 *
 * @param {unknown} payload
 * @returns {payload is unknown[]}
 */
export function isArray(payload: unknown): payload is unknown[] {
  return Array.isArray(payload);
}

/**
 * Returns whether the payload is a an array with at least 1 item
 *
 * @param {*} payload
 * @returns {payload is unknown[]}
 */
export function isFullArray(payload: unknown): payload is unknown[] {
  return isArray(payload) && payload.length > 0;
}

/**
 * Returns whether the payload is a an empty array
 *
 * @param {*} payload
 * @returns {payload is []}
 */
export function isEmptyArray(payload: unknown): payload is [] {
  return isArray(payload) && payload.length === 0;
}

/**
 * Returns whether the payload is a string
 *
 * @param {*} payload
 * @returns {payload is string}
 */
export function isString(payload: unknown): payload is string {
  return typeof payload === 'string';
}

/**
 * Returns whether the payload is a string, BUT returns false for ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
export function isFullString(payload: unknown): payload is string {
  return isString(payload) && payload !== '';
}

/**
 * Returns whether the payload is ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
export function isEmptyString(payload: unknown): payload is string {
  return payload === '';
}

/**
 * Returns whether the payload is a number (but not NaN)
 *
 * This will return `false` for `NaN`!!
 *
 * @param {*} payload
 * @returns {payload is number}
 */
export function isNumber(payload: unknown): payload is number {
  return typeof payload === 'number' && !isNaN(payload);
}

/**
 * Returns whether the payload is a positive number (but not 0)
 *
 * @param {*} payload
 * @returns {payload is number}
 */
export function isPositiveNumber(payload: unknown): payload is number {
  return isNumber(payload) && payload > 0;
}

/**
 * Returns whether the payload is a negative number (but not 0)
 *
 * @param {*} payload
 * @returns {payload is number}
 */
export function isNegativeNumber(payload: unknown): payload is number {
  return isNumber(payload) && payload < 0;
}

/**
 * Returns whether the payload is a boolean
 *
 * @param {*} payload
 * @returns {payload is boolean}
 */
export function isBoolean(payload: unknown): payload is boolean {
  return typeof payload === 'boolean';
}

/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */
export function isSymbol(payload: unknown): payload is symbol {
  return typeof payload === 'symbol';
}

/**
 * Returns whether the payload is a Date, and that the date is valid
 *
 * @param {*} payload
 * @returns {payload is Date}
 */
export function isDate(payload: unknown): payload is Date {
  return payload instanceof Date;
}

/**
 * Returns whether the payload is a Blob
 *
 * @param {*} payload
 * @returns {payload is Blob}
 */
export function isBlob(payload: unknown): payload is Blob {
  return payload instanceof Blob;
}

/**
 * Returns whether the payload is a File
 *
 * @param {*} payload
 * @returns {payload is File}
 */
export function isFile(payload: unknown): payload is File {
  return payload instanceof File;
}

/**
 * Returns whether the payload is a Promise
 *
 * @param {*} payload
 * @returns {payload is Promise<unknown>}
 */
export function isPromise(payload: unknown): payload is Promise<unknown> {
  return payload instanceof Promise;
}

/**
 * Returns whether the payload is an Error
 *
 * @param {*} payload
 * @returns {payload is Error}
 */
export function isError(payload: unknown): payload is Error {
  return payload instanceof Error;
}

/**
 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
 *
 * @param {*} payload
 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
 */
export function isPrimitive(
  payload: unknown
): payload is boolean | null | undefined | number | string | symbol {
  return (
    isBoolean(payload) ||
    isNull(payload) ||
    isUndefined(payload) ||
    isNumber(payload) ||
    isString(payload) ||
    isSymbol(payload)
  );
}
