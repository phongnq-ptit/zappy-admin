import _ from 'lodash';

export function convertFormData(data: Object) {
  const formData = new FormData();
  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export function getDiff<T>(a: Record<string, Object>, b: T) {
  return _.omitBy(a, (value, key) => value === b[key]);
}
