import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { nanoid } from 'nanoid';

const getPublicEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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

const getPatientById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id) as Patient;
  return patient;
};

export default {
  getPatients,
  getPublicEntries,
  addPatient,
  getPatientById
};