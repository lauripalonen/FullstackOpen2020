/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const toNewPatient = (object: any): NewPatient => {
  if (!objectIsPatient(object)) {
    throw new Error('Object is malformatted');
  }

  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.ssn),
    gender: parseGender(object.gender)
  };

  return newPatient;
};

const parseName = (name: any): string => {
  if (!name || !isString(name) || name.split(" ").length < 2) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  const splittedSsn = ssn.split("-");

  if (splittedSsn[0].length != 8 || splittedSsn[1].length != 4) {
    throw new Error('Malformatted ssn');
  }

  return ssn;
};

const parseOccupation = (field: any): string => {
  if (!field || !isString(field)) {
    throw new Error('Incorrect or missing content');
  }

  return field;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const objectIsPatient = (object: any): object is NewPatient => {
  const asNewPatient = object as NewPatient;
  if (!asNewPatient.name ||
    !asNewPatient.dateOfBirth ||
    !asNewPatient.ssn ||
    !asNewPatient.gender ||
    !asNewPatient.occupation) {
    return false;
  }

  return true;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


export default toNewPatient;