import { format } from 'date-fns';
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

export function getAge(birthday: Date) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const formatDateTime = (time: Date) => {
  return format(new Date(time), 'HH:mm, dd/MM/yyy');
};

export const formatDate = (time: Date) => {
  return format(new Date(time), 'dd/MM/yyy');
};

export const formatterVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
});

export const getStartTimeAndEndTimeOfDay = (start: Date, end: Date) => {
  return {
    start: new Date(start.setHours(0, 0, 0, 0)),
    end: new Date(end.setHours(23, 59, 59, 999))
  };
};
