/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  HealthCheckRating,
  Diagnose,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  Discharge,
  NewEntry
} from './types';

export const toNewPatient = (object: any): NewPatient => {
  if (!objectIsPatient(object)) {
    throw new Error('Object is malformatted');
  }

  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
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

  if (splittedSsn[0].length != 6) {
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

// const parseEntries = (object: any): Entry[] => {
//   const entries = object as Entry[];
//   if (!entries) {
//     throw new Error('no entries');
//   }

//   entries.forEach(entry => {
//     if (!entry.type) {
//       throw new Error("missing entry type");
//     }

//     if (!(entry.type === 'HealthCheck'
//       || entry.type === 'Hospital'
//       || entry.type === 'OccupationalHealthcare')) {
//       throw new Error("incorrect entry type");
//     }
//   });

//   return entries;
// };

export const toNewEntry = (object: any): NewEntry => {
  const entry = object as Entry;
  if (!entry) {
    throw new Error('No entry');
  }

  if (!isEntry(entry)) {
    throw new Error('Malformatted entry');
  }

  if (!entry.type) {
    throw new Error('Missing entry type');
  }

  if (entry.type === 'HealthCheck') {
    if (!isHealthCheckEntry(entry)) {
      throw new Error('Malformatted health check entry');
    }
  }

  if (entry.type === 'Hospital') {
    if (!isHospitalEntry(entry)) {
      throw new Error('Malformatted hospital entry');
    }
  }

  if (entry.type === 'OccupationalHealthcare') {
    if (!isOccupationalHealthcareEntry(entry)) {
      throw new Error('Malformatted occupational healthcare entry');
    }
  }

  return entry;
};

const isEntry = (object: any): object is Entry => {
  const { type, description, date, specialist, diagnosisCodes } = object as Entry;
  if (
    !isEntryType(type) ||
    !isString(description) ||
    !isDate(date) ||
    !isString(specialist)
  ) {
    throw new Error('malformatted entry');
  }

  if (diagnosisCodes) {
    if (!isStringArray(diagnosisCodes)) {
      throw new Error('malformatted diagnosis codes');
    }
  }

  return true;
};

const isEntryType = (object: any): boolean => {
  return (object === 'Hospital' || object === 'HealthCheck' || object === 'OccupationalHealthcare');
};

const isHealthCheckEntry = (object: any): object is HealthCheckEntry => {
  const { type, healthCheckRating } = object as HealthCheckEntry;

  if (
    type != 'HealthCheck' ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error('invalid health check entry');
  }

  return true;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isOccupationalHealthcareEntry = (object: any): object is OccupationalHealthcareEntry => {
  const { type, employerName, sickLeave } = object as OccupationalHealthcareEntry;
  if (
    type != 'OccupationalHealthcare' ||
    !isString(employerName) ||
    !isSickLeave(sickLeave)
  ) {
    return false;
  }
  return true;
};

const isHospitalEntry = (object: any): object is HospitalEntry => {
  const { type, discharge } = object as HospitalEntry;
  if (
    type != 'Hospital' ||
    !isDischarge(discharge)
  ) {
    return false;
  }

  return true;
};

const isDischarge = (object: any): object is Discharge => {
  const { date, criteria } = object as Discharge;
  if (
    !isString(date) ||
    !isString(criteria)
  ) {
    return false;
  }

  return true;
};

const isStringArray = (object: any): object is Array<string> => {
  const diagnosisCodes = object as Array<Diagnose['code']>;
  let objectIsStringArray = true;
  diagnosisCodes.forEach(code => {
    if (!isString(code)) {
      objectIsStringArray = false;
    }
  });

  return objectIsStringArray;
};

const isSickLeave = (object: any): object is SickLeave => {
  const { startDate, endDate } = object as SickLeave;
  if (!isString(startDate) || !isString(endDate)) {
    return false;
  }

  return true;
};