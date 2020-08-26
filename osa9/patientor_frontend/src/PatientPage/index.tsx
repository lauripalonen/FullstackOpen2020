import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, setPatient, setDiagnosisList, updatePatient } from '../state';
import { Header, Icon, List, Accordion } from 'semantic-ui-react';
import axios from 'axios';
import { apiBaseUrl } from "../constants";

import { Patient, Diagnosis, NewEntry, EntryType } from '../types';

import EntryList from './EntryList';
import AddEntryForm from './AddEntryForm';

const PatientPage = () => {
  const [{ patient, diagnoses, patients }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const [activeIndex, setIndex] = React.useState<number>(1);
  const [entryType, setEntryType] = React.useState<EntryType>(undefined);

  const { id } = useParams<{ id: string }>();

  const closeEntryForm = () => {
    setEntryType(undefined);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    const address = `${apiBaseUrl}/patients/${id}/entries`;
    try {
      const { data: patient } = await axios.post<Patient>(
        address, values
      );
      dispatch(updatePatient(patient));
      closeEntryForm();
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data);
    }
  };

  React.useEffect(() => {
    if (!patient || patient.id !== id) {

      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }

    if (!diagnoses) {
      const fetchDiagnoses = async () => {
        try {
          const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(setDiagnosisList(diagnosisListFromApi));
        } catch (e) {
          console.error(e);
        }
      };

      fetchDiagnoses();
    }

  }, [dispatch, id, patient, diagnoses, patients]);

  if (!patient) {
    return <div>patient not found</div>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
        return 'other gender';
      default:
        return 'genderless';
    }
  };

  const handleClick = () => {
    setIndex(activeIndex === 0 ? -1 : 0);
  };

  return (
    <div>
      <Header as={"h2"}>{patient.name} <Icon name={genderIcon()} /></Header>
      <List items={[
        `ssn: ${patient.ssn}`,
        `occupation: ${patient.occupation}`,
        `date of birth: ${patient.dateOfBirth}`
      ]} />
      <Header as={"h3"}>entries</Header>
      <EntryList entries={patient.entries} />
      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >Add new entry
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <AddEntryForm
            onSubmit={submitNewEntry}
            error={error}
            setError={setError}
            entryType={entryType}
            setEntryType={setEntryType} />
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default PatientPage;

