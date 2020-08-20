import React from 'react';
import { Entry, OccupationalHealthcareEntry } from '../types';
import { Item, Icon } from 'semantic-ui-react';

interface Props {
  entries: Entry[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntryItem = (entry: Entry) => {
  return <Item key={entry.id}>
    <Item.Content>
      <Item.Header>{entry.date} <Icon name='hospital' /></Item.Header>
      <Item.Description><i>{entry.description}</i></Item.Description>
    </Item.Content>
  </Item>;
};

const HealthCheckEntryItem = (entry: Entry) => {
  return <Item key={entry.id}>
    <Item.Content>
      <Item.Header>{entry.date} <Icon name='doctor' /></Item.Header>
      <Item.Description><i>{entry.description}</i></Item.Description>
    </Item.Content>
  </Item>;
};

const OccupationalHealthcareEntryItem = (entry: OccupationalHealthcareEntry) => {
  return <Item key={entry.id}>
    <Item.Content>
      <Item.Header>{entry.date} <Icon name='stethoscope' />{entry.employerName}</Item.Header>
      <Item.Description><i>{entry.description}</i></Item.Description>
    </Item.Content>
  </Item>;
};


const EntryList = ({ entries }: Props) => {
  const entryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryItem {...entry} key={entry.id} />;
      case "HealthCheck":
        return <HealthCheckEntryItem {...entry} key={entry.id} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryItem {...entry} key={entry.id} />;
      default:
        return assertNever(entry);
    }
  };

  return <Item.Group divided>
    {entries.map((entry) => entryDetails({ entry }))}
  </Item.Group>;

};

export default EntryList;
