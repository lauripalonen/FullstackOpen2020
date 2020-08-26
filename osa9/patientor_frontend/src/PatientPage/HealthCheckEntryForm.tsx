import React from 'react';
import { useStateValue } from '../state';

import { Formik, Form, Field } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { DiagnosisSelection, TextField, NumberField } from '../AddPatientModal/FormField';

import { NewEntry, HealthCheckRating } from '../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  // const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  //   { value: HealthCheckRating.Healthy, label: 0 },
  //   { value: HealthCheckRating.LowRisk, label: 1 },
  //   { value: HealthCheckRating.HighRisk, label: 2 },
  //   { value: HealthCheckRating.CriticalRisk, label: 3 }
  // ];

  type HealthCheckRatingOption = {
    value: HealthCheckRating;
    label: number;
  };


  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        if (values.type !== 'HealthCheck') {
          throw new Error('incorrect entry type');
        }

        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.specialist = requiredError;
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>);
};

export default HealthCheckEntryForm;