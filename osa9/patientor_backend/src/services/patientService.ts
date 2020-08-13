import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry } from '../types';

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

export default {
  getPatients,
  getNonSensitiveEntries
};