import { useState, useEffect } from 'react';

export const useDate = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [date, _] = useState<[Date, Date]>([today, tomorrow]);
  return date;
};

export enum DayEnum {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export enum MonthEnum {
  JAN,
  FEB,
  MAR,
  APR,
  MAY,
  JUN,
  JUL,
  AUG,
  SEP,
  OCT,
  NOV,
  DEC,
}

export const getDateParts = (date: Date): [number, number, number, number] => {
  return (
    date && [date.getDay(), date.getDate(), date.getMonth(), date.getFullYear()]
  );
};
