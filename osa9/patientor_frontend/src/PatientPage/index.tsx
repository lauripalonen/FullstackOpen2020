import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, setPatient, setDiagnosisList } from '../state';
import { Header, Icon, List } from 'semantic-ui-react';
import { Patient, Diagnosis } from '../types';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import EntryList from './EntryList';


const PatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

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

  }, [dispatch, id, patient, diagnoses]);

  if (!patient) {
    return <div>patient not found</div>;
  }

  // const entryList = () => {
  //   if (patient.entries.length < 1) {
  //     return (
  //       <p>no entries</p>
  //     );
  //   }

  //   const entries = patient.entries.map(entry => {
  //     let diagnosisCodes;

  //     if (entry.diagnosisCodes) {
  //       diagnosisCodes = entry.diagnosisCodes.map(c => {
  //         let diagnose;

  //         if (Object.values(diagnoses).length > 0) {
  //           diagnose = diagnoses[c].name;
  //         }

  //         return (
  //           <List.Item key={c}>{c} {diagnose}</List.Item>);
  //       });
  //     }

  //     return (
  //       <div key={entry.description}>
  //         <p>{entry.date} <i>{entry.description}</i></p>
  //         <List>
  //           {diagnosisCodes ? diagnosisCodes : null}
  //         </List>
  //       </div>
  //     );
  //   });

  //   return <List>{entries}</List>;
  // };

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
    </div>
  );
};

export default PatientPage;

