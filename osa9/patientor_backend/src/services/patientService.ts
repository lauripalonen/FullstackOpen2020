import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient } from '../types';
import { nanoid } from 'nanoid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatients = (): Array<Patient> => {
  return patients;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: nanoid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient
};