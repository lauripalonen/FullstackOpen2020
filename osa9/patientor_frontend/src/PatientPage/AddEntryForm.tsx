import React from 'react';
import { useStateValue } from '../state';
import { Dropdown, DropdownProps, Segment } from 'semantic-ui-react';
import { EntryType, NewEntry } from '../types';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';

interface Props {
  onSubmit: (values: NewEntry) => void;
  error?: string;
  setError: (error: string | undefined) => void;
  entryType: EntryType;
  setEntryType: (entryType: EntryType) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, error, setError, entryType, setEntryType }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnoses) {
    return <div>loading diagnoses</div>;
  }

  const EntryTypeDropdown = () => {
    const options = [
      { key: 1, text: 'Hospital', value: 'Hospital' },
      { key: 2, text: 'Occupational healthcare', value: 'OccupationalHealthcare' },
      { key: 3, text: 'Health check', value: 'HealthCheck' }
    ];

    const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      switch (data.value) {
        case 'Hospital':
          setEntryType(data.value);
          break;
        case 'OccupationalHealthcare':
          setEntryType(data.value);
          break;
        case 'HealthCheck':
          setEntryType(data.value);
          break;
        case '':
          setEntryType(undefined);
          break;
        default:
          throw new Error('incorrect entry type');
      }
    };

    return <Dropdown
      clearable
      selection
      options={options}
      placeholder='Select entry type'
      onChange={onChange}
      value={entryType}
    />;
  };

  const onCancel = () => {
    setEntryType(undefined);
    setError(undefined);
  };

  const EntryForm = () => {
    switch (entryType) {
      case 'Hospital':
        return <HospitalEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
      case 'HealthCheck':
        return <HealthCheckEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <EntryTypeDropdown />
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <EntryForm />
    </div>
  );

};

export default AddEntryForm;