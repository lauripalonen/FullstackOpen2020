import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry } from '../types';
import { nanoid } from 'nanoid';

type NewEntry = Omit<Entry, 'id'>;

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

const addEntry = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find(p => p.id === id) as Patient;
  const newEntry = {
    id: nanoid(),
    ...entry
  } as Entry;

  const updatedPatient = { ...patient, entries: patient.entries.concat(newEntry) };

  return updatedPatient;
};

export default {
  getPatients,
  getPublicEntries,
  addPatient,
  getPatientById,
  addEntry
};