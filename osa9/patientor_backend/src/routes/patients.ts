/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicEntries());
});

router.post('/', (req, res) => {

  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  try {
    const patient = patientService.getPatientById(id);
    res.json(patient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const entry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(id, entry);
    res.json(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

export default router;