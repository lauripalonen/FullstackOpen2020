import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, setPatient } from '../state';
import { Header, Icon, List } from 'semantic-ui-react';
import { Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from "../constants";


const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();

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

  }, [dispatch, id, patient]);

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

  return (
    <div>
      <Header as={"h2"}>{patient.name} <Icon name={genderIcon()} /></Header>
      <List items={[
        `ssn: ${patient.ssn}`,
        `occupation: ${patient.occupation}`,
        `date of birth: ${patient.dateOfBirth}`
      ]} />
    </div>
  );
};

export default PatientPage;

